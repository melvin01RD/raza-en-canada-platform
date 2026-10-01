export default function NoticiasPage() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#D80621]">
          Actualidad
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0B1F33] sm:text-5xl">
          Noticias de Canadá
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Noticias y actualizaciones relevantes para la comunidad interesada
          en Canadá.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-slate-600">
            Esta sección mostrará noticias publicadas y administradas desde
            Sanity.
          </p>
        </div>
      </div>
    </section>
  );
}
