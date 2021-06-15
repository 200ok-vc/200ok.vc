let Layout = require('./layout')
let MembersComponent = require('./components/members')
let StartupsComponent = require('./components/startups')

module.exports = function IndexView ({ members, skills, startups }) {
    let content = /*html*/`
<article id="landing">
    <p>Hey there! 👋</p>
    <p>200 OK Ventures is a friendly group of angel investors who have all worked at API and platform startups. We know how hard it can be to design APIs that developers love, scale up and secure those services, keep documentation up-to-date and a host of other unique challenges that developer-centric startups run into every day.</p>
    <section id="founders">
        <h1>Working With Founders</h1>
        <p>We write individual checks as strategic angel investors. Our members have deep operational experience in bringing dev tools to market, whether it's hiring your first <a href="/members?skills=DevRel">DevRel</a> employee or <a href="/members?skills=Sales">selling</a> into the Enterprise.</p>
        <p>We also pool our resources through our <a href="/syndicate">200 OK Syndicate</a> for founders who are looking for larger checks and need less direct assistance from members of our group.</p> 
        <div class="cta"><a href="/founders">More Info for Founders</a></div>
    </section>
    <section id="investors">
        <h1>Joining As An Investor</h1>
        <p>Our mission at 200 OK is to build an inclusive community of investors who believe in the power of developers and want to help the next generation of folks building tools that empower them. There are a few different ways you can plug-in:</p>
        <ul>
            <li>Advisory - talk to founders and help connect them to resources</li>
            <li>Learning - connect with other folks new to angel investing</li>
            <li>Syndicate - participate in deals that we lead through our 200 OK Syndicate</li>
            <li>Dealflow - get notified about interesting startups and deals</li>
        </ul>
        <div class="cta"><a href="/investors">More Info for Investors</a></div>
    </section>
    <section id="members">
        <h1>Our Advisory</h1>
        <p>Folks in our Advisory have set aside time to talk to founders who reach out to us and help connect them to people and resources that can accelerate their progress.</p>
        ${ MembersComponent({ members }) }
    </section>
    <section id="startups">
        <h1>Our Portfolio</h1>
        <p>These are just some of the amazing startups that members in our group have invested in.</p>
        ${ StartupsComponent({ startups })}
    </section>
</article>`
    let html = Layout({ content, title: 'Home' })
    return { html }
  }