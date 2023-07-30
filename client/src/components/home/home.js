import React, { useState } from "react";
import { useSelector } from "react-redux";

import { sendTransaction } from "../../actions/sendTransaction";
import styles from "../../assets/styles/home.module.css";

const Home = () => {

    const isAuth = useSelector(state => state.account.isAuth);
    const address = useSelector(state => state.account.currentAccount.address);
    
    /*
    if (isAuth) {
        const provider = window.ethereum;
        // Подключиться к провайдеру
        const web3 = new Web3(provider);
        // Создать экземпляр контракта ERC20
        const erc20Contract = new web3.eth.Contract('erc20Abi', 'erc20ContractAddress');
        // Получить баланс аккаунта
        erc20Contract.methods.balanceOf(address).call().then((balance) => {
            console.log(`Баланс аккаунта: ${balance}`);

            // Другие операции с балансом...
        }).catch((e) => {
            console.error(e);
        });
    }*/


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
            {isAuth ? (
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
                    <button onClick={() => sendTransaction(address, addressTo, amount)}>Send</button>
                </main>
            ) : (
                <h1 className={styles.nconn}>Please connect wallet</h1>
            )}
        </>
    );
};

export default Home;   
