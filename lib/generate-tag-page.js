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

function generate (pages, asciidocConfig) {
  const pagesPerTag = pages
    .filter((page) => page.asciidoc && page.asciidoc.attributes && page.asciidoc.attributes.tags)
    .reduce((acc, page) => {
      const tagsAttribute = page.asciidoc.attributes.tags
      const tags = tagsAttribute.trim().split(',').map((value) => value.trim().toLowerCase()).filter((value) => value !== '')
      for (const tag of tags) {
        let pages
        if (tag in acc) {
          pages = acc[tag]
        } else {
          pages = []
          acc[tag] = pages
        }
        pages.push(page)
      }
      return acc
    }, {})
  return Object.entries(pagesPerTag).map(([tag, associatedPages]) => createPage(tag, associatedPages, asciidocConfig))
}

module.exports = generate
