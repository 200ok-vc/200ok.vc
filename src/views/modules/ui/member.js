//import MemberSkill from './member-skill.js'

export default function Member(props) {
  let { slug, full_name, photo, skills } = props.member
  /*let selectedSkills = props.selectedSkills || []
  let skills = (member.skills || [])
    .map(skill => MemberSkill({ skill, selected: selectedSkills.includes(skill), selectedSkills }))
      .join('')*/

  return `
  <div class="member">
    <a href="/${ slug }" title="${ full_name }">
        <div class="member-photo" style="background-image:url('${ photo }')"></div>
    </a>
    <!-- ${ skills } -->
  </div>
`
}
