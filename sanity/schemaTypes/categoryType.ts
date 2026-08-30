import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().max(80),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(300).warning(
          'Se recomienda mantener la descripción en 300 caracteres o menos.',
        ),
    }),

    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description:
        'Identificador opcional de icono para representar esta categoría en el frontend.',
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Orden opcional utilizado para controlar la posición de la categoría en listados y navegación.',
      validation: (Rule) =>
        Rule.integer().min(0),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})