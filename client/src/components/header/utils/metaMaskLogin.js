import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import metaMaskFox from "../../../assets/img/metamask-fox.svg";
import { accountLogin } from "../../../actions/accountLogin";

const MetamaskLogin = ({ hideForm }) => {
    const { ethereum } = window;
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
            setIsButtonDisabled(true);
            alert("Please install MetaMask.");
        }
        else {
            await metamaskConnect()
            setIsButtonDisabled(false);
        }
    }

    // Функция проверяет, установлено ли расширение MetaMask   
    const isMetaMaskInstalled = () => {
        // Необходимо проверить привязку ethereum к оконному объекту, чтобы убедиться, что он установлен.
        return Boolean(ethereum && ethereum.isMetaMask);
    }

    async function metamaskConnect() {
        setIsButtonDisabled(true);
        try {
            let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('MetaMask connected');

            dispatch(accountLogin(accounts[0]));
            
            hideForm();
        } catch (error) {
            console.error(error);
            setIsButtonDisabled(false);
        }
    }

    return (
        <>
            <button
                disabled={isButtonDisabled}
                onClick={() => metaMaskClientCheck()}
            >
                <img src={metaMaskFox} alt="metaMaskIcon" />
                MetaMask
            </button>
        </>
    )

};

export default MetamaskLogin;

