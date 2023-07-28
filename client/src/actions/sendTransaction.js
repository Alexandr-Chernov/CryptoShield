import axios from "axios";


export const sendTransaction = async (fromAddress, toAddress, amount) => {
    try {
        const response = await axios.post('http://localhost:3001/transaction', {
            fromAddress,
            toAddress,
            amount
        });
        console.log(response.data.message);
    } catch (e) {
        console.log(e.response.data.message);
    }
}
