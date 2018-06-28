const cache = new Map()

export function preload(slug) {
  if (!cache.has(slug)) {
    cache.set(slug, {
      meta: import(`~/assets/posts/${slug}.json`),
      body: import(`~/assets/posts/${slug}.md`)
    })
  }
}

export function get(slug) {
  preload(slug)
  const content = cache.get(slug)
  return {
    meta: content.meta,
    component: () => content.body
  }
}