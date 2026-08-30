
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
    'Código oficial de la provincia o territorio de Canadá.',
  options: {
    list: [
      {title: 'Alberta (AB)', value: 'AB'},
      {title: 'British Columbia (BC)', value: 'BC'},
      {title: 'Manitoba (MB)', value: 'MB'},
      {title: 'New Brunswick (NB)', value: 'NB'},
      {title: 'Newfoundland and Labrador (NL)', value: 'NL'},
      {title: 'Nova Scotia (NS)', value: 'NS'},
      {title: 'Northwest Territories (NT)', value: 'NT'},
      {title: 'Nunavut (NU)', value: 'NU'},
      {title: 'Ontario (ON)', value: 'ON'},
      {title: 'Prince Edward Island (PE)', value: 'PE'},
      {title: 'Quebec (QC)', value: 'QC'},
      {title: 'Saskatchewan (SK)', value: 'SK'},
      {title: 'Yukon (YT)', value: 'YT'},
    ],
    layout: 'dropdown',
  },
  validation: (Rule) => Rule.required(),
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