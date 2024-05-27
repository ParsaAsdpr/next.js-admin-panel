import type { Metadata } from "next";
import AdminWrapper from "../../components/AdminWrapper";

export const metadata: Metadata = {
  title: "داشبورد",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminWrapper>{children}</AdminWrapper>;
}
