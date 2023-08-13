import axios from "axios";
import { API_URL } from "../config";
import { setPadAccount } from "../reducers/padAccountReducer";

export const workspace = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/workspace`, {
                headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(setPadAccount(response.data.padAccount));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            localStorage.removeItem('token');
        }
    }
}
