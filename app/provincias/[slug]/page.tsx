import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { client } from "@/sanity/lib/client";
import { provinceBySlugQuery } from "@/sanity/lib/queries";

type City = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
};

type Province = {
  _id: string;
  name: string;
  slug: string;
  code: string;
  description?: string;
  heroImage?: unknown;
  cities?: City[];
};

type ProvincePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProvincePage({
  params,
}: ProvincePageProps) {
  const { slug } = await params;

  const province = await client.fetch<Province | null>(
    provinceBySlugQuery,
    {
      slug,
    }
  );

  if (!province) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="bg-[#0B1F33] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/provincias"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver a provincias
            </Link>

            <div className="mt-8">
              <span className="inline-flex rounded-full bg-[#D80621]/20 px-3 py-1 text-sm font-bold text-[#FF6B78]">
                {province.code}
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {province.name}
              </h1>

              {province.description && (
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                  {province.description}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#D80621]">
                Ciudades
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1F33] sm:text-4xl">
                Ciudades de {province.name}
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Explora las principales ciudades vinculadas a esta provincia o
                territorio.
              </p>
            </div>

            {province.cities && province.cities.length > 0 ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {province.cities.map((city) => (
                  <article
                    key={city._id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D80621]/10 text-[#D80621]">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-[#0B1F33]">
                      {city.name}
                    </h3>

                    {city.description && (
                      <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
                        {city.description}
                      </p>
                    )}

                    <Link
                      href={`/ciudades/${city.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F33] transition-colors hover:text-[#D80621]"
                    >
                      Explorar ciudad
                      <ArrowRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8">
                <p className="text-slate-600">
                  Todavía no hay ciudades vinculadas a esta provincia.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}