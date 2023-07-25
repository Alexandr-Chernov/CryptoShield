import { useEffect, useState } from "react";

import metaMaskFox from "../img/metamask-fox.svg";


const MetamaskLogin = ({mmAccounts, setMmAccounts}) => {
    const { ethereum } = window;
    const [buttonText, setButtonText] = useState('MetaMask');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
    useEffect(() => {
        if (mmAccounts == null || mmAccounts.length === 0)
            setIsButtonDisabled(false)
        else
            setIsButtonDisabled(true)
    }, [mmAccounts])

    async function metaMaskClientCheck() {
        if (!isMetaMaskInstalled()) {
            await metamaskInstall()
            setIsButtonDisabled(true)
        }
        else {
            await metamaskConnect()
            setIsButtonDisabled(false)
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
            let account = accounts[0];
            setMmAccounts(account);
            setButtonText('MetaMask Connected');

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

