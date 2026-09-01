export const featuredProvincesQuery = `
  *[
    _type == "province" &&
    code in ["AB", "BC", "ON", "QC"]
  ] {
    _id,
    name,
    "slug": slug.current,
    code,
    description,
    heroImage
  }
`;