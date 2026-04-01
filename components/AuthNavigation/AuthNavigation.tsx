"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      clearIsAuthenticated();
      router.push("/sign-in");
    }
  };

  if (isAuthenticated === null) {
    return null;
  }

  if (isAuthenticated && user) {
    return (
      <>
        <Link href="/" className={css.navLink}>
          Нотатки
        </Link>
        <Link href="/profile" className={css.navLink}>
          Профіль
        </Link>
        <span className={css.userInfo}>
          {user.email || user.username || "Користувач"}
        </span>
        <button onClick={handleLogout} className={css.logoutBtn}>
          Вийти
        </button>
      </>
    );
  }
  
  return (
    <>
      <Link href="/sign-in" className={css.navLink}>
        Login
      </Link>
      <Link href="/sign-up" className={css.navLink}>
        Sign up
      </Link>
    </>
  );
}
