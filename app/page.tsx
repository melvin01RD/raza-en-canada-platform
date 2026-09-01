
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArticleCard } from "@/components/content/article-card";
import { ProvinceCard } from "@/components/content/province-card";
import { SiteHeader } from "@/components/layout/site-header";
import { client } from "@/sanity/lib/client";
import { featuredProvincesQuery } from "@/sanity/lib/queries";

const latestArticles = [
  {
    title: "Cómo encontrar trabajo en Canadá siendo recién llegado",
    excerpt:
      "Conoce los primeros pasos para preparar tu búsqueda laboral, adaptar tu currículum y entender mejor el mercado canadiense.",
    category: "Trabajo",
    href: "/articulos/como-encontrar-trabajo-en-canada",
    publishedAt: "1 sep 2026",
  },
  {
    title: "Qué debes saber antes de mudarte a una nueva provincia",
    excerpt:
      "Costo de vida, oportunidades laborales, transporte y servicios son algunos de los factores que conviene evaluar antes de elegir dónde vivir.",
    category: "Canadá",
    href: "/articulos/elegir-provincia-en-canada",
    publishedAt: "30 ago 2026",
  },
  {
    title: "Primeros pasos para estudiar en Canadá",
    excerpt:
      "Una introducción a las opciones educativas, requisitos básicos y aspectos importantes para quienes consideran estudiar en Canadá.",
    category: "Educación",
    href: "/articulos/estudiar-en-canada",
    publishedAt: "28 ago 2026",
  },
];

type Province = {
  _id: string;
  name: string;
  slug: string;
  code: string;
  description?: string;
  heroImage?: unknown;
};

export default async function Home() {
  const provinces = await client.fetch<Province[]>(featuredProvincesQuery);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main>
        {/* HERO */}
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
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-[#FF6B78]"
                >
                  Conocer provincias
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ÚLTIMOS ARTÍCULOS */}
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#D80621]">
                  Actualidad
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1F33] sm:text-4xl">
                  Últimos artículos
                </h2>

                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  Información práctica sobre trabajo, educación, inmigración y
                  vida en Canadá.
                </p>
              </div>

              <Link
                href="/articulos"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F33] transition-colors hover:text-[#D80621]"
              >
                Ver todos los artículos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <ArticleCard
                  key={article.href}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  href={article.href}
                  publishedAt={article.publishedAt}
                />
              ))}
            </div>
          </div>
        </section>

        {/* PROVINCIAS DESTACADAS */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#D80621]">
                Explora Canadá
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1F33] sm:text-4xl">
                Descubre dónde vivir en Canadá
              </h2>

              <p className="mt-3 text-base leading-7 text-slate-600">
                Conoce las provincias, sus principales ciudades, oportunidades
                y características para ayudarte a encontrar el lugar que mejor
                se adapte a tus planes.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {provinces.map((province) => (
                <ProvinceCard
                  key={province._id}
                  name={province.name}
                  code={province.code}
                  description={province.description}
                  slug={province.slug}
                />
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/provincias"
                className="inline-flex items-center gap-2 font-semibold text-[#0B1F33] transition-colors hover:text-[#D80621]"
              >
                Ver todas las provincias y territorios
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

