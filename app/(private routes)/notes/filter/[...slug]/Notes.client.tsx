"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { NoteFilter } from "@/types/note";
import Link from "next/link";
import { fetchNotes, deleteNote } from "@/lib/api/clientApi";

interface NotesClientProps {
  tag?: NoteFilter | "all";
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const tagValue = (tag !== "all" ? tag : undefined) as NoteFilter;

  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes({ page, perPage: 12, search, tag: tagValue }),
    refetchOnMount: false,

    placeholderData: (previousData) => previousData,
  });
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={debouncedSearch} />

          {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              setCurrentPage={setPage}
            />
          )}

          <Link href={`/notes/action/create`} className={css.button}>
            Create note +
          </Link>
        </header>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notes</p>}

        {data && data.notes.length > 0 && (
          <NoteList notes={data.notes} onDelete={handleDelete} />
        )}
      </div>
    </>
  );
}
