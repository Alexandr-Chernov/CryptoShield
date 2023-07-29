import axios from "axios";
import { API_URL } from "../config";
import { setAccount } from "../reducers/accountReducer";


export const accountLogin = (address) => {
    return async dispatch =>  {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                address
            });
            dispatch(setAccount(response.data.account));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

export const accountAuth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth`, {
                headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(setAccount(response.data.account));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            localStorage.removeItem('token');
        }
    }
}