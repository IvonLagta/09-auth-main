"use client";

import css from "./SignUp.module.css";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const user = await register({ password, email });

      if (user) {
        setUser(user);
        router.push("/profile");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      const err = error as ApiError;

      if (err.response?.status === 409) {
        setError(
          "Account already exists. Please sign in or use a different email.",
        );
        return;
      }

      setError(
        err.response?.data?.error ??
          err.message ??
          "Unknown registration error",
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
