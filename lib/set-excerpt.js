'use strict'

const cheerio = require('cheerio')

const generateExcerpt = (page) => {
  const $ = cheerio.load(page.contents.toString())
  // removes tables, images and source block
  $('table').remove()
  $('img').remove()
  $('pre').remove()
  $('iframe').remove()
  let text = $.text()
  text = text.trim()
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
  let words = text.split(' ')
  let excerpt
  if (words.length > 30) {
    words = words.slice(0, 30)
    excerpt = words.join(' ') + '…'
  } else {
    excerpt = words.join(' ')
  }
  return excerpt
}

// remind: could be an Asciidoctor Postprocessor extension
function setExcerpt(pages) {
  pages
    .filter((page) => page.src.basename !== 'index.adoc' && page.asciidoc && page.asciidoc.attributes && !page.asciidoc.attributes['description'])
    .forEach((page) => page.asciidoc.attributes['description'] = generateExcerpt(page))
}

module.exports = setExcerpt
