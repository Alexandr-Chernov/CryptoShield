import React, { useState } from "react";
import { sendTransaction } from "../../actions/sendTransaction";

import styles from "../../assets/styles/home.module.css";

const Home = ({ accounts, setAccounts }) => {

    const [addressTo, setAddressTo] = useState(null);
    const [amount, setAmount] = useState(null);

    const handleChangeAddress = event => {
        setAddressTo(event.target.value);
    };
    const handleChangeAmount = event => {
        setAmount(event.target.value);
    };

    return (
        <>
            {accounts !== "" ? (
                <main className={styles.content}>
                    <h1>Make a transaction using AML tools!</h1>
                    <div className={styles.form_input}>
                        <input
                            type="text"
                            value={addressTo || ''}
                            onChange={handleChangeAddress}
                            placeholder="Receiver address"
                        />
                        <input
                            type="text"
                            value={amount || ''}
                            onChange={handleChangeAmount}
                            placeholder="Amount"
                        />
                    </div>
                    <button onClick={() => sendTransaction(accounts, addressTo, amount)}>Send</button>
                </main>
            ) : (
                <h1 className={styles.nconn}>Please connect wallet</h1>
            )}
        </>
    );
};

export default Home;   
