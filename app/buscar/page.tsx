import type { Metadata } from "next";
import { Search } from "lucide-react";

import { ArticleCard } from "@/components/content/article-card";
import { client } from "@/sanity/lib/client";
import { searchArticlesQuery } from "@/sanity/lib/queries";

type SearchResult = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;

  mainImage?: {
    image?: {
      asset?: {
        _id?: string;
        url?: string;
      };
    };
    alt?: string;
    caption?: string;
  };

  category?: {
    title?: string;
    slug?: string;
  };

  province?: {
    name?: string;
    slug?: string;
  };

  city?: {
    name?: string;
    slug?: string;
  };
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Buscar",
  description:
    "Busca artículos sobre inmigración, trabajo, educación y vida en Canadá.",
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  const query = q?.trim() ?? "";

  let results: SearchResult[] = [];

  if (query.length >= 2) {
    results = await client.fetch<SearchResult[]>(
      searchArticlesQuery,
      {
        searchTerm: `*${query}*`,
      }
    );
  }

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#D80621]">
            Explorar
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0B1F33] sm:text-5xl">
            Buscar
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Encuentra información sobre inmigración, trabajo, educación,
            provincias, ciudades y vida en Canadá.
          </p>

          <form
            action="/buscar"
            method="GET"
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />

              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Ej. trabajo en Alberta"
                minLength={2}
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

        {query.length > 0 && query.length < 2 && (
          <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-amber-800">
              Escribe al menos 2 caracteres para realizar una búsqueda.
            </p>
          </div>
        )}

        {query.length >= 2 && (
          <div className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-[#0B1F33]">
                Resultados para “{query}”
              </h2>

              <p className="text-sm text-slate-500">
                {results.length}{" "}
                {results.length === 1 ? "resultado" : "resultados"}
              </p>
            </div>

            {results.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((article) => (
                  <ArticleCard
                    key={article._id}
                    title={article.title}
                    excerpt={article.excerpt}
                    category={article.category?.title ?? "General"}
                    href={`/articulos/${article.slug}`}
                    publishedAt={new Intl.DateTimeFormat("es-CA", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(article.publishedAt))}
                    imageUrl={article.mainImage?.image?.asset?.url}
                    imageAlt={article.mainImage?.alt ?? article.title}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8">
                <h3 className="font-semibold text-[#0B1F33]">
                  No encontramos resultados
                </h3>

                <p className="mt-2 text-slate-600">
                  Intenta utilizar otras palabras como Canadá, Alberta,
                  inmigración o trabajo.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}