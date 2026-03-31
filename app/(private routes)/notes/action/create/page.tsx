import { Metadata } from "next";
import CreateNoteClient from "./CreateNoteClient";

export const metadata: Metadata = {
  title: "Create Note Page",
  description: "Here you can create new Note.",
  openGraph: {
    title: "Create Note Page",
    description: "Here you can create new Note.",
    url: `${process.env.NEXT_APP_URL}/notes/action/create`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Notehub - A Note-Taking App",
      },
    ],
  },
};

export default function CreateNotePage() {
  return <CreateNoteClient />;
}
