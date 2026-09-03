import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Gravity — Quizlet study mode",
  description:
    "Faithful recreation of Quizlet's Gravity study mode (2020–2024): defend your planet from falling asteroids by typing the correct answers. Paste a term list or upload a CSV to play.",
  keywords: [
    "Quizlet",
    "Gravity",
    "study mode",
    "flashcards",
    "game",
    "asteroids",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
