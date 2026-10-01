import assert from "node:assert/strict";

// Run against a production server: node scripts/check-routes.mjs [base URL]
const base = new URL(process.argv[2] ?? "http://localhost:3100");
const request = (path) =>
  fetch(new URL(path, base), {
    redirect: "manual",
    headers: { "User-Agent": "Twitterbot" },
  });

const pages = [
  ["/", null],
  ["/canada", "/provincias"],
  ["/provincias", "/provincias"],
  ...["alberta", "ontario", "quebec", "british-columbia"].map((slug) => [
    `/provincias/${slug}`,
    `/provincias/${slug}`,
  ]),
  ...["calgary", "toronto"].map((slug) => [
    `/ciudades/${slug}`,
    `/ciudades/${slug}`,
  ]),
];

// Discover an actual published article instead of fixing an editorial slug.
const articlesResponse = await request("/articulos");
assert.equal(articlesResponse.status, 200, "/articulos");
const articlesHtml = await articlesResponse.text();
const articlePath = articlesHtml.match(/href="(\/articulos\/[^"?#]+)"/)?.[1];
assert.ok(articlePath, "A published article is required for this regression");
pages.push([articlePath, articlePath]);

for (const [path, canonical] of pages) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get("location"), null, path);
  const html = await response.text();
  if (canonical) {
    const href = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(href, `Missing canonical: ${path}`);
    assert.equal(new URL(href).pathname, canonical, path);
  }
  if (path === "/canada") {
    assert.match(html, /Provincias y territorios de Canad/);
    assert.match(html, /href="\/provincias\//);
  }
  console.log(`200 ${path}${canonical ? ` canonical=${canonical}` : ""}`);
}

const redirects = [
  ["/provincias/Alberta", "/provincias/alberta"],
  ["/provincias/ALBERTA", "/provincias/alberta"],
  ["/provincias/Ontario", "/provincias/ontario"],
  ["/provincias/Quebec", "/provincias/quebec"],
  ["/provincias/British-Columbia", "/provincias/british-columbia"],
  ["/ciudades/Calgary", "/ciudades/calgary"],
  ["/ciudades/Toronto", "/ciudades/toronto"],
  ["/ciudades/TORONTO", "/ciudades/toronto"],
  ["/provincias/%41lberta", "/provincias/alberta"],
  [
    "/provincias/Alberta?ref=MiCampana&tag=A&tag=B",
    "/provincias/alberta?ref=MiCampana&tag=A&tag=B",
  ],
  [articlePath.replace(/[^/]+$/, (slug) => slug.toUpperCase()), articlePath],
];

for (const [path, destination] of redirects) {
  const response = await request(path);
  assert.equal(response.status, 308, path);
  const location = new URL(response.headers.get("location"), base);
  assert.equal(location.origin, base.origin, path);
  assert.equal(location.pathname + location.search, destination, path);
  const target = await request(destination);
  assert.equal(target.status, 200, `Redirect target: ${destination}`);
  console.log(`308 ${path} -> ${destination} -> 200`);
}

// Genuine missing content must remain 404, with no normalization loops.
const missing = "/ciudades/url-regression-nonexistent-city";
assert.equal((await request(missing)).status, 404);
assert.equal((await request("/studio")).status, 200);
assert.equal((await request("/favicon.ico")).status, 200);
assert.equal((await request("/buscar?q=Toronto")).status, 200);
console.log("PASS: canonical URLs, permanent redirects, query preservation and route isolation");
