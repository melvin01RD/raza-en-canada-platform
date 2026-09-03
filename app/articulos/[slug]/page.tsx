import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RichText } from "@/components/content/rich-text";
import { client } from "@/sanity/lib/client";
import { articleBySlugQuery } from "@/sanity/lib/queries";

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  body?: unknown[];
  sources?: unknown[];

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

  seo?: {
    title?: string;
    description?: string;
  };

  author?: {
    name?: string;
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

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = await client.fetch<Article | null>(
    articleBySlugQuery,
    { slug }
  );

  if (!article) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const article = await client.fetch<Article | null>(
    articleBySlugQuery,
    { slug }
  );

  if (!article) {
    notFound();
  }

  const publishedDate = new Intl.DateTimeFormat("es-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <article className="bg-white">
      <header className="bg-[#0B1F33] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {article.category?.title && (
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B78]">
              {article.category.title}
            </p>
          )}

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {article.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            {article.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            {article.author?.name && (
              <span>Por {article.author.name}</span>
            )}

            <time dateTime={article.publishedAt}>
              {publishedDate}
            </time>

            {article.province?.name && (
              <span>{article.province.name}</span>
            )}

            {article.city?.name && (
              <span>{article.city.name}</span>
            )}
          </div>
        </div>
      </header>

      {article.mainImage?.image?.asset?.url && (
        <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
          <figure>
            <img
              src={article.mainImage.image.asset.url}
              alt={article.mainImage.alt ?? article.title}
              className="aspect-[16/9] w-full rounded-2xl object-cover"
            />

            {article.mainImage.caption && (
              <figcaption className="mt-3 text-center text-sm text-slate-500">
                {article.mainImage.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {Array.isArray(article.body) && article.body.length > 0 ? (
          <RichText value={article.body} />
        ) : (
          <p className="text-slate-600">
            Este artículo todavía no tiene contenido publicado.
          </p>
        )}
      </div>
    </article>
  );
}