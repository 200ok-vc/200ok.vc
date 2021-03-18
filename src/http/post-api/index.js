let arc = require('@architect/functions')

let handler = async function (req) {
  console.log(req)
  return {
    statusCode: 200,
    json: {
      echo: req.body.echo,
      foo: 'bar',
      baz: 'batttt'
    }
  }
}

exports.handler = arc.http.async(handler)
