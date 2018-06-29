import * as contentful from 'contentful'

export default contentful.createClient({
  space: process.env.CF_SPACE_ID,
  accessToken: process.env.CF_ACCESS_TOKEN
})

export const defaultPostQuery = {
  'content_type': 'post',
  order: '-sys.createdAt',
  limit: 10,
  select: [
    'sys.createdAt',
    'fields.title',
    'fields.slug',
    'fields.tags',
    'fields.author',
    'fields.heroImage',
    'fields.summary'
  ].join(',')
}