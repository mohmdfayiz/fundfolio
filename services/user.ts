import axios from "./axios";
import { getToken } from "@/utils/token";

export const getHeaders = async () => {
    const token = await getToken();
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getUser = async () =>
    axios.get("/user", await getHeaders())

export const updateUser = async (data: any) =>
    axios.patch("/user", data, await getHeaders())

export const deleteUser = async () =>
    axios.delete("/user", await getHeaders())