import axios from "./axios";

export type OtpPurpose = 'signup' | 'reset';

export const signin = async (email: string, password: string) =>
    axios.post("/auth/signin", { email, password });

export const signup = async (username: string, email: string) =>
    axios.post("/auth/signup", { username, email });

export const setPassword = async (password: string) =>
    axios.post("/auth/password", { password });

export const verifyOtp = async (email: string, code: string, purpose: OtpPurpose) =>
    axios.post("/auth/verify-otp", { email, code, purpose });

export const resendOtp = async (email: string, purpose: OtpPurpose) =>
    axios.post("/auth/resend-otp", { email, purpose });

export const forgotPassword = async (email: string) =>
    axios.post("/auth/forgot-password", { email });

export const logout = async (data: any) =>
    axios.post("/auth/logout", data);
