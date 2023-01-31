import getSelectedTopicsHref from "../utils/get-selected-skill-href.js"

export default function SkillItem(props) {
  props = props || {}
  let selectedSkills = props.selectedSkills || []
  let skill = props.skill || ""
  let selected = props.selected
  let href = getSelectedTopicsHref(selected, selectedSkills, skill)
  return `
<a
  href="${href}"
  class="js-skill ${selected ? "skill-selected" : ""}"
  data-skill="${skill}"
  data-selected="${selected}"
>
  ${skill}
</a>
  `
}
