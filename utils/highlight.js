import prism from 'prismjs'
import loadLanguages from 'prismjs/components/index'
import md from 'markdown-it'

loadLanguages(['markup', 'css', 'javascript'])

function wrap(code, lang) {
  return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`
}

export default function highlight(str, lang) {
  lang = lang || 'text'
  lang.toLowerCase()
  if (lang === 'vue' || lang === 'html' || lang === 'xml') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }

  if (!(lang in prism.languages)) {
    try {
      loadLanguages([lang])
    } catch(err) {
      console.warn(`Syntax highlight for ${lang} is not supported`)
    }
  }

  return lang in prism.languages
    ? wrap(prism.highlight(str, prism.languages[lang]), lang)
    : wrap(md().utils.escapeHtml(str), 'text')
}
