# Canadá Latino Platform

Plataforma editorial moderna para organizar y publicar información dirigida a comunidades latinas interesadas en Canadá.

## Stack

- Next.js 16, React y TypeScript
- Tailwind CSS y shadcn/ui
- Sanity CMS y consultas GROQ
- Vercel
- Vitest y Playwright: previstos, todavía no instalados ni configurados en este repositorio

## Desarrollo

```bash
npm ci
npm run dev
```

Abre http://localhost:3000. Sanity Studio está en `/studio`.

Configura `.env.local` con las variables del proyecto Sanity existente:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=<ID existente>
NEXT_PUBLIC_SANITY_DATASET=<dataset existente>
# Opcional; si se omite, se conserva la versión de sanity/env.ts:
NEXT_PUBLIC_SANITY_API_VERSION=2026-08-30
# Opcional: URL absoluta del despliegue, con http:// o https://.
NEXT_PUBLIC_SITE_URL=
```

No incluyas credenciales en variables `NEXT_PUBLIC_*`. Conserva los IDs, datasets y enlaces de proyectos Vercel existentes.

## Identidad y SEO

La identidad provisional se define en `config/site.ts`: nombre, nombre largo, tagline, descripción SEO, título y URL. Header, footer, portada y Studio consumen esa configuración. Para cambiar la marca, edita ese archivo y actualiza este README y el nombre del paquete si corresponde.

`app/layout.tsx` configura títulos, descripción, Open Graph, Twitter y nombre de aplicación. La URL base usa `NEXT_PUBLIC_SITE_URL`, después `VERCEL_URL` y finalmente localhost con `PORT` o 3000. En previews, deja vacía la URL explícita para usar el dominio del despliegue. Los canonical existentes de provincias y ciudades conservan sus rutas. No se define un canonical global que convierta todas las páginas en la portada.

`app/favicon.ico` es un globo neutral. Las imágenes editoriales y su texto alternativo se gestionan en Sanity. Actualmente no hay manifest/PWA, sitemap, robots personalizados ni JSON-LD; este refactor no añade esas funcionalidades.

## Validación

```bash
npm run lint
npx tsc --noEmit
npm run build
```

No existen scripts `typecheck`, `test` ni una suite Playwright. El archivo de CI ubicado bajo `app/trabajo/.github/workflow/` menciona Vitest, pero no constituye una suite instalada ni un workflow activo de GitHub.

El build necesita conectividad para las fuentes de Google y el contenido de Sanity. Consulta `docs/branding-review.md` para los resultados y límites de la revisión.

## Contenido y despliegue

Se mantienen las rutas, schemas, consultas GROQ y referencias editoriales. Revisa textos, SEO, autores, enlaces y assets desde Studio cuando cambie la identidad. No renombres slugs ni IDs por motivos de branding.

Despliega con la configuración Vercel existente y las mismas variables de Sanity. El cambio del nombre npm no cambia la vinculación del proyecto Vercel.
