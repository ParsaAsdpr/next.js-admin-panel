import type { Metadata } from "next";
import PageWrapper from "../components/PageWrapper";
import "../assets/styles/globals.css";

export const metadata: Metadata = {
  title: "داشبورد",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
