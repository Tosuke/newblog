import MarkdownIt from 'markdown-it'
import highlight from './highlight'
import emoji from 'markdown-it-emoji'
import link from './markdownLink'
import image from './markdownImage'

const md = new MarkdownIt({
  html: true,
  typographer: true,
  highlight
})

md.use(emoji)
  .use(link)
  .use(image)

export default md
