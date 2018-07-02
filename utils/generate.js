import dotenv from './env'
import * as contentful from 'contentful'
import md from './markdown'
import htmlMinifier from 'html-minifier'
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
    ['static/_', 'static/_/posts', 'static/feed'].map(async path => {
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
        `static/_/posts/${post.fields.slug}.html`,
        htmlMinifier.minify(md.render(post.fields.content), {
          conservativeCollapse: true
        }),
        'utf8'
      )
    )
    tasks.push(
      writeFile(
        `static/_/posts/${post.fields.slug}.json`,
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
  const padding = (n) => ('0000' + n).slice(-2)

  const root = process.env.URL
  const createdAt = new Date(post.sys.createdAt)
  const date = `${createdAt.getFullYear()}-${padding(createdAt.getMonth())}-${padding(createdAt.getDay())}`
  const id = `tag:${new URL(root).host},${date}:${post.fields.slug}`

  return `
<entry>
  <title>${post.fields.title}</title>
  <link rel="alternate" href="${root}/posts/${post.fields.slug}"/>
  <id>${id}</id>
  <published>${post.sys.createdAt}</published>
  <updated>${post.sys.updatedAt}</updated>
  <summary>${post.fields.summary}</summary>
</entry>
  `
}

function generateAtomFeed(entries, aurhorName, updatedAt) {
  const root = process.env.URL
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
  <title>${process.env.TITLE}</title>
  <subtitle>${process.env.SUBTITLE}</subtitle>
  <link rel="alternate" href="${root}"/>
  <link rel="self" type="application/atom+xml" href="${root}/feed/atom.xml"/>
  <author><name>${aurhorName}</name></author>
  <id>tag:${new URL(root).host},2018:feed</id>
  <updated>${updatedAt}</updated>

  ${entries.join('')}
</feed>
  `
}
