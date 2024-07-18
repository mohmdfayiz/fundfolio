import axios from "./axios";

export const getTransactions = async () =>
    axios.get("/transaction");

export const getRecentTransactions = async () =>
    axios.get("/transaction/recent");

export const getTransactionStats = async (month: number, year: number) =>
    axios.get(`/transaction/stats/${month}/${year}`);

export const getAccountBalance = async () =>
    axios.get("/transaction/total");

export const addTransaction = async (transaction: any) =>
    axios.post("/transaction", transaction);

export const getTransactionsByDate = async (month: number, year: number) =>
    axios.get(`/transaction/date/${month}/${year}`);

export const deleteTransactions = async (ids: string[]) =>
    axios.post(`/transaction/delete`, { ids });

export const getTransactionCategories = async () =>
    axios.get("/transaction/category")

export const addTransactionCategory = async (category: any) =>
    axios.post("/transaction/category", category);

export const updateTransactionCategory = async (category: any) =>
    axios.put(`/transaction/category/${category._id}`, category);

export const deleteTransactionCategory = async (id: string) =>
    axios.delete(`/transaction/category/${id}`)