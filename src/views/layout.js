function script(source) {
  return `<script src=${source} type=module crossorigin></script>`
}

module.exports = function LayoutView ({ title, content, social = "https://200ok.vc/images/200ok-social-sharing.jpg", scripts = [] }) {
  return /*html*/`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <link rel="stylesheet" href="/styles/main.css" />
    <meta charset=utf-8>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:image" content="${ social }" />
    <meta name="twitter:image" content="${ social }">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@200okVC">
    <meta name="twitter:title" content="200 OK Ventures | ${ title }">
    <title>200 OK Ventures | ${ title }</title>
  </head>
  <body>
    <div id="root">
      <section id="header">
        <nav>
          <a href="/">Home</a> &middot; 
          <a href="/faq">FAQ</a> &middot; 
          <a href="/members">Members</a> &middot; 
          <a href="/syndicate">Syndicate</a> &middot; 
          <a href="/code-of-conduct">Code of Conduct</a>
        </nav>
        </section>
      ${ content }
      <div id="footer">
      &nbsp;
      </div>
    </div>
    ${ scripts.map(s => script(s)) }
  </body>
  </html>  
`
}


