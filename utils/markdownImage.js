export default function(md, options) {
  md.renderer.rules.image = (tokens, idx, opts, env, self) => {
    const rendered = self.renderToken(tokens, idx, opts, env, self)
    const token = tokens[idx]
    const srcIdx = token.attrIndex('src')
    if (srcIdx >= 0) {
      const src = token.attrs[srcIdx][1]
      const isCFAsset = /^(https?)?\/\/images.ctfassets.net/.test(src)
      if (isCFAsset) {
        return `<picture><source type="image/webp" srcset="${src}?fm=webp">${rendered}</picture>`
      }
    }
    return rendered
  }
}