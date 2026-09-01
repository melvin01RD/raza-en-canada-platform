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

export const provinceBySlugQuery = `
  *[
    _type == "province" &&
    slug.current == $slug
  ][0] {
    _id,
    name,
    "slug": slug.current,
    code,
    description,
    heroImage,
    seo,

    "cities": *[
      _type == "city" &&
      province._ref == ^._id
    ] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      description
    }
  }
`;

export const cityBySlugQuery = `
  *[
    _type == "city" &&
    slug.current == $slug
  ][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    heroImage,
    seo,

    province->{
      _id,
      name,
      "slug": slug.current,
      code
    }
  }
`;