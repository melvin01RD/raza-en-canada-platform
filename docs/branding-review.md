# Revisión del branding provisional

Fecha: 2026-10-01.

## Archivos

Modificados (14):

- `README.md`: descripción, stack real, configuración, desarrollo y despliegue.
- `package.json` y `package-lock.json`: nombre npm neutral; dependencias intactas.
- `components/layout/site-header.tsx`: wordmark, etiqueta accesible y tagline centralizados; retirado isotipo anterior.
- `components/layout/site-footer.tsx`: nombre, descripción y copyright centralizados.
- `app/page.tsx`: identidad de portada centralizada.
- `app/layout.tsx`: títulos, descripción, metadataBase, aplicación, Open Graph, Twitter y appleWebApp.
- `app/provincias/[slug]/page.tsx` y `app/ciudades/[slug]/page.tsx`: nombre de sitio en Open Graph.
- `app/favicon.ico`: sustituido símbolo de Vercel por globo neutral de 32 × 32, derivado del SVG genérico existente.
- `app/studio/[[...tool]]/page.tsx`: título de Studio; se conserva su metadata base y viewport.
- `sanity.config.ts`: título de Studio centralizado.
- `sanity/structure.ts`: título de navegación centralizado.
- `sanity/schemaTypes/authorType.ts`: descripción del rol editorial neutral.

Creados (2): `config/site.ts` y este informe. Eliminados: ninguno. No había archivos de imagen locales exclusivos de la identidad anterior; el isotipo estaba escrito en JSX.

## SEO y arquitectura

Se conserva Next.js 16, React, TypeScript, Tailwind, shadcn/ui, Sanity, GROQ, rutas, componentes, diseño y configuración de despliegue. No se agregan dependencias.

`config/site.ts` concentra la identidad. La URL base utiliza la variable pública del sitio, el dominio de preview Vercel o localhost. No se inventa un dominio público. Los canonical existentes conservan sus rutas. El nombre de sitio se incorpora también a las páginas que sobrescriben Open Graph.

No existían JSON-LD, manifest/PWA, sitemap ni robots personalizados; no se añadieron funcionalidades ajenas al desacoplamiento. No había redes sociales, emails ni dominios del propietario anterior hardcodeados que retirar. Los recursos genéricos se conservan.

## Sanity

Consulta de solo lectura de los 173 documentos accesibles sin token, revisando recursivamente cadenas de texto, campos editoriales, SEO, URLs y metadata de assets: cero coincidencias de la identidad anterior. No hubo escrituras, eliminaciones ni cambios de IDs, slugs, dataset o referencias. Las consultas de la aplicación permanecen intactas.

No se identificaron documentos que requieran una edición textual por branding. Queda revisar manualmente en Studio los borradores privados y las imágenes por posibles marcas de agua: una búsqueda textual no inspecciona los píxeles ni demuestra derechos de reutilización de imágenes remotas.

## Validación ejecutada

| Comprobación | Resultado |
| --- | --- |
| `npm.cmd run lint` | Correcto: 0 errores, 3 advertencias preexistentes de `no-img-element` |
| `npx.cmd tsc --noEmit` | Correcto |
| `npm.cmd run build` | Correcto: compilación, TypeScript y 12 páginas estáticas generadas |
| `git diff --check` | Correcto |
| Vitest / Playwright | No instalados/configurados; no existe script `test` |
| Navegación HTTP y HTML de producción | 175 URLs recorridas: 173 respuestas 200, 2 respuestas 404 descritas abajo |
| Identidad en HTML | Sin texto de la identidad anterior; títulos nuevos en todas las páginas HTML con respuesta 200 |
| Portada | Header, navegación, footer, controles de menú/búsqueda y metadata comprobados en HTML |
| SEO | Título, descripción, Open Graph y Twitter de portada correctos; canonical de Alberta con URL local y ruta correctas |
| Studio | Respuesta 200 y título con nombre largo de la nueva plataforma |
| Contenido | Páginas de provincias, ciudades y artículo enlazado responden; consultas a Sanity operativas |
| Servidor | Sin errores reportados durante el recorrido HTTP |

Se usaron los lanzadores `.cmd` porque PowerShell bloquea los scripts npm/npx sin firma. El primer build falló por falta de acceso de red a Google Fonts; pasó al repetirlo con conectividad autorizada. No se cambió la estrategia de fuentes.

El navegador de esta sesión no estuvo disponible. No se certifican interacción móvil, focus/teclado, dimensiones visuales, hidratación ni consola del cliente. Los handlers de búsqueda y menú se conservaron. No se instalaron herramientas adicionales de test.

## Hallazgos conservados fuera del alcance

- `/canada` devuelve 404: los menús ya apuntaban a esa ruta, pero no existe una página correspondiente.
- Un enlace editorial usa `/provincias/Alberta` y devuelve 404; `/provincias/alberta` devuelve 200. Revisar publicación y consistencia del slug en Sanity y su caché. No se renombró ningún slug ni se cambió la consulta.
- Las páginas generales de ciudades, educación, inmigración y noticias conservan sus textos provisionales originales.
- La página de detalle de ciudad ya incluye un header además del layout; no se alteró esa estructura.
- Las tres advertencias de lint están en el detalle de artículo, `article-card.tsx` y `rich-text.tsx`; son ajenas al branding.
- El archivo de CI dentro de `app/trabajo/.github/workflow/` referencia tests inexistentes y no está en la ubicación de workflows activos. Se conserva sin cambios.

## Búsqueda final y límites

La búsqueda global sin respetar archivos ignorados, incluyendo archivos ocultos, revisó la marca anterior, variantes con espacios/guiones/guiones bajos, su forma concatenada y la raíz distintiva. Resultado: cero coincidencias en código, configuración, documentación y nombres relativos de archivos/carpetas del proyecto. Se excluyeron `.git`, `node_modules`, `.next` y `*.tsbuildinfo` por ser historial, dependencias o artefactos generados.

Permanecen referencias administrativas fuera del código: nombre de la carpeta local y su carpeta padre, URL remota en `.git/config`, `.git/FETCH_HEAD`, `.git/HEAD` y `.git/logs/HEAD` (incluida la rama con el nombre solicitado). El historial Git y los caches pueden conservar referencias antiguas. No se reescribió historial, renombró el workspace, cambió el remoto ni tocó la vinculación Vercel. Estos elementos no forman parte de la identidad funcional del sitio.

No se hizo commit, merge ni despliegue.
