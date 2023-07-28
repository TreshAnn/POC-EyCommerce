"use client";

import { Footer, HeaderNavBar } from "ui";
import "./style.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeaderNavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
