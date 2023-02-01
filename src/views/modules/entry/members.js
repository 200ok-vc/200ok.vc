/* global window document */
import MemberList from "../ui/member-list.js";

(function Main() {
  let selectedSkills = []
  addEventHandlers()

  async function getData(url) {
    let data = await (
      await window.fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json()
    update(data)
  }

  function update(data) {
    let container = document.getElementById("js-member-list")
    if (container) {
      container.innerHTML = MemberList(data)
      addEventHandlers()
    }
  }

  function addEventHandlers() {
    let skills = document.querySelectorAll(".js-skill")
    // attach add/remove skill handlers
    Array.prototype.forEach.call(
      skills,
      (t) =>
        (t.onclick = (e) => {
          e.preventDefault()
          let data = t.dataset || {}
          let skill = data.skill
          let action = selectedSkills.includes(skill) ? removeSkill : addSkill
          selectedSkills = action(selectedSkills, skill)
          let url = "/members" + getSkillParams(selectedSkills)
          getData(url)
          window.history.pushState(
            "",
            "",
            window.location.pathname + getSkillParams(selectedSkills)
          )
        })
    )
    // attach clear skills handler
    let clear = document.getElementById("js-skills-clear")
    // if no skills have been selected, the clear button does not render
    if (clear) {
      clear.onclick = (e) => {
        e.preventDefault()
        selectedSkills = []
        let url = "/members"
        getData(url)
        window.history.pushState("", "", window.location.pathname)
      }
    }
  }

  function addSkill(skills, skill) {
    skills.push(skill)
    return [...new Set([...skills])]
  }

  function removeSkill(skills, skill) {
    skills.splice(skills.indexOf(skill), 1)
    return skills
  }

  function getSkillParams(selectedSkills) {
    selectedSkills = selectedSkills || []
    return selectedSkills.length ? `?skills=${selectedSkills.join(",")}` : ""
  }
})()
