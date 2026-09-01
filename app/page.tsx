import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main>
        <section className="bg-[#0B1F33]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <span className="inline-flex rounded-full bg-[#D80621]/15 px-3 py-1 text-sm font-semibold text-[#FF6B78]">
                Raza en Canadá
              </span>

              <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Información útil para construir tu vida en Canadá
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Guías sobre inmigración, trabajo, educación, provincias,
                ciudades y la vida cotidiana en Canadá.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/articulos"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#D80621] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#B9051B]"
                >
                  Explorar artículos
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/provincias"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Explorar Canadá
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D80621]/20 blur-3xl" />

              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B78]">
                  Destacado
                </p>

                <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  Descubre las provincias y ciudades de Canadá
                </h2>

                <p className="mt-4 leading-7 text-slate-300">
                  Conoce dónde vivir, trabajar, estudiar y establecerte según
                  las características de cada provincia y ciudad.
                </p>

                <Link
                  href="/provincias"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-white hover:text-[#FF6B78]"
                >
                  Conocer provincias
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}