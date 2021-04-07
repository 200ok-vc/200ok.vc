let arc = require('@architect/functions')
let IndexView = require('@architect/views/index')
let MemberView = require('@architect/views/member')
let PageView = require('@architect/views/pages')
let NotFoundView = require('@architect/views/404')
let memberData = require('@architect/shared/data/members.json')

function getMember(path) {
  return memberData.find((m) => m.slug === path.substring(1))
}

/**
 * Index & member & page views
 * - This root function handles the main index view, and...
 * - Anything not specifically caught by explicitly defined paths (i.e. `GET /code-of-conduct`)
 */
async function Index (req) {
  if (req.rawPath === '/') {
      return await IndexView({ memberData })
  }
  else if (getMember(req.rawPath)) {
    return await MemberView({ member: getMember(req.rawPath) })
  }
  else return
}

exports.handler = arc.http.async(Index, PageView, NotFoundView)