import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',

  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'Título utilizado por motores de búsqueda y al compartir el contenido.',
      validation: (Rule) =>
        Rule.max(60).warning(
          'Se recomienda mantener el título SEO en 60 caracteres o menos.',
        ),
    }),

    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Descripción utilizada principalmente en resultados de búsqueda.',
      validation: (Rule) =>
        Rule.max(160).warning(
          'Se recomienda mantener la descripción SEO en 160 caracteres o menos.',
        ),
    }),

    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description:
        'Usar solamente cuando este contenido deba apuntar a una URL canónica diferente.',
    }),

    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'editorialImage',
      description:
        'Imagen opcional utilizada al compartir el contenido en redes sociales.',
    }),

    defineField({
      name: 'noIndex',
      title: 'Prevent Search Engine Indexing',
      type: 'boolean',
      description:
        'Actívalo solamente cuando esta página no deba aparecer en motores de búsqueda.',
      initialValue: false,
    }),
  ],

  options: {
    collapsible: true,
    collapsed: true,
  },
})