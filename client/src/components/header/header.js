import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../assets/styles/header.module.css";
import formConnectWalletExitBtn from "../../assets/img/formConnectWalletExitBtn.png";
import exit_icon from '../../assets/img/exit_icon.png';
import MetamaskLogin from "./utils/metaMaskLogin";
import { logout } from "../../reducers/accountReducer";


const Header = () => {

    const isAuth = useSelector(state => state.account.isAuth);
    const address = useSelector(state => state.account.currentAccount.address);
    const dispatch = useDispatch();

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
                        Crypto Shield
                    </li>
                </ul>
                <ul className={styles.navbar_center}>
                    {window.location.pathname !== "/" || isAuth ?
                        <li>
                            <a href='/'>Home</a>
                        </li> : <></>
                    }
                    {isAuth ?
                        <li>
                            <a href='/workspace'>Workspace</a>
                        </li> : <></>
                    }
                </ul>
                {isAuth ?
                    <>
                        <ul className={styles.navbar_right_1}>
                            <li>
                                <button onClick={() => dispatch(logout())}>
                                    <img src={exit_icon} alt="exit icon" />
                                </button>
                            </li>
                            <li>
                                <div>{address.slice(0, 3)}...{address.slice(-4)}</div>
                            </li>
                        </ul>
                    </> :
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
                    <MetamaskLogin hideForm={hideForm} />
                </li>
            </ul>
        </>
    )

}

export default Header;
