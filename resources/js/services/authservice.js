import Axios from "axios";

export const registerUsers = async data => {
    data.user_id = 1;
    return await Axios.post(
        "http://localhost/laravel-react-mytask/api/auth/register",
        data
    ).then(res => {
        return res.data;
    });
};
