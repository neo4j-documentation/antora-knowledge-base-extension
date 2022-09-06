/* global describe, it */
'use strict'

const generate = require('../lib/generate-tag-page')
const chai = require('chai')
const expect = chai.expect

describe('Generate tag pages', () => {
  it('should generate tag pages', () => {
    const tagPages = generate([{
      asciidoc: {
        attributes: {
          tags: 'IntelliJ,enterprise, embedded  ,Installation,,'
        }
      }
    }], {})
    expect(tagPages).to.deep.equal([
      {
        title: 'Tag intellij',
        asciidoc: {
          attributes: {
            'page-breadcrumb': 'intellij',
            'page-layout': 'kb-tag',
            'page-tag': 'intellij',
            'page-tag-pages': [
              {
                asciidoc: {
                  attributes: {
                    tags: 'IntelliJ,enterprise, embedded  ,Installation,,'
                  }
                }
              }
            ]
          }
        },
        src: {
          component: 'kb',
          version: 'master',
          module: 'ROOT',
          family: 'page',
          relative: 'tags/intellij.adoc',
          stem: 'intellij',
          mediaType: 'text/asciidoc'
        }
      },
      {
        title: 'Tag enterprise',
        asciidoc: {
          attributes: {
            'page-breadcrumb': 'enterprise',
            'page-layout': 'kb-tag',
            'page-tag': 'enterprise',
            'page-tag-pages': [
              {
                asciidoc: {
                  attributes: {
                    tags: 'IntelliJ,enterprise, embedded  ,Installation,,'
                  }
                }
              }
            ]
          }
        },
        src: {
          component: 'kb',
          version: 'master',
          module: 'ROOT',
          family: 'page',
          relative: 'tags/enterprise.adoc',
          stem: 'enterprise',
          mediaType: 'text/asciidoc'
        }
      },
      {
        title: 'Tag embedded',
        asciidoc: {
          attributes: {
            'page-breadcrumb': 'embedded',
            'page-layout': 'kb-tag',
            'page-tag': 'embedded',
            'page-tag-pages': [
              {
                asciidoc: {
                  attributes: {
                    tags: 'IntelliJ,enterprise, embedded  ,Installation,,'
                  }
                }
              }
            ]
          }
        },
        src: {
          component: 'kb',
          version: 'master',
          module: 'ROOT',
          family: 'page',
          relative: 'tags/embedded.adoc',
          stem: 'embedded',
          mediaType: 'text/asciidoc'
        }
      },
      {
        title: 'Tag installation',
        asciidoc: {
          attributes: {
            'page-breadcrumb': 'installation',
            'page-layout': 'kb-tag',
            'page-tag': 'installation',
            'page-tag-pages': [
              {
                asciidoc: {
                  attributes: {
                    tags: 'IntelliJ,enterprise, embedded  ,Installation,,'
                  }
                }
              }
            ]
          }
        },
        src: {
          component: 'kb',
          version: 'master',
          module: 'ROOT',
          family: 'page',
          relative: 'tags/installation.adoc',
          stem: 'installation',
          mediaType: 'text/asciidoc'
        }
      }
    ])
    console.log(tagPages)
  })
})
