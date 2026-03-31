/* fetchNotes
fetchNoteById
getMe
checkSession. */

import { nextServer } from "./api";
import { cookies } from "next/headers";

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};
