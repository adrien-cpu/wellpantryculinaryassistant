
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
        <section className="relative bg-gradient-to-b from-wp-green-light to-white dark:from-wp-green-dark dark:to-wp-gray-dark py-20 overflow-hidden">
          <main className="flex-grow">{children}</main>
        </section>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
