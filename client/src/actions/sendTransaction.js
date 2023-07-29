import axios from "axios";
import { API_URL } from "../config";


export const sendTransaction = async (fromAddress, toAddress, amount) => {
    try {
        const response = await axios.post(`${API_URL}api/transaction`, {
            fromAddress,
            toAddress,
            amount
        });
        console.log(response.data.message);
    } catch (e) {
        console.log(e.response.data.message);
    }
}
