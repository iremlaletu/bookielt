import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('review').title('Reviews'),
    ])

    // you can decide here how do you arrenge your schemas
    // do you want to group them add specific schemas on top