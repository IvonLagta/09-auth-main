import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notehub - A Note-Taking App",
  description:
    "A simple and efficient note-taking application built with Next.js, Zustand, and TanStack Query. Organize your thoughts, ideas, and tasks in one place with ease.",
  openGraph: {
    title: "Notehub - A Note-Taking App",
    description:
      "A simple and efficient note-taking application built with Next.js, Zustand, and TanStack Query. Organize your thoughts, ideas, and tasks in one place with ease.",
    url: process.env.NEXT_APP_URL,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Notehub - A Note-Taking App",
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {modal}
            {children}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
