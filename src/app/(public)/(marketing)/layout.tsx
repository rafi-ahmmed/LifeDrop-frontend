import type { ReactNode } from "react";
import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex-1">{children}</main>
      <Footer />
    </div>
  );
}
