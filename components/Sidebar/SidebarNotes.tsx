import Link from "next/link";
import { NoteFilter } from "@/types/note";
import css from "./SidebarNotes.module.css";

const filters: (NoteFilter | "all")[] = [
  "all",
  NoteFilter.Todo,
  NoteFilter.Work,
  NoteFilter.Personal,
  NoteFilter.Meeting,
  NoteFilter.Shopping,
];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <h3>Filter Notes</h3>
      <ul>
        {filters.map((tag) => (
          <li key={tag}>
            <Link href={`/notes/filter/${tag}`} className={css.link}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
