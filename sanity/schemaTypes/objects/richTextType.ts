import {
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

export const richTextType = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'array',

  of: [
    defineArrayMember({
      type: 'block',

      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],

      lists: [
        {title: 'Bullet List', value: 'bullet'},
        {title: 'Numbered List', value: 'number'},
      ],

      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],

        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',

            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (Rule) =>
                  Rule.required().uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              }),

              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),

    defineArrayMember({
      type: 'editorialImage',
    }),
  ],
})