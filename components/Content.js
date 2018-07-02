import parseHtml from '~/plugins/domParser'

export default {
  functional: true,
  props: {
    html: {
      type: String,
      required: true
    }
  },
  render(h, ctx) {
    function renderChildren(el) {
      let children = [], child
      if (child = el.firstChild) {
        do {
          if (child.nodeName === '#text') {
            children.push(child.textContent)
          } else {
            children.push(renderElement(child))
          }
        } while ((child = child.nextSibling))
      }
      return children
    }

    function renderElement(el) {
      let attrs = {}
      if (el.hasAttributes()) {
        const elAttrs = el.attributes
        for (let i = 0; i < elAttrs.length; i++) {
          const node = elAttrs[i]
          attrs[node.name] = node.value
        }
      }
      return h(el.tagName.toLowerCase(), { attrs }, renderChildren(el))
    }

    const doc = parseHtml(ctx.props.html)
    return h('div', ctx.data, [
      h('div', { attrs: { class: 'content' } }, renderChildren(doc.body))
    ])
  }
}
