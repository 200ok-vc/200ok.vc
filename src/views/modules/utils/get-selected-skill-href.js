export default function getSelectedTopicsHref(selected, selectedSkills, skill) {
  return selected
    ? selectedSkills.length === 1
      ? '/members'
      : `?skills=${selectedSkills.filter(t => t !== skill).join(',')}`
    : `?skills=${selectedSkills.concat([skill]).join(',')}`
}
