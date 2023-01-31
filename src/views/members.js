let md = require("marked")
let Layout = require("./layout")
let MembersComponent = require("./components/members")

let Template = function ({ membersComponent }) {
  return (
    md(`
Our mission is to build a diverse and inclusive group of angel investors who care about helping founders build the next generation of dev tools. We have only three criteria:

- You are an [accredited investor](https://www.nerdwallet.com/blog/investing/what-is-an-accredited-investor/)
- You have worked in an operational role at an early stage dev tool startup
- You are willing to put in the time to talk to founders, do diligence and help source deals

<div class="cta"><a href="http://calendly.com/carter-rabasa">Book 👋 Call</a></div>`) +
    membersComponent
  )
}

module.exports = async function MembersView({
  members,
  skills,
  selectedSkills,
}) {
  let membersComponent = await MembersComponent({
    members,
    skills,
    selectedSkills,
  })
  let content = Template({ membersComponent })
  let html = Layout({
    title: "Members",
    content,
    scripts: ["modules/entry/members.js"],
  })
  return { html }
}
