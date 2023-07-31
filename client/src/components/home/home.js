import React from "react";
import { useSelector } from "react-redux";
//import Web3 from 'web3';

import { createWallet } from "../../actions/createWallet";
import styles from "../../assets/styles/home.module.css";

const Home = () => {

    const isAuth = useSelector(state => state.account.isAuth);
    const address = useSelector(state => state.account.currentAccount.address);

    return (
        <>
            {isAuth ? (
                <main className={styles.content}>
                    <h1>Make a transaction using AML tools!</h1><br />
                    <button onClick={() => createWallet(address)}>create wallet</button>
                </main>
            ) : (
                <h1 className={styles.nconn}>Please connect wallet</h1>
            )}
        </>
    );
};

export default Home;   
