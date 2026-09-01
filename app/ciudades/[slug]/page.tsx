import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { client } from "@/sanity/lib/client";
import { cityBySlugQuery } from "@/sanity/lib/queries";

type Province = {
  _id: string;
  name: string;
  slug: string;
  code: string;
};

type City = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  heroImage?: unknown;
  province?: Province;
};

type CityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;

  const city = await client.fetch<City | null>(cityBySlugQuery, {
    slug,
  });

  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="bg-[#0B1F33] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {city.province && (
              <Link
                href={`/provincias/${city.province.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver a {city.province.name}
              </Link>
            )}

            <div className="mt-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D80621]/20 text-[#FF6B78]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>

                {city.province && (
                  <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white">
                    {city.province.code}
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {city.name}
              </h1>

              {city.province && (
                <p className="mt-3 text-lg font-medium text-slate-300">
                  {city.province.name}, Canadá
                </p>
              )}

              {city.description && (
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                  {city.description}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#D80621]">
                Sobre la ciudad
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1F33]">
                Vivir en {city.name}
              </h2>

              {city.description ? (
                <p className="mt-4 leading-8 text-slate-600">
                  {city.description}
                </p>
              ) : (
                <p className="mt-4 leading-8 text-slate-600">
                  Próximamente agregaremos más información sobre {city.name}.
                </p>
              )}

              {city.province && (
                <Link
                  href={`/provincias/${city.province.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-[#0B1F33] transition-colors hover:text-[#D80621]"
                >
                  Ver más ciudades de {city.province.name}
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}