import {type SchemaTypeDefinition} from 'sanity'

import {authorType} from './authorType'
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'

import {editorialImageType} from './objects/editorialImageType'
import {richTextType} from './objects/richTextType'
import {seoType} from './objects/seoType'
import {sourceType} from './objects/sourceType'

export const schema: {
  types: SchemaTypeDefinition[]
} = {
  types: [
    // Reusable content objects
    editorialImageType,
    richTextType,
    sourceType,
    seoType,

    // Temporary compatibility with the Sanity Blog starter
    blockContentType,

    // Existing document types
    categoryType,
    postType,
    authorType,
  ],
}