import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../assets/styles/workspace.module.css";
import CopyButton from "./utils/copyButton";
import { workspace } from "../../actions/workspace";
import LoadingAnimation from "../../utils/loadingAnimation";

const Workspace = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(workspace());
    }, [dispatch]);

    const padAccount = useSelector(state => state.padAccount);

    const [status, setStatus] = useState('waiting disigion');

    const changeStatus = () => {
        if (status === "waiting disigion") {
            document.getElementById('status').style.color = "green";
            setStatus("sent");
        } else if (status === "sent") {
            document.getElementById('status').style.color = "red";
            setStatus("Your crypto is dirty, contact telegram @rosc7");
        } else {
            document.getElementById('status').style.color = "#000";
            setStatus("waiting disigion");
        }
    }

    if (padAccount.data.address) {
        return (
            <>
                <div className={styles.content}>
                    <ul>
                        <li>
                            Address
                        </li>
                        <li className={styles.copybutton}>
                            {padAccount.data.address.slice(0, 5)}...{padAccount.data.address.slice(-6)}
                            <CopyButton text={padAccount.data.address} />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            Balance
                        </li>
                        <li className={styles.copybutton}>
                            {padAccount.data.balances.eth}ETH
                        </li>
                    </ul>
                    <ul>
                        <li>
                            Status
                        </li>
                        <li id="status">
                            {status}
                        </li>
                    </ul>
                </div>
                {padAccount.data.balances.eth !== "0.." ?
                    <div className={styles.check_wallet}>
                        <button onClick={() => changeStatus()}>
                            Check Wallet
                        </button>
                    </div>
                    : <></>
                }
            </>
        )
    } else {
        return (
            <LoadingAnimation />
        )
    }

}

export default Workspace;
