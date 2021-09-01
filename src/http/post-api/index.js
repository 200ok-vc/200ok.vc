let arc = require('@architect/functions')
let data = require('@begin/data')
let fetch = require('node-fetch')
let validator = require('email-validator')
//let skills = require('@architect/shared/data/skills.json')

let handler = async function (req) {
  let res
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
  /*else if (skills.map((s) => s.name).indexOf(req.body.need_help_with) < 0) {
    res = {
      statusCode: 400,
      json: {
        result: 'error',
        message: 'The value for need_help_with must be *one* of these: ' + skills.map((s) => s.name).join(", ")
      }
    }
  }*/
  else if (!req.body.name || !req.body.email || !req.body.startup || !req.body.url) {
    res = {
      statusCode: 400,
      json: {
        result: 'error',
        message: 'You must include all of the following POST parameters: name, email, startup, url.'
      }
    }
  }
  // a valid HTTP request must include:
  // - name | string
  // - email | string
  // - startup | string
  // - url | string
  else {
    // store a record in our DB
    await data.set({ table: 'messages', key: req.body.email, ...req.body })
    // ping Slack
    let message = {
      text: `name: ${ req.body.name }\nemail: ${ req.body.email }\nstartup: ${ req.body.startup }\nurl: ${ req.body.url }`
    }
    await fetch(process.env.SLACK_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(message) })
    // send email
    let msg = {
      From: process.env.FROM_EMAIL,
      To: req.body.email,
      Subject: "Hi from 200ok.vc ✨",
      TextBody: `Hey there!

This is Carter, one of the investors at 200ok.vc 👋 Thanks for triggering this email by submitting a POST request to our API. We love APIs and hope you do too.

The #1 thing we want to do is help founders, so please tell us a little about your startup and what you could use assistance with:

https://airtable.com/shrhDcydUhYQdvD4W

After you fill-out the form, please reply to this email and say hello! The next step will be to set-up time to chat about your startup or idea.

--
Carter Rabasa
https://200ok.vc/carter-rabasa`,
      /*HtmlBody: `<html><body></body></html>`,*/
      MessageStream: "outbound"
    }
    await fetch('https://api.postmarkapp.com/email', { method: 'POST', headers: { 'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY, 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(msg) })
    res = {
      statusCode: 200,
      json: {
        result: 'success',
        message: 'Thanks! We just sent you an email with some next steps. Thanks for sending us the POST!'
      }
    }
  }

  return res
}

exports.handler = arc.http.async(handler)
