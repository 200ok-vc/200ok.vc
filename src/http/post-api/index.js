let arc = require('@architect/functions')
let data = require('@begin/data')
let validator = require('email-validator')

let handler = async function (req) {
  let res;

  // a valid HTTP request must include:
  // - name | string
  // - email | string
  // - startup | string  
  if (req.body.name && req.body.email && req.body.startup && validator.validate(req.body.email)) {
    await data.set({ table: 'messages', key: req.body.email, ...req.body })
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
