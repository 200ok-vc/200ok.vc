let MemberList = require("../modules/ui/member-list.js").default;

module.exports = function MemberComponent({ members, skills, selectedSkills }) {
  let output = MemberList({ members, skills, selectedSkills });
  return `<div id=js-member-list>${output}</div>`;
};
