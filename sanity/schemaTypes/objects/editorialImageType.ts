import {defineField, defineType} from 'sanity'

export const editorialImageType = defineType({
  name: 'editorialImage',
  title: 'Editorial Image',
  type: 'object',

  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description:
        'Describe el contenido o propósito de la imagen para usuarios que utilizan lectores de pantalla.',
      validation: (Rule) =>
        Rule.required().error(
          'El texto alternativo es obligatorio para imágenes editoriales.',
        ),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Texto opcional que puede mostrarse debajo de la imagen.',
    }),

    defineField({
      name: 'credit',
      title: 'Image Credit',
      type: 'string',
      description:
        'Autor, fotógrafo, organización o fuente propietaria de la imagen.',
    }),
  ],

  preview: {
    select: {
      title: 'alt',
      subtitle: 'credit',
      media: 'image',
    },
  },
})