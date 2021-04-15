import Axios from "axios";

export const getApiProjectLists = async () =>
    await Axios.get("http://localhost/laravel-react-mytask/api/projects");

export const storeApiNewProject = async data => {
    data.user_id = 1;
    return await Axios.post(
        "http://localhost/laravel-react-mytask/api/projects",
        data
    ).then(res => {
        return res.data;
    });
};
