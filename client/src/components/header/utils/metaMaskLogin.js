import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import metaMaskFox from "../../../assets/img/metamask-fox.svg";
import { accountLogin } from "../../../actions/accountLogin";


const MetamaskLogin = ({ hideForm }) => {
    const { ethereum } = window;
    const [buttonText, setButtonText] = useState('MetaMask');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const dispatch = useDispatch();
    
    const isAuth = useSelector(state => state.account.isAuth);

    useEffect(() => {
        if (!isAuth) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [isAuth])

    async function metaMaskClientCheck() {
        if (!isMetaMaskInstalled()) {
            await metamaskInstall()
            setIsButtonDisabled(true);
        }
        else {
            await metamaskConnect()
            setIsButtonDisabled(false);
        }
    }

    //Function checks if the MetaMask extension is installed    
    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        return Boolean(ethereum && ethereum.isMetaMask);
    }

    const metamaskInstall = async () => {
        alert("Please install MetaMask.");
    }

    async function metamaskConnect() {
        setIsButtonDisabled(true);
        setButtonText('Connecting to MetaMask...');
        try {
            let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Ethereum Request over');
            setButtonText('MetaMask Connected');

            dispatch(accountLogin(accounts[0]));
            
            hideForm();
        } catch (error) {
            console.error(error);
            setIsButtonDisabled(false);
            setButtonText('Connect MetaMask');
        }
    }

    return (
        <>
            <button
                disabled={isButtonDisabled}
                onClick={() => metaMaskClientCheck()}
            >
                <img src={metaMaskFox} alt="metaMaskIcon" />
                {buttonText}
            </button>
        </>
    )

};

export default MetamaskLogin;

