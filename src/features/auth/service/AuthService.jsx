import axios from "axios";
import axiosClient from "../../../configs/AxiosConfig"

const authPath = "/auth";

export const login  = async (username, password) => {
    const res = await axiosClient.post(`${authPath}/login`, { username, password });
    return res.data;
}
