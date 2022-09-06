'use strict'

// The name of the package in order to give the Antora logger a useful name
const { name: packageName } = require('../package.json')
const setExcerpt = require('./set-excerpt')
const generateCategoryPage = require('./generate-category-page')
const generateTagPage = require('./generate-tag-page')

function register({ config: { componentName = 'kb', ...unknownOptions } }) {
  if (Object.keys(unknownOptions).length) {
    const keys = Object.keys(unknownOptions)
    throw new Error(`Unrecognized option${keys.length > 1 ? 's' : ''} specified for ${packageName}: ${keys.join(', ')}`)
  }

  this.on('navigationBuilt', async ({ contentCatalog, siteAsciiDocConfig }) => {
    const pages = contentCatalog.getPages((page) => page.src.component === componentName)
    setExcerpt(pages)
    const categoryPages = generateCategoryPage(pages, contentCatalog, siteAsciiDocConfig)
    for (const categoryPage of categoryPages) {
      contentCatalog.addFile(categoryPage)
    }
    const tagPages = generateTagPage(pages, contentCatalog, siteAsciiDocConfig)
    for (const tagPage of tagPages) {
      contentCatalog.addFile(tagPage)
    }
  })
}

module.exports = { register }
