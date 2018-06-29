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

main().catch(err => console.error(err))

async function main() {
  const result = await client.getEntries({
    content_type: 'post',
    order: '-sys.updatedAt',
    limit: 1000
  })
  const posts = result.items

  const tasks = []

  tasks.push(
    promisify(fs.writeFile)('posts.json', JSON.stringify(posts), 'utf8')
  )

  await Promise.all(
    ['assets/posts', 'static/feed'].map(async path => {
      if (!(await promisify(fs.exists)(path))) {
        await promisify(fs.mkdir)(path)
      }
    })
  )

  const atomEntries = []

  for (const post of posts) {
    console.log(post.fields.slug)
    tasks.push(
      writeFile(
        `assets/posts/${post.fields.slug}.md`,
        post.fields.content,
        'utf8'
      )
    )
    tasks.push(
      writeFile(
        `assets/posts/${post.fields.slug}.json`,
        JSON.stringify(sanitizePost(post)),
        'utf8'
      )
    )
    atomEntries.push(generateAtomEntry(post))
  }

  const atomFeed = generateAtomFeed(
    atomEntries,
    posts[0].fields.author.fields.name,
    posts[0].sys.updatedAt
  )
  tasks.push(writeFile('static/feed/atom.xml', atomFeed, 'utf8'))

  await Promise.all(tasks)
}

function sanitizePost(post) {
  return {
    sys: {
      createdAt: post.sys.createdAt
    },
    fields: {
      title: post.fields.title,
      tags: post.fields.tags,
      author: post.fields.author,
      heroImage: post.fields.heroImage,
      summary: post.fields.summary
    }
  }
}

function generateAtomEntry(post) {
  const root = `https://${process.env.HOST}`
  const id = `tag:${process.env.HOST},${post.sys.createdAt}:${post.fields.slug}`

  return `
<entry>
  <title>${post.fields.title}</title>
  <link rel="${root}/posts/${post.fields.slug}" rel="alternate"/>
  <id>${id}</id>
  <published>${post.sys.createdAt}</published>
  <updated>${post.sys.updatedAt}</updated>
  <summary>${post.fields.summary}</summary>
</entry>
  `
}

function generateAtomFeed(entries, aurhorName, updatedAt) {
  const root = `https://${process.env.HOST}`
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
  <title>${process.env.TITLE}</title>
  <subtitle>${process.env.SUBTITLE}</subtitle>
  <link rel="${root}" rel="alternate"/>
  <author><name>${aurhorName}</name></author>
  <updated>${updatedAt}</updated>

  ${entries.join('')}
</feed>
  `
}
