const name = "Canadá Latino";

// Shared identity only; deployment-specific URL resolution stays on the server.
export const siteConfig = {
  name,
  fullName: `${name} Platform`,
  tagline: "Información y recursos para la comunidad latina en Canadá",
  description:
    "Información, recursos y contenido sobre vivir, trabajar, estudiar y establecerse en Canadá.",
  title: `${name} | Información para latinos en Canadá`,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
};
