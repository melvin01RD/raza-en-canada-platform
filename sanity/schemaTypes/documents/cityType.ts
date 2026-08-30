import {defineField, defineType} from 'sanity'

export const cityType = defineType({
  name: 'city',
  title: 'City',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().max(80),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: 'province',
      title: 'Province / Territory',
      type: 'reference',
      to: [
        {
          type: 'province',
        },
      ],
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.max(500).warning(
          'Se recomienda mantener la descripción en 500 caracteres o menos.',
        ),
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'editorialImage',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      province: 'province.name',
      media: 'heroImage.image',
    },

    prepare({title, province, media}) {
      return {
        title,
        subtitle: province
          ? `Province / Territory: ${province}`
          : 'No province assigned',
        media,
      }
    },
  },
})