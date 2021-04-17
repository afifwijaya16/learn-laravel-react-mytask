import Axios from "axios";

export const getApiProjectLists = async () =>
    await Axios.get("http://localhost/laravel-react-mytask/api/projects");

export const getApiProjectDetail = async id =>
    await Axios.get(`http://localhost/laravel-react-mytask/api/projects/${id}`);

export const storeApiNewProject = async data => {
    data.user_id = 1;
    return await Axios.post(
        "http://localhost/laravel-react-mytask/api/projects",
        data
    ).then(res => {
        return res.data;
    });
};
export const updateApiProject = async (data, id) => {
    data.user_id = 1;
    return await Axios.put(
        `http://localhost/laravel-react-mytask/api/projects/${id}`,
        data
    ).then(res => {
        return res.data;
    });
};
export const deleteApiProject = async id => {
    return await Axios.delete(
        `http://localhost/laravel-react-mytask/api/projects/${id}`
    ).then(res => {
        return res.data;
    });
};
