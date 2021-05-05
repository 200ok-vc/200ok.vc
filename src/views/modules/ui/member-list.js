import Member from './member.js'
import Skill from './item-skill.js'

export default function Members(props) {
  props = props || {}
  let selectedSkills = props.selectedSkills || []
  let members = (props.members || [])
    .sort(() => Math.random() - 0.5)
    .map(member => Member({ member, selectedSkills })).join('')
  let skills = (props.skills || [])
    .map(skill => Skill({
      skill,
      selected: selectedSkills.includes(skill),
      selectedSkills
    })).join('')
  return `
  <div id=skill-list>
    ${ skills }
    ${ selectedSkills.length > 0 ? `<a id=js-skills-clear class="js-skill" href="?clear">view all</a>` : '' }
  </div>
  <div class=list>
    ${ members }
  </div>
  `
}
