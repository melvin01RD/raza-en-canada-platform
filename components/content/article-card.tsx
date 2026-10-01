import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ArticleCardProps = {
  title: string;
  excerpt: string;
  category: string;
  href: string;
  publishedAt: string;
  imageUrl?: string;
  imageAlt?: string;
};

export function ArticleCard({
  title,
  excerpt,
  category,
  href,
  publishedAt,
  imageUrl,
  imageAlt,
}: ArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {imageUrl ? (
        <Link
          href={href}
          className="block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D80621]"
        >
          <img
            src={imageUrl}
            alt={imageAlt ?? title}
            className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </Link>
      ) : (
        <div
          className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200"
          aria-hidden="true"
        />
      )}

      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-[#D80621]">
            {category}
          </span>

          <time className="text-xs text-slate-500">
            {publishedAt}
          </time>
        </div>

        <h3 className="mt-4 text-xl font-bold leading-snug text-[#0B1F33]">
          <Link
            href={href}
            className="transition-colors group-hover:text-[#D80621] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D80621]"
          >
            {title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
          {excerpt}
        </p>

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F33] transition-colors hover:text-[#D80621] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D80621]"
        >
          Leer artículo
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}