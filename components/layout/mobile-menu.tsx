"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Canadá", href: "/canada" },
  { label: "Inmigración", href: "/inmigracion" },
  { label: "Trabajo", href: "/trabajo" },
  { label: "Educación", href: "/educacion" },
  { label: "Noticias", href: "/noticias" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[#0B1F33] transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D80621]"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 top-full z-50 w-full border-t border-slate-200 bg-white shadow-lg"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6"
            aria-label="Navegación móvil"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#D80621] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D80621]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}