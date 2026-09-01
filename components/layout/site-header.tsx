import Link from "next/link";
import { Search } from "lucide-react";
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
      <Link
        href="/buscar"
        aria-label="Buscar"
        className="flex h-10 w-10 items-center justify-center rounded-full text-[#0B1F33] transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D80621]"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </Link>

      <MobileMenu />
    </div>
  </div>
</header>
  );
}

