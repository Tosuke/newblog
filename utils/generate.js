import dotenv from 'dotenv'
import * as contentful from 'contentful'
import fs from 'fs'
import util from 'util'

const promisify = util.promisify
const writeFile = promisify(fs.writeFile)

dotenv.config()

const client = contentful.createClient({
  space: process.env.CF_SPACE_ID,
  accessToken: process.env.CF_ACCESS_TOKEN
})

async function main() {
  const result = await client.getEntries({
    'content_type': 'post',
    order: 'sys.createdAt',
    limit: 1000
  })
  const posts = result.items

  const tasks = []

  tasks.push(promisify(fs.writeFile)('posts.json', JSON.stringify(posts), 'utf8'))
  
  if (!await promisify(fs.exists)('assets/posts')) {
    await promisify(fs.mkdir)('assets/posts')
  }

  for(const post of posts) {
    console.log(post.fields.slug)
    tasks.push(writeFile(`assets/posts/${post.fields.slug}.md`, post.fields.body, 'utf8'))
    const postObj = {
      sys: {
        createdAt: post.sys.createdAt
      },
      fields: {
        title: post.fields.title,
        tags: post.fields.tags,
        author: post.fields.author,
        heroImage: post.fields.heroImage,
        description: post.fields.description
      }
    }
    tasks.push(writeFile(`assets/posts/${post.fields.slug}.json`, JSON.stringify(postObj), 'utf8'))
  }

  await Promise.all(tasks)
}

main().catch(err => console.error(err))
