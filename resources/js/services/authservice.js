import Axios from "axios";

export const checkIfAuthenticated = () => {
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData != null) {
        const data = JSON.parse(getLoginData);
        if (data.success && data.access_token !== null) {
            return data.user;
        }
        return false;
    }
    return false;
};

export const registerUsers = async data => {
    return await Axios.post(
        "http://localhost/laravel-react-mytask/api/auth/register",
        data
    ).then(res => {
        return res.data;
    });
};
export const loginUser = async data => {
    return await Axios.post(
        "http://localhost/laravel-react-mytask/api/auth/login",
        data
    ).then(res => {
        return res.data;
    });
};
