"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { CreateNote, NoteFilter } from "@/types/note";
import { useNoteDraft } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

interface NoteFormProps {}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required("Title is required"),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

export default function NoteForm({}: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { noteData, setNoteData, clearNoteData } = useNoteDraft();

  const mutation = useMutation({
    mutationFn: (data: CreateNote) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearNoteData();
      router.push("/notes");
    },
  });

  const handleSubmit = (
    values: CreateNote,
    { setSubmitting }: FormikHelpers<CreateNote>,
  ) => {
    mutation.mutate(values);
    setSubmitting(false);
  };

  const handleCancel = () => {
    clearNoteData();
    router.back();
  };

  return (
    <Formik
      initialValues={noteData}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting, values }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              name="title"
              type="text"
              className={css.input}
              value={values.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNoteData({ ...values, title: e.target.value })
              }
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
              value={values.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNoteData({ ...values, content: e.target.value })
              }
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field
              as="select"
              id="tag"
              name="tag"
              className={css.select}
              value={values.tag}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setNoteData({ ...values, tag: e.target.value as NoteFilter })
              }>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}>
              Cancel
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}>
              Create note
            </button>
          </div>

          {mutation.isError && (
            <p className={css.error}>
              {(mutation.error as Error)?.message ?? "Error creating note"}
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
}
