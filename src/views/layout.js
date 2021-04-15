let arc = require('@architect/functions')

module.exports = function LayoutView ({title, content}) {
  return /*html*/`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <link rel="stylesheet" href="/styles/main.css" />
    <meta charset=utf-8>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>200 OK Ventures | ${ title }</title>
  </head>
  <body>
    <div id="root">
      <div id="header">
        <a href="/">200 OK</a> <a href="/faq">FAQ</a> <a href="/code-of-conduct">Code of Conduct</a>
      </div>
      ${ content }
      <div id="footer">
      &nbsp;
      </div>
    </div>
  </body>
  </html>  
`
}


