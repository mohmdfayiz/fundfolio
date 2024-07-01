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

export const getNotes = async () =>
    axios.get("/note", await getHeaders());

export const addNote = async (note: any) =>
    axios.post("/note", note, await getHeaders())

export const updateNote = async (note: any) =>
    axios.put(`/note/${note._id}`, note, await getHeaders())

export const pinNote = async (id: string, action: string) =>
    axios.patch(`/note/${id}/${action}`, {}, await getHeaders())

export const deleteNote = async (id: string) =>
    axios.delete(`/note/${id}`, await getHeaders())