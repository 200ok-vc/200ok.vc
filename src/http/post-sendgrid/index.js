let arc = require('@architect/functions')
let sendgrid = require('@sendgrid/mail')

let handler = async function (req) {
  let res;
  // forward the contents of the incoming email
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
  console.log(req.body)
  let msg = { ...req.body, from: process.env.FROM_EMAIL, to: process.env.FWD_EMAIL, reply_to: req.body.from }
  console.log(msg)
  await sendgrid.send(msg)
  res = {
    statusCode: 200,
    body: "ok"
  }

  return res
}

exports.handler = arc.http.async(handler)
