import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { client } from "@/sanity/lib/client";

type Province = {
  _id: string;
  name: string;
  slug: string;
  code: string;
  description?: string;
};

const allProvincesQuery = `
  *[_type == "province"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    code,
    description
  }
`;

export default async function ProvincesPage() {
  const provinces = await client.fetch<Province[]>(allProvincesQuery);

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <main>
        <section className="bg-[#0B1F33] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FF6B78]">
              Explora Canadá
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Provincias y territorios de Canadá
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Descubre las provincias y territorios, sus principales ciudades
              y características para ayudarte a conocer mejor Canadá.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {provinces.map((province) => (
                <article
                  key={province._id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="inline-flex rounded-full bg-[#D80621]/10 px-3 py-1 text-sm font-bold text-[#D80621]">
                    {province.code}
                  </span>

                  <h2 className="mt-4 text-2xl font-bold text-[#0B1F33]">
                    {province.name}
                  </h2>

                  {province.description && (
                    <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
                      {province.description}
                    </p>
                  )}

                  <Link
                    href={`/provincias/${province.slug}`}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-[#0B1F33] transition-colors hover:text-[#D80621]"
                  >
                    Explorar provincia
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}