import axiosClient from "../../../configs/AxiosConfig"

const authPath = "/auth";

export const login  = async (username, password) => {
    return await axiosClient.post(`${authPath}/login`, { username, password });
}