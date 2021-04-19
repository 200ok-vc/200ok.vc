let arc = require('@architect/functions')
let fetch = require('node-fetch')

let handler = async function (req) {
  let { From, Subject, TextBody, HtmlBody } = req.body
  let msg = { To: process.env.FWD_EMAIL, MessageStream: "outbound", From: process.env.FROM_EMAIL, ReplyTo: From, Subject, TextBody, HtmlBody }
  await fetch('https://api.postmarkapp.com/email', { method: 'POST', headers: { 'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY, 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(msg) })
  return {
    statusCode: 200,
    body: "OK"
  }
}

exports.handler = arc.http.async(handler)