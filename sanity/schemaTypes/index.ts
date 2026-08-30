import {type SchemaTypeDefinition} from 'sanity'

import {authorType} from './authorType'
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'

import {editorialImageType} from './objects/editorialImageType'
import {richTextType} from './objects/richTextType'
import {seoType} from './objects/seoType'
import {socialLinkType} from './objects/socialLinkType'
import {sourceType} from './objects/sourceType'
import { provinceType } from './documents/provinceType'
import {cityType} from './documents/cityType'


export const schema: {
  types: SchemaTypeDefinition[]
} = {
  types: [
    // Reusable content objects
    editorialImageType,
    richTextType,
    sourceType,
    seoType,
    socialLinkType,
    cityType,
    

    // Temporary compatibility with the Sanity Blog starter
    blockContentType,

    // Existing document types
    categoryType,
    postType,
    authorType,
    provinceType
  ],
}