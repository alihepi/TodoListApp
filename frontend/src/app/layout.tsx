import type { Metadata } from "next";
import "./globals.css";
import "../css/navbarAndFooter.css"
import "../css/mainPage.css"
import "../css/LogAndRegPage.css"
import "../css/modal.css"
import "../css/user.css"

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: "todo list app",
  description: "Todo list app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="body-bgc">{children}</body>
      </html>
    </AuthProvider>
  );
}
