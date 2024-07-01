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