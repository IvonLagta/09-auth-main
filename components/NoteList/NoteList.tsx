"use client";

import Link from "next/link";
import css from "./NoteList.module.css";
import { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/clientApi";

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => Promise<void>;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = async (id: string) => {
    if (onDelete) {
      await onDelete(id);
    }
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
          </Link>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={mutation.isPending}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
