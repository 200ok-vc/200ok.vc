let Layout = require('./layout')
let MembersComponent = require('./components/members')
let StartupsComponent = require('./components/startups')

module.exports = function IndexView ({ members, skills, startups }) {
    let content = `
<article id="landing">
    <p>Hey there! 👋</p>
    <p>200 OK Ventures is a friendly group of angel investors who have all worked at API and platform startups.</p>
    <p>We know how hard it can be to design APIs that developers love, scale up and secure those services, keep documentation up-to-date and a host of other unique challenges that developer-centric startups run into every day.</p>
    <section id="how-we-help">
        <h2>What We Do</h2>
        <p>We write individual checks as strategic angel investors. Our members have deep operational experience in bringing dev tools to market, whether it's hiring your first <a href="/members?skills=DevRel">DevRel</a> employee or <a href="/members?skills=Sales">selling</a> into the Enterprise. 
        <p>We also pool our resources through our <a href="/syndicate">200 OK Syndicate</a> for founders who are looking for larger checks and need less assistance from our group.</p> 
    </section>
    <section id="contact-us">
        <h2>Getting in Touch</h2>
        <p>If this sounds cool to you, we would love to chat! Please <span style="border-bottom: 1px dotted #000">View Source</span> for more info on how to reach us.</p>
    </section>
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