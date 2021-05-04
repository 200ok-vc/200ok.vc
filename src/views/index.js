let Layout = require('./layout')
let MembersComponent = require('./components/members')
let StartupsComponent = require('./components/startups')

module.exports = function IndexView ({ members, skills, startups }) {
    let content = `
<article>
    <p>Hey there! 👋</p>
    <p>200 OK Ventures is a friendly group of angel investors who have all worked at API and platform startups.</p>
    <p>We know how hard it can be to design APIs that developers love, scale up and secure those services, keep documentation up-to-date and a host of other unique challenges that developer-centric startups run into every day.</p>
    <p>If you are a startup that is building a product for developers, we would love to talk to you! Please <span style="border-bottom: 1px dotted #000">View Source</span> for more info on how to reach us.</p>
    <section id="members">
        <h2>Our Members</h2>
        ${ MembersComponent({ members }) }
    </section>
    <section id="startups">
        <h2>Our Portfolio</h2>
        ${ StartupsComponent({ startups })}
    </section>
    <!--
  
    Please make a POST to https://200ok.vc/api and pass the following parameters:
    
    name | string | your full name
    email | string | a valid email address
    startup | string | the name of your startup
    need_help_with | string | must be one of the following: ${ skills.map((s) => s.name).join(', ') }
    one_liner | string | literally just one sentence on what your startup does, don't over think it :)

    We will be in touch!
    
    P.S.
    
    The code for this web app is open-source and can be found at: https://github.com/200ok-vc/200ok.vc
    
    -->
</article>`
    let html = Layout({ content, title: 'Home' })
    return { html }
  }