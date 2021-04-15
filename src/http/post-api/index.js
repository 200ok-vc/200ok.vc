let arc = require('@architect/functions')
let data = require('@begin/data')
let fetch = require('node-fetch')
let validator = require('email-validator')
let skills = require('@architect/shared/data/skills.json').map((s) => s.name)

let handler = async function (req) {
  let res;
  // if "text" is passed as a parameter, then we are in localdev and this is a mock for the Slack webhook request
  if (req.body.text) {
    console.log(req.body)
    res = { body: "ok" }
  }
  // email must be valid
  else if (!validator.validate(req.body.email)) {
    res = {
      statusCode: 400,
      json: {
        result: 'error',
        message: 'The email must be valid (at least according to the NPM package we are using).'
      }
    }
  }
  // help needed must match a valid skill
  else if (skills.indexOf(req.body.need_help_with) < 0) { 
    res = {
      statusCode: 400,
      json: {
        result: 'error',
        message: 'The value for need_help_with must be *one* of these: ' + skills.join(", ")
      }
    }
  }
  else if (!req.body.name || !req.body.email || !req.body.startup || !req.body.one_liner || !req.body.need_help_with) {
    res = {
      statusCode: 400,
      json: {
        result: 'error',
        message: 'You must include all of the following POST parameters: name, email, startup, one_liner and need_help_with.'
      }
    }
  }
  // a valid HTTP request must include:
  // - name | string
  // - email | string
  // - startup | string
  // - one_liner | string
  // - need_help_with | string
  else {
    // store a record in our DB
    await data.set({ table: 'messages', key: req.body.email, ...req.body })
    // ping Slack
    let message = {
      text: `name: ${ req.body.name }\nemail: ${ req.body.email }\nstartup: ${ req.body.startup }\none liner: ${ req.body.one_liner }\nneed help with: ${ req.body.need_help_with }`
    }
    await fetch(process.env.SLACK_WEBHOOK_URL, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(message)})
    // write to Airtable
    // TODO
    res = {
      statusCode: 200,
      json: {
        result: 'success',
        message: 'Thanks, we will be in touch! Please check out https://200ok.vc/faq for more information on next steps.'
      }
    }
  }

  return res
}

exports.handler = arc.http.async(handler)
