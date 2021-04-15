let Layout = require('./layout')

module.exports = function MemberView ({ member }) {
    
    let content = `<div id="member">
            <h1>${ member.full_name }</h1>
            <p><img src="${ member.photo }" alt="Photo of ${ member.full_name }"/></p>
            <p>${ member.bio }</p>
            <p><a href="${ member.website }">${ member.website }</a></p>
            <pre>${ JSON.stringify({ super_powers: member.super_powers }, null, 2)}</pre>
        </div>`
    let html = Layout({ content, title: member.full_name })
    return { html }
  }