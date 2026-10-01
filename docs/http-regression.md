# Corrección de rutas y regresión HTTP

Fecha: 2026-10-01. Continuación de la revisión anterior, sin commit, merge ni cambios de branding o contenido Sanity.

## Causas y correcciones

`/canada` aparecía en el header y el menú móvil, pero no existía `app/canada/page.tsx`. Tampoco había redirects, rewrites, middleware o Proxy que resolvieran esa URL. El footer enlazaba a `/provincias`, donde ya existía el contenido de exploración de Canadá.

La nueva página reexporta el componente y metadata de `/provincias`: responde 200, reutiliza el contenido real y conserva el diseño existente. Ambas páginas declaran `/provincias` como canonical para consolidar el contenido compartido.

`/provincias/Alberta` llegaba al detalle con `slug = "Alberta"`. La consulta existente compara `slug.current == $slug`, sin normalización; no encontraba el documento servido por `alberta` y la página ejecutaba `notFound()`. No era un fallo de imports ni de la ruta dinámica. El recorrido previo detectó un enlace con la variante en mayúscula; las consultas y los documentos no se modificaron.

`proxy.ts` normaliza únicamente el segmento de slug de provincias, ciudades y artículos antes de renderizar o consultar Sanity. Decodifica el segmento, convierte a minúsculas y devuelve un redirect permanente 308 si cambió. Conserva origen y query string, incluyendo valores con mayúsculas y parámetros repetidos. Las URLs ya normalizadas continúan sin redirect. El matcher excluye Studio, assets, búsqueda y otras rutas. Los segmentos mal codificados se dejan al router sin provocar una excepción en Proxy.

Los canonical de detalles de provincia y ciudad se fuerzan a minúsculas; el detalle de artículo declara también su canonical. No se generan páginas duplicadas por variaciones de capitalización del slug.

## Archivos de esta corrección

Modificados:

- `app/provincias/page.tsx`: canonical de la vista compartida.
- `app/provincias/[slug]/page.tsx`: canonical lowercase.
- `app/ciudades/[slug]/page.tsx`: canonical lowercase.
- `app/articulos/[slug]/page.tsx`: canonical lowercase.

Creados:

- `app/canada/page.tsx`: reutiliza la página existente.
- `proxy.ts`: normalización y redirects 308.
- `scripts/check-routes.mjs`: regresión HTTP repetible sin dependencias nuevas.
- `docs/http-regression.md`: este informe.

No se eliminaron archivos. Los cambios anteriores de branding permanecen intactos y sin commit.

## Resultados

| Comprobación | Resultado |
| --- | --- |
| `/` | 200 |
| `/canada` | 200; canonical `/provincias` |
| `/provincias` | 200; canonical `/provincias` |
| `/provincias/alberta` | 200; canonical `/provincias/alberta` |
| `/provincias/Alberta`, `/provincias/ALBERTA` | 308 hacia `/provincias/alberta`, después 200 |
| Ontario, Quebec, British Columbia | Lowercase 200; variantes con mayúsculas 308 y después 200 |
| `/ciudades/calgary`, `/ciudades/toronto` | 200; canonical lowercase |
| `/ciudades/Calgary`, `/ciudades/Toronto`, `/ciudades/TORONTO` | 308 hacia lowercase y después 200 |
| Artículo publicado descubierto desde `/articulos` | Lowercase 200; uppercase 308 y después 200 |
| `/provincias/%41lberta` | 308 hacia `/provincias/alberta`, después 200 |
| Mayúsculas con query string | 308; parámetros, valores y repeticiones preservados |
| Slug de ciudad inexistente | 404 esperado, sin bucles |
| Studio, favicon y búsqueda | 200, sin redirects de normalización |
| Recorrido completo de enlaces internos | 184 URLs con respuesta final 200, cero fallos; un 308 para la variante de Alberta |
| `npm.cmd run lint` | 0 errores; 3 advertencias preexistentes de `no-img-element` |
| `npx.cmd tsc --noEmit` | Correcto; no existe script `typecheck` |
| `npm.cmd run build` | Correcto; 13 páginas estáticas y Proxy compilados |
| `git diff --check` | Correcto |
| Cuatro búsquedas de branding solicitadas | 0 coincidencias funcionales en cada búsqueda |

Las búsquedas incluyeron archivos ocultos e ignorados del código y configuración, excluyendo historial Git, dependencias, build y caché de TypeScript. Las referencias administrativas de Git y la ubicación local siguen fuera del alcance, como en la revisión anterior.

Para repetir la regresión:

```bash
npm run build
npm run start -- --port 3100
# En otra terminal:
node scripts/check-routes.mjs http://localhost:3100
```

## Límites y riesgos

Los 308 son permanentes y pueden almacenarse en caché. La estrategia presupone slugs editoriales canónicos en minúsculas, tal como se solicita; un futuro documento que solo tenga un slug en mayúsculas requeriría corregirse editorialmente para que su destino lowercase exista. No se modificó ningún documento para imponer esa convención.

La regresión usa contenido publicado real; necesita conectividad a Sanity y al menos un artículo publicado. El build también necesita las fuentes externas ya utilizadas por la aplicación. Las advertencias de imágenes y la estructura visual preexistente se conservan fuera de este alcance. No se hizo validación visual ni se alteraron schemas, diseño, navegación o configuración de proyectos.
