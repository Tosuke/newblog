import axios from 'axios'

let readFile
if (process.server) {
  const fs = require('fs')
  // なぜかrequire('util')できない
  readFile = (path, encoding) =>
    new Promise((res, rej) => {
      fs.readFile(path, encoding, (err, data) => {
        if (err) rej(err)
        res(data)
      })
    })
}

const cache = new Map()

export function preload(slug) {
  if (!cache.has(slug)) {
    let meta, content
    if (process.server) {
      meta = Promise.resolve(require(`~/static/_/posts/${slug}.json`))
      content = readFile(`static/_/posts/${slug}.html`, {
        encoding: 'utf8'
      })
    } else {
      meta = axios.get(`/_/posts/${slug}.json`).then(r => r.data)
      content = axios.get(`/_/posts/${slug}.html`).then(r => r.data)
    }
    cache.set(slug, Promise.all([meta, content]))
  }
}

export async function get(slug) {
  preload(slug)
  const [meta, content] = await cache.get(slug)
  return {
    meta, content
  }
}
