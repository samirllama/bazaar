// src/components/Layout.tsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const htmlElement = document.documentElement;

    const handleThemeChange = (event: MediaQueryListEvent) => {
      return event.matches
        ? htmlElement.classList.add("dark")
        : htmlElement.classList.remove("dark");
    };

    if (mediaQuery.matches) htmlElement.classList.add("dark");

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  // bg-gradient-to-b from-purple-50 to-white/0 p-8 dark:from-purple-950/50 dark:to-neutral-950/0
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-slate-100 text-neutral-900 dark:from-neutral-950 dark:to-slate-900 dark:text-neutral-100">
      <Header />
      <main className="container mx-auto max-w-7xl flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
