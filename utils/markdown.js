import MarkdownIt from 'markdown-it'
import highlight from './highlight'
import emoji from 'markdown-it-emoji'
import link from './markdownLink'

const md = new MarkdownIt({
  html: true,
  typographer: true,
  highlight
})

md.use(emoji)
md.use(link)

export default md
