let fs = require('fs')
let join = require('path').join
let arc = require('@architect/functions')
let IndexView = require('@architect/views/index')
let MemberView = require('@architect/views/member')
let PageView = require('@architect/views/pages')
let NotFoundView = require('@architect/views/404')
let memberData = require('@architect/shared/data/members.json')
let skillData = require('@architect/shared/data/skills.json')
let manifest = require('@architect/shared/static.json')

// return the member record (if one exists) from memberData JSON
function getMember(path) {
  return memberData.find((m) => m.slug === path.substring(1))
}

// return true if the markdown file exists, false otherwise
function pageExists(path) {
  let page = path.substr(1)
  let doc = join(__dirname, '..', '..', 'views', 'content', `${ page }.md`)
  return fs.existsSync(doc)
}

// return truthy if the asset requested is in our static manifest JSON, falsy otherwise
function staticExists(path) {
  let asset = path.substr(1)
  return manifest[asset]
}

/**
 * This router passes the request to the appropriate view or static asset
 */
async function Router (req) {
  // root (/) request, return Index view
  if (req.rawPath === '/') {
      return await IndexView({ memberData, skillData })
  }
  // the path matches the stub for a member (i.e. /carter-rabasa), return Member view
  else if (getMember(req.rawPath)) {
    return await MemberView({ member: getMember(req.rawPath) })
  }
  // the path matches a markdown file in our filesystem
  else if (pageExists(req.rawPath)) {
    return await PageView(req)
  }
  // the path matches a static file we know about
  else if (staticExists(req.rawPath)) {
    return {
      statusCode: 301,
      headers: {
        location: arc.static(req.rawPath)
      }
    }
  }
  else return
}

exports.handler = arc.http.async(Router, NotFoundView)