import React from "react";

import styles from "../../assets/styles/header.module.css";
import formConnectWalletExitBtn from "../../assets/img/formConnectWalletExitBtn.png";
import MetamaskLogin from "./utils/metaMaskLogin";


const Header = ({ accounts, setAccounts }) => {

    // Скрытие формы с подключениями к кошелькам
    const hideForm = () => {
        const screenDimming = document.getElementById(styles.screen_dimming);
        const formConnectWallet = document.getElementById(styles.formConnectWallet);
        screenDimming.style.display = "none";
        formConnectWallet.style.display = "none";
    }

    // Отображение формы с подключениями к кошелькам
    const displayForm = () => {
        const screenDimming = document.getElementById(styles.screen_dimming);
        const formConnectWallet = document.getElementById(styles.formConnectWallet);
        screenDimming.style.display = "block";
        formConnectWallet.style.display = "block";
    }

    return (
        <>
            <header className={styles.navbar}>
                <ul className={styles.navbar_left}>
                    <li>
                        AMLTran
                    </li>
                </ul>
                {accounts !== '' ?
                    <ul className={styles.navbar_right_1}>
                        <li>
                            <button>{accounts.slice(0, 3)}...{accounts.slice(-4)}</button>
                        </li>
                    </ul> :
                    <ul className={styles.navbar_right_2}>
                        <li>
                            <button onClick={displayForm}>Connect Wallet</button>
                        </li>
                    </ul>
                }
            </header>
            <div id={styles.screen_dimming}></div>
            <ul id={styles.formConnectWallet}>
                <img onClick={hideForm} id={styles.formConnectWallet_btn} src={formConnectWalletExitBtn} alt="exitbtn" />
                <li>
                    <MetamaskLogin
                        mmAccounts={accounts}
                        setMmAccounts={setAccounts}
                        hideForm={hideForm}
                    />
                </li>
            </ul>
        </>
    )

}

export default Header;
