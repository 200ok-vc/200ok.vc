import getSelectedSkillsHref from "../utils/get-selected-skill-href.js"

export default function SpeakerTopic(props) {
  props = props || {}
  let selectedSkills = props.selectedSkills || []
  let skill = props.skill || ""
  let selected = props.selected
  let href = getSelectedSkillsHref(selected, selectedSkills, skill)
  return `
<a
  class="js-skill"
  href="${href}"
  data-skill="${skill}"
>
  ${skill}
</a>
  `
}
