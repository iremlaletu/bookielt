import { defineQuery } from "next-sanity";

export const REVIEWS_QUERY = defineQuery(`*[_type == "review" && defined(slug.current) && !defined($search) || title match $search || bookname match $search || writername match $search || author->name match $search ] | order(_createdAt desc) {
    _id, 
    title,
    slug, 
    _createdAt,
    author -> {_id, name, image},
    description,
    likes,
    views,
    bookname,
    writername,
  }`)

  export const REVIEWS_BY_ID_QUERY = defineQuery(`*[_type == "review" && _id == $id][0]{
    _id, 
    title,
    slug, 
    author -> {_id, name, image},
    description,
    _createdAt, 
    body, 
    likes,
    bookname,
    writername,
    views
  }`)

  export const REVIEWS_VIEWS_QUERY = defineQuery(`
    *[_type == "review" && _id == $id ][0]{
      _id, 
      views
    }`)

  export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`
    *[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        email,
        image,
    }
    `);

    export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id,
        id,
        name,
        email,
        image,
    }
    `);

    export const REVIEWS_BY_AUTHOR_QUERY = defineQuery(`*[_type == "review" && author._ref == $id] | order(_createdAt desc) {
      _id, 
      title,
      slug, 
      _createdAt,
      author -> {_id, name, image},
      description,
      likes,
      views,
      bookname,
      writername,
      image
    }`)