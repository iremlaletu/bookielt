import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// this is the sanity read client for fetching data through queries
// if you set the useCdn set "false", this will make sure to cache whatever content you request for 60 seconds
// after 60 seconds you'll get a newer version of the data
// in between content will be delivered from the sanity