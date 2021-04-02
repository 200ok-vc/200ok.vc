let arc = require('@architect/functions')
let data = require('@begin/data')
let fetch = require('node-fetch')
let validator = require('email-validator')

let handler = async function (req) {
  let res;
  
  // if "text" is passed as a parameter, then we are in localdev
  if (req.body.text) {
    console.log("A", req.body)
    res = { body: "ok" }
  }
  // a valid staging/prod HTTP request must include:
  // - name | string
  // - email | string
  // - startup | string
  else if (req.body.name && req.body.email && req.body.startup && validator.validate(req.body.email)) {
    // store a record in our DB
    await data.set({ table: 'messages', key: req.body.email, ...req.body })
    // ping Slack
    const params = new URLSearchParams()
    params.append('text', `name: ${ req.body.name }\nemail: ${ req.body.email }\nstartup: ${ req.body.startup }`)
    await fetch(process.env.SLACK_WEBHOOK_URL, {method: 'POST', body: params})
    res = {
      statusCode: 200,
      json: {
        result: 'success',
        message: 'Thanks, we will be in touch 🤘'
      }
    }
  }
  else {
    res = {
      statusCode: 400,
      json: {
        result: 'error',
        message: 'You must include all of the following POST parameters: name, email, body. Email must be valid.'
      }
    }
  }
  return res
}

exports.handler = arc.http.async(handler)
