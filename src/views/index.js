let Layout = require('./layout')

module.exports = function notFound () {
    // Return 404
    let content = `
<article>
    <p>Hey there! 👋</p>
    <p>200 OK Ventures is a friendly group of angel investors who have all worked at API and platform startups.</p>
    <p>We know how hard it can be to design APIs that developers love, scale up and secure those services, keep documentation up-to-date and a host of other unique challenges that developer-centric startups run into every day.</p>
    <p>Our members have worked at foundational companies like Github, Twilio, Sendgrid and Stripe during their early growth stages and represent a wide range of unique skills that these companies needed to be successful, including DevRel, Community, Docs, Engineering, Product &amp; more.</p>
    <p>If you are a startup that is building a product for developers, we would love to talk to you!</p>
    <p>Please View Source for more info.</p>
</article>`
    let html = Layout({ content })
    return { html }
  }