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

export const getTransactions = async () =>
    axios.get("/transaction", await getHeaders());

export const getRecentTransactions = async () =>
    axios.get("/transaction/recent", await getHeaders());

export const getTransactionStats = async (month: number, year: number) =>
    axios.get(`/transaction/stats/${month}/${year}`, await getHeaders());

export const getAccountBalance = async () =>
    axios.get("/transaction/total", await getHeaders());

export const addTransaction = async (transaction: any) =>
    axios.post("/transaction", transaction, await getHeaders());

export const getTransactionsByDate = async (month: number, year: number) =>
    axios.get(`/transaction/date/${month}/${year}`, await getHeaders());

export const deleteTransactions = async (ids: string[]) =>
    axios.post(`/transaction/delete`, { ids }, await getHeaders());

export const getTransactionCategories = async () =>
    axios.get("/transaction/category", await getHeaders())

export const addTransactionCategory = async (category: any) =>
    axios.post("/transaction/category", category, await getHeaders());

export const deleteTransactionCategory = async (id: string) =>
    axios.delete(`/transaction/category/${id}`, await getHeaders())