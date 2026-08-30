
import {defineField, defineType} from 'sanity'

export const provinceType = defineType({
  name: 'province',
  title: 'Province',
  type: 'document',


  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'code',
      title: 'Province / Territory Code',
      type: 'string',
      description:
        'Código oficial de dos letras, por ejemplo AB, ON, BC o QC.',
      validation: (Rule) =>
        Rule.required()
          .length(2)
          .uppercase(),
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
      subtitle: 'code',
      media: 'heroImage.image',
    },
  },
})