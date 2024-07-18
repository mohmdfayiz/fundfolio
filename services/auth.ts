import axios from "./axios";

export const signin = async (email: string, password: string) =>
    axios.post("/auth/signin", { email, password });

export const signup = async (username: string, email: string) =>
    axios.post("/auth/signup", { username, email });

export const setPassword = async (password: string) =>
    axios.post("/auth/password", { password })

export const logout = async (data: any) =>
    axios.post("/auth/logout", data)