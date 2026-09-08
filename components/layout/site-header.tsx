"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { MobileMenu } from "@/components/layout/mobile-menu";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Canadá", href: "/canada" },
  { label: "Inmigración", href: "/inmigracion" },
  { label: "Trabajo", href: "/trabajo" },
  { label: "Educación", href: "/educacion" },
  { label: "Noticias", href: "/noticias" },
];

export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="relative border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Raza en Canadá - Inicio"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D80621] text-xl font-bold text-white">
            R
          </div>

          <div className="leading-tight">
            <span className="block text-lg font-bold text-[#0B1F33]">
              Raza en Canadá
            </span>

            <span className="hidden text-xs text-slate-500 sm:block">
              Tu guía para vivir en Canadá
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Navegación principal"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#D80621]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsSearchOpen((current) => !current)}
            aria-label={
              isSearchOpen
                ? "Cerrar búsqueda"
                : "Abrir búsqueda"
            }
            aria-expanded={isSearchOpen}
            aria-controls="header-search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#0B1F33] transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D80621]"
          >
            {isSearchOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Search className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <MobileMenu />
        </div>
      </div>

      {isSearchOpen && (
        <div
          id="header-search"
          className="border-t border-slate-200 bg-white"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <form
              action="/buscar"
              method="GET"
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />

                <input
                  ref={searchInputRef}
                  type="search"
                  name="q"
                  minLength={2}
                  placeholder="Buscar artículos, ciudades, provincias..."
                  aria-label="Buscar contenido"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-[#0B1F33] outline-none transition focus:border-[#D80621] focus:ring-2 focus:ring-[#D80621]/20"
                />
              </div>

              <button
                type="submit"
                className="h-12 rounded-xl bg-[#D80621] px-6 font-semibold text-white transition hover:bg-[#B9051B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D80621] focus-visible:ring-offset-2"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}