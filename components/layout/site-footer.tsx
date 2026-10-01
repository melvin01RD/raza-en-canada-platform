import Link from "next/link";
import { siteConfig } from "@/config/site";

const footerLinks = {
  explorar: [
    { label: "Canadá", href: "/provincias" },
    { label: "Inmigración", href: "/inmigracion" },
    { label: "Trabajo", href: "/trabajo" },
    { label: "Educación", href: "/educacion" },
  ],
  contenido: [
    { label: "Noticias", href: "/noticias" },
    { label: "Artículos", href: "/articulos" },
    { label: "Ciudades", href: "/ciudades" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="bg-[#0B1F33] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center text-xl font-bold"
            >
              {siteConfig.name}
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Explorar */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explorar
            </h2>

            <ul className="mt-4 space-y-3">
              {footerLinks.explorar.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contenido */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contenido
            </h2>

            <ul className="mt-4 space-y-3">
              {footerLinks.contenido.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
