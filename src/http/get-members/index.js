// eslint-disable-next-line no-global-assign
require = require("esm")(module)
let arc = require("@architect/functions")
const getMemberData = require("@architect/shared/get-member-data")
const isXHR = require("@architect/shared/utils/is-xhr")
const MembersView = require("@architect/views/members")

async function Members(req) {
  const { members, skills, selectedSkills } = getMemberData(req)
  // If this is an XHR request respond with JSON
  if (isXHR(req)) {
    let body = JSON.stringify({ members, skills, selectedSkills })
    let headers = { "content-type": "application/json; charset=utf8" }
    return { headers, body }
  } else {
    // else render the webpage
    return await MembersView({ members, skills, selectedSkills })
  }
}

exports.handler = arc.http.async(Members)
