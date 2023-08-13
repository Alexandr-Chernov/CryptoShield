import React from "react";
import { useSelector } from "react-redux";

import styles from "../../assets/styles/home.module.css";

const Home = () => {

    const isAuth = useSelector(state => state.account.isAuth);

    return (
        <>
            {isAuth ? (
                <main className={styles.content}>
                    <div>
                        <h1>Protect your crypto from<br /> dirty money</h1>
                    </div>
                    <div>
                        <p>
                            We check incoming transactions and only clean<br />
                            cryptocurrency will be credited to your wallet.
                        </p>
                    </div>
                </main>
            ) : (
                <h1 className={styles.nconn}>Please connect wallet</h1>
            )}
        </>
    );
};

export default Home;   
