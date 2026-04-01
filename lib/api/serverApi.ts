import { nextServer } from "./api";
import { cookies } from "next/headers";
import { AxiosResponse } from "axios";
import { FetchNotesParams } from "./clientApi";
import { FetchNotesResponse } from "./clientApi";

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const checkSession = async (): Promise<boolean> => {
  const cookieHeader = await getCookieHeader();

  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data?.authenticated ?? false;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const cookieHeader = await getCookieHeader();

  try {
    const response = await nextServer.get("/users/me", {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response.data as User;
  } catch {
    return null;
  }
};

export const getNoteById = async (id: string): Promise<Note | null> => {
  const cookieHeader = await getCookieHeader();

  try {
    const response = await nextServer.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response.data as Note;
  } catch {
    return null;
  }
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await nextServer.get(`/notes/${id}`);
  return data;
};

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
