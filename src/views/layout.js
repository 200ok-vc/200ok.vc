let arc = require('@architect/functions')

module.exports = function Layout ({title, content}) {
  return /*html*/`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <link rel="stylesheet" href="${ arc.static('/styles/main.css') }" />
    <meta charset=utf-8>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${ title }</title>
  <!--
  
  Please make a POST to https://200ok.vc/api and pass the following parameters:
  
  name | string | your full name
  email | string | a valid email address
  startup | string | the name of your startup
  
  We will be in touch!
  
  P.S.
  
  The code for this web app is open-source and can be found at: https://github.com/200ok-vc/200ok.vc
  
  -->
  </head>
  <body>
    <div id="root">
      <div id="header">
        <a href="/">200 OK</a> <a href="/code-of-conduct">Code of Conduct</a>
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


