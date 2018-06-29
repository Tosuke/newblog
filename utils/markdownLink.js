export default function(md, options) {
  md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
    const token = tokens[idx]
    const hrefIdx = token.attrIndex('href')
    if (hrefIdx >= 0) {
      const href = token.attrs[hrefIdx][1]
      const isExternal = /^https?:/.test(href)
      const isPost = /\/posts\/[^\/]+$/.test(href)

      if (isExternal) {
        tokens = toExternalLink(tokens, idx)
      } else {
        tokens = toNuxtLink(tokens, idx)
      }
    }
    return self.renderToken(tokens, idx, opts, env, self)
  }
}

function toExternalLink(tokens, idx) {
  const externalAttrs = {
    target: '_blank',
    rel: 'noopener noreferrer'
  }
  Object.entries(externalAttrs).forEach(([key, val]) => {
      tokens[idx].attrSet(key, val)
  })
  return tokens
}

function toNuxtLink(tokens, idx) {
  const token = tokens[idx]
  const hrefIdx = token.attrIndex('href')
  token.attrs[hrefIdx][0] = 'to'
  let to = token.attrs[hrefIdx][1]

  if (!to.startsWith('/')) {
    to = ensureBeginningDotSlash(to)
  }

  token.attrs[hrefIdx][1] = decodeURI(to)

  token.tag = 'nuxt-link'
  tokens[idx + 2].tag = 'nuxt-link'
  tokens[idx] = token
  return tokens
}

const beginningSlashRE = /^\.\//

function ensureBeginningDotSlash (path) {
  if (beginningSlashRE.test(path)) {
    return path
  }
  return './' + path
}