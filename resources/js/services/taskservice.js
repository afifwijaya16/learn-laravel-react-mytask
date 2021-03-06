import Axios from "axios";

export const storeApiNewTask = async data => {
    // console.log(data, "data");
    // return false;
    data.project_id = parseInt(data.project_id);
    return await Axios.post(
        "http://localhost/laravel-react-mytask/api/tasks",
        data
    ).then(res => {
        return res.data;
    });
};

export const updateApiTask = async (id, data) => {
    return await Axios.put(
        `http://localhost/laravel-react-mytask/api/tasks/${id}`,
        data
    ).then(res => {
        return res.data;
    });
};

export const deleteApiTask = async id => {
    return await Axios.delete(
        `http://localhost/laravel-react-mytask/api/tasks/${id}`
    ).then(res => {
        return res.data;
    });
};
