'use strict'

const createPage = (category, pages, asciidocConfig) => {
  const attributes = {
    ...asciidocConfig.attributes,
    'page-layout': 'kb-category',
    'page-category': category,
    'page-category-pages': pages,
    'page-breadcrumb': category
  }
  return {
    title: `Category ${category}`,
    asciidoc: {
      attributes
    },
    src: {
      component: 'kb',
      version: 'master',
      module: 'ROOT',
      family: 'page',
      relative: `categories/${category}.adoc`,
      stem: category,
      mediaType: 'text/asciidoc'
    }
  }
}

function generate (pages, contentCatalog, asciidocConfig) {
  const pagesPerCategory = pages
    .filter((page) => page.asciidoc && page.asciidoc.attributes && page.asciidoc.attributes.category)
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
  return Object.entries(pagesPerCategory).map(([category, associatedPages]) => createPage(category, associatedPages, asciidocConfig))
}

module.exports = generate
