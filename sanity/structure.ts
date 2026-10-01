import type {StructureResolver} from 'sanity/structure'
import {siteConfig} from '../config/site'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title(siteConfig.name)
    .items([
      S.documentTypeListItem('article').title('Articles'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['article', 'category', 'author'].includes(item.getId()!),
      ),
    ])
