import axios from "axios";
import { API_URL } from "../config";


export const createWallet = async (fromAddress) => {
    try {
        const response = await axios.post(`${API_URL}api/createwallet`, {
            fromAddress
        });
        console.log(response.data.message);
    } catch (e) {
        console.log(e.response.data.message);
    }
}
