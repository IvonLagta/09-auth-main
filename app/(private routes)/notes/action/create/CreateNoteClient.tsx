"use client";

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";
import { createNote } from "@/lib/api/clientApi";
import { CreateNote } from "@/types/note";

export default function CreateNoteClient() {
  const router = useRouter();

  const handleSubmit = async (values: CreateNote) => {
    await createNote(values);
    router.push("/notes/filter/all");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main>
      <div>
        <h1>Create note</h1>
        <NoteForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </main>
  );
}
