import {defineField, defineType} from 'sanity'

export const sourceType = defineType({
  name: 'source',
  title: 'Source',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Source Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publisher',
      title: 'Publisher / Organization',
      type: 'string',
      description:
        'Organización responsable de la información, por ejemplo Government of Canada o IRCC.',
    }),

    defineField({
      name: 'url',
      title: 'Source URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'sourceType',
      title: 'Source Type',
      type: 'string',
      options: {
        list: [
          {title: 'Official Government', value: 'officialGovernment'},
          {title: 'Official Organization', value: 'officialOrganization'},
          {title: 'Editorial', value: 'editorial'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'lastVerifiedAt',
      title: 'Last Verified',
      type: 'datetime',
      description:
        'Fecha en la que se verificó por última vez que esta fuente seguía vigente.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'publisher',
    },
  },
})