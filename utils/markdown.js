import MarkdownIt from 'markdown-it'
import highlight from './highlight'
import emoji from 'markdown-it-emoji'

const md = new MarkdownIt({
  html: true,
  typographer: true,
  highlight
})

md.use(emoji)

export default md
