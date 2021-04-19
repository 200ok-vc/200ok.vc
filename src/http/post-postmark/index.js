let arc = require('@architect/functions')
let fetch = require('node-fetch')

let handler = async function (req) {
  let { From, Subject, TextBody, HtmlBody } = req.body
  // forward email to forwarding address
  let To = process.env.FWD_EMAIL
  // set reply-to to the original sender
  let ReplyTo = From
  // set from to the 200ok from address
  From = process.env.BOT_EMAIL
  // set message stream
  let MessageStream = "outbound"
  let msg = { To, MessageStream, From, ReplyTo, Subject, TextBody, HtmlBody }
  await fetch('https://api.postmarkapp.com/email', { method: 'POST', headers: { 'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY, 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(msg) })
  return {
    statusCode: 200,
    body: "OK"
  }
}

exports.handler = arc.http.async(handler)