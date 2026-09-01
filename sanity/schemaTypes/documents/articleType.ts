import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'Short summary used in article cards, listings and search results.',
      validation: (Rule) =>
        Rule.required()
          .min(50)
          .max(200),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),


      defineField({
  name: 'category',
  title: 'Category',
  type: 'reference',
  to: [{type: 'category'}],
  validation: (Rule) => Rule.required(),
}),

defineField({
  name: 'province',
  title: 'Province',
  type: 'reference',
  to: [{type: 'province'}],
}),

defineField({
  name: 'city',
  title: 'City',
  type: 'reference',
  to: [{type: 'city'}],

  options: {
    filter: ({document}) => {
      const province = document.province as
        | {_ref?: string}
        | undefined

      if (!province?._ref) {
        return {
          filter: '_id == ""',
        }
      }

      return {
        filter: 'province._ref == $provinceId',
        params: {
          provinceId: province._ref,
        },
      }
    },
  },

  validation: (Rule) =>
    Rule.custom(async (city, context) => {
      if (!city?._ref) {
        return true
      }

      const province = context.document?.province as
        | {_ref?: string}
        | undefined

      if (!province?._ref) {
        return 'Select a province before selecting a city.'
      }

      const client = context.getClient({
        apiVersion: '2026-08-30',
      })

      const cityProvinceId = await client.fetch<string | null>(
        `*[_id == $cityId][0].province._ref`,
        {
          cityId: city._ref,
        },
      )

      if (cityProvinceId !== province._ref) {
        return 'The selected city does not belong to the selected province.'
      }

      return true
    }),
}),

defineField({
  name: 'mainImage',
  title: 'Main Image',
  type: 'editorialImage',
  validation: (Rule) => Rule.required(),
}),

defineField({
  name: 'body',
  title: 'Body',
  type: 'richText',
  validation: (Rule) => Rule.required(),
}),

defineField({
  name: 'sources',
  title: 'Sources',
  type: 'array',
  description:
    'Official sources, references or external links used to support the article.',
  of: [
    {
      type: 'source',
    },
  ],
}),

defineField({
  name: 'seo',
  title: 'SEO',
  type: 'seo',
}),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
    },

    prepare({title, author}) {
      return {
        title,
        subtitle: author ? `By ${author}` : 'No author',
      }
    },
  },
})