
import {defineField, defineType} from 'sanity'

export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),

    defineField({
      name: 'bookname',
      type: 'string',
    }),

    defineField({
      name: 'writername',
      type: 'string',
    }),
    
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),

    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),

    defineField({
      name: 'views',
      type: 'number',
    }),

    defineField({
      name: 'description',
      type: 'text',
    }),

    defineField({
      name: 'body',
      type: 'markdown',
    }),
  ],
})
