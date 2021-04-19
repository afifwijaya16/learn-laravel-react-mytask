import Axios from "axios";

export const getApiProjectLists = async () =>
    await Axios.get("http://localhost/laravel-react-mytask/api/projects");

export const getApiProjectDetail = async id =>
    await Axios.get(`http://localhost/laravel-react-mytask/api/projects/${id}`);

export const storeApiNewProject = async data => {
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData != null) {
        const data_user = JSON.parse(getLoginData);
        data.user_id = data_user.user.id;
        return await Axios.post(
            "http://localhost/laravel-react-mytask/api/projects",
            data
        ).then(res => {
            return res.data;
        });
    }
};
export const updateApiProject = async (data, id) => {
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData != null) {
        const data_user = JSON.parse(getLoginData);
        data.user_id = data_user.user.id;
        return await Axios.put(
            `http://localhost/laravel-react-mytask/api/projects/${id}`,
            data
        ).then(res => {
            return res.data;
        });
    }
};

export const deleteApiProject = async id => {
    return await Axios.delete(
        `http://localhost/laravel-react-mytask/api/projects/${id}`
    ).then(res => {
        return res.data;
    });
};
