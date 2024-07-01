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

export const signin = async (email: string, password: string) =>
    axios.post("/auth/signin", { email, password }, await getHeaders());

export const signup = async (username: string, email: string) =>
    axios.post("/auth/signup", { username, email }, await getHeaders());

export const setPassword = async (password: string) =>
    axios.post("/auth/password", { password }, await getHeaders())