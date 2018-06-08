import * as contentful from 'contentful'

export default contentful.createClient({
  space: process.env.CF_SPACE_ID,
  accessToken: process.env.CF_ACCESS_TOKEN
})