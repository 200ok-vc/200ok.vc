let Layout = require('./layout')
let MembersComponent = require('./components/members')

module.exports = async function MembersView({ members, skills, selectedSkills }) {
    let content = await MembersComponent({ members, skills, selectedSkills })
    let html = Layout({ title: 'Members', content, scripts: ['modules/entry/members.js'] })
    return { html }
}
