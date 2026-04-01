import { nextServer } from "./api";
import { cookies } from "next/headers";
import { AxiosResponse } from "axios";
import { FetchNotesParams, FetchNotesResponse } from "./clientApi";

import { User } from "@/types/user";
import { Note } from "@/types/note";

export interface AuthSessionResponse {
  authenticated: boolean;
}

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const checkSession = async (): Promise<
  AxiosResponse<AuthSessionResponse>
> => {
  const cookieHeader = await getCookieHeader();
  const response = await nextServer.get<AuthSessionResponse>("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const cookieHeader = await getCookieHeader();
  try {
    const response = await nextServer.get<User>("/users/me", {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data;
  } catch {
    return null;
  }
};

export const getNoteById = async (id: string): Promise<Note | null> => {
  const cookieHeader = await getCookieHeader();
  try {
    const response = await nextServer.get<Note>(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data;
  } catch {
    return null;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const { data }: AxiosResponse<Note> = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookieHeader();
  const response: AxiosResponse<FetchNotesResponse> = await nextServer.get(
    "/notes",
    {
      params,
      headers: {
        Cookie: cookieHeader,
      },
    },
  );
  return response.data;
};
