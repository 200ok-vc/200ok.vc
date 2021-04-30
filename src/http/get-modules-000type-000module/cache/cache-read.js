const { existsSync } = require('fs')
const data = require('@begin/data')
const path = require('./cache-path')

module.exports = async function read({ type, mod }) {
  let key = `${type}/${mod}`

  // Get the cache contents
  let cache = await data.get({ table: 'module-cache' })

  // Fingerprinted requests
  let file = cache.length && cache.find(f => mod === f.filename && type === f.type) || false

  // Non-fingerprinted requests
  let forward = cache.find(f => key === f.key)
  let upgrade = false
  if (forward && forward.filename) {
    // If the build changed (or working locally) kick off a bundle
    let build = process.env.BEGIN_BUILD_COMMIT_SHA
    if (!build || (forward.build !== build)) return {}
    upgrade = forward.filename
  }

  // Look for the entry file on the filesystem to ensure validity
  if (!file && !existsSync(path(key)))
    throw ReferenceError(`not_found: ${ key }`)

  return { file, upgrade }
}
