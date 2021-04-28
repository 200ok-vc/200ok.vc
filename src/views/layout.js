let arc = require('@architect/functions')

module.exports = function LayoutView ({title, content}) {
  return /*html*/`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <link rel="stylesheet" href="/styles/main.css" />
    <meta charset=utf-8>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:image" content="https://200ok.vc/images/200ok-social-sharing.jpg" />
    <meta name="twitter:image" content="https://200ok.vc/images/200ok-social-sharing.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@200okVC">
    <meta name="twitter:title" content="200ok.vc // we help folks building tools for developers">
    <title>200 OK Ventures | ${ title }</title>
  </head>
  <body>
    <div id="root">
      <div id="header">
        <a href="/">Home</a> &middot; <a href="/faq">FAQ</a> &middot; <a href="/code-of-conduct">Code of Conduct</a>
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


