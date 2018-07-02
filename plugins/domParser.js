let JSDOM, parser
if (process.server) {
  JSDOM = require('jsdom').JSDOM
} else {
  parser = new DOMParser()
}

export default function parseHtml(html) {
  if (process.server) {
    return new JSDOM(html).window.document
  } else {
    return parser.parseFromString(html, 'text/html')
  }
}