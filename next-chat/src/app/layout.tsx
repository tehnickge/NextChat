import type { Metadata } from "next";
import "./globals.scss";
import SessionWrapper from "../../containers/SessionWrapper/SessionWrapper";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionWrapper>
  );
}
