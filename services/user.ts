import axios from "./axios";

export const getUser = async () =>
    axios.get("/user")

export const updateUser = async (data: any) =>
    axios.patch("/user", data)

export const deleteUser = async () =>
    axios.delete("/user")