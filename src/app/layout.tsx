import type { Metadata } from "next";
import "../assets/styles/globals.css";
import PageWrapper from "../components/PageWrapper";

export const metadata: Metadata = {
  title: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
