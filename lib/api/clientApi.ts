import { User } from "@/types/user";
import { nextServer } from "./api";
import { CreateNote, Note, NoteFilter } from "@/types/note";
import { AxiosResponse } from "axios";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteFilter;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface RegisterData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateUserData {
  username?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await nextServer.get(
    "/notes",
    {
      params,
    },
  );
  return response.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await nextServer.post(
    "/notes",
    payload,
    {},
  );
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await nextServer.delete(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await nextServer.get(`/notes/${id}`);
  return data;
};

export const register = async (userData: RegisterData): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", userData);
  console.log("Registered user:", data);
  return data;
};

export const login = async (userData: LoginData): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", userData);
  console.log("Logged in user:", data);
  return data;
};

export const logout = async () => {
  const { data } = await nextServer.post("/auth/logout");
  return data;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateMe = async (updateData: UpdateUserData): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", updateData);
  return data;
};

export const refresh = async () => {
  const { data } = await nextServer.get("/auth/session");
  return data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get("/auth/session");
  return data;
};
