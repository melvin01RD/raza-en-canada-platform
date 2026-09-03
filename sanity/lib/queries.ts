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

export const latestArticlesQuery = `
  *[
    _type == "article" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now() &&
    !(_id in path("drafts.**"))
  ]
  | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,

    mainImage {
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      alt,
      caption
    },

    category->{
      title,
      "slug": slug.current
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