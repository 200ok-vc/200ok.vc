let members = require('./data/members.json')

module.exports = function GetMemberData (req) {
  // Collect all the speakers topics into an array with no duplicate topics
  let skills = members.reduce((a, r) => [...new Set(a.concat(r.skills))].sort(), [])
  let params = req.queryStringParameters || {}
  // Parse topics from the comma separated list in the query params
  let selectedSkills = params.skills && params.skills.split(',').map(t => t.trim())
  // If topics were passed as params
  if (selectedSkills) {
    // Only return speakers that have one of the selected topics
    members = members.filter(s => {
      let memberSkills = s.skills || []
      return memberSkills.some(memberSkill => selectedSkills.some(selectedSkill => memberSkill === selectedSkill))
    })
  }
  return { members, skills, selectedSkills }
}