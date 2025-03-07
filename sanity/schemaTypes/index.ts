import { type SchemaTypeDefinition } from 'sanity'
import {reviewType} from './reviewType'
import {authorType} from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ authorType, reviewType],
}
