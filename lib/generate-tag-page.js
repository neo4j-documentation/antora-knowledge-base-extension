'use strict'

const createPage = (tag, pages, asciidocConfig) => {
  const attributes = {
    ...asciidocConfig.attributes,
    'page-layout': 'kb-tag',
    'page-tag': tag,
    'page-tag-pages': pages,
    'page-breadcrumb': tag,
  }
  return {
    title: `Tag ${tag}`,
    asciidoc: {
      attributes
    },
    src: {
      component: 'kb',
      version: 'master',
      module: 'ROOT',
      family: 'page',
      relative: `tags/${tag}.adoc`,
      stem: tag,
      mediaType: 'text/asciidoc'
    }
  }
}

function generate (pages, contentCatalog, asciidocConfig) {
  const pagesPerTag = pages
    .filter((page) => page.asciidoc && page.asciidoc.attributes && page.asciidoc.attributes.tags)
    .reduce((acc, page) => {
      // category must be a single value
      const category = page.asciidoc.attributes.category.split(',')[0].trim().toLowerCase()
      let pages
      if (category in acc) {
        pages = acc[category]
      } else {
        pages = []
        acc[category] = pages
      }
      pages.push(page)
      return acc
    }, {})
  return Object.entries(pagesPerTag).map(([tag, associatedPages]) => createPage(tag, associatedPages, asciidocConfig))
}

module.exports = generate
