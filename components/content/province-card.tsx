import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ProvinceCardProps = {
  name: string;
  code: string;
  description?: string;
  slug: string;
};

export function ProvinceCard({
  name,
  code,
  description,
  slug,
}: ProvinceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative flex aspect-[4/3] items-end overflow-hidden bg-gradient-to-br from-[#0B1F33] via-[#12304D] to-[#D80621] p-6">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

        <span className="relative inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-bold tracking-wider text-white backdrop-blur-sm">
          {code}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#0B1F33]">
          <Link
            href={`/provincias/${slug}`}
            className="transition-colors group-hover:text-[#D80621] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D80621]"
          >
            {name}
          </Link>
        </h3>

        {description && (
          <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
            {description}
          </p>
        )}

        <Link
          href={`/provincias/${slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F33] transition-colors hover:text-[#D80621]"
        >
          Explorar provincia
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}