import type { Metadata } from "next";

import { ArticleCard } from "@/components/content/article-card";
import { client } from "@/sanity/lib/client";
import { allArticlesQuery } from "@/sanity/lib/queries";

type Article = {
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
};

export const metadata: Metadata = {
  title: "Artículos",
  description:
    "Guías, noticias y recursos sobre inmigración, trabajo, educación y vida en Canadá.",
};

export default async function ArticulosPage() {
  const articles = await client.fetch<Article[]>(allArticlesQuery);

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#D80621]">
            Contenido
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0B1F33] sm:text-5xl">
            Artículos
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Guías, análisis y contenido práctico sobre inmigración, trabajo,
            educación y vida en Canadá.
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
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
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-slate-600">
              Todavía no hay artículos publicados.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}