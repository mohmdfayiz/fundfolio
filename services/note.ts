import axios from "./axios";

export const getNotes = async () =>
    axios.get("/note");

export const addNote = async (note: any) =>
    axios.post("/note", note)

export const updateNote = async (note: any) =>
    axios.put(`/note/${note._id}`, note)

export const pinNote = async (id: string, action: string) =>
    axios.patch(`/note/${id}/${action}`, {})

export const deleteNote = async (ids: string[]) =>
    axios.post(`/note/delete`, { ids })