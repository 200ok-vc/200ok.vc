let arc = require('@architect/functions')
let IndexView = require('@architect/views/index')
let PageView = require('@architect/views/pages')
let NotFoundView = require('@architect/views/404')

/**
 * Index & page views
 * - This root function handles the main index view, and...
 * - Anything not specifically caught by explicitly defined paths (i.e. `GET /code-of-conduct`)
 */

async function Index (req) {
  if (req.rawPath === '/') {
      return await IndexView()
  }
  else return
}

exports.handler = arc.http.async(Index, PageView, NotFoundView)