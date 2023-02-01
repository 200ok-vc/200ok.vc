let Layout = require("./layout")
//let MembersComponent = require("./components/members");
let StartupsComponent = require("./components/startups")

module.exports = function IndexView({ members, skills, startups }) {
  let content = /*html*/ `
<article id="landing">
    <p>Hey there! 👋</p>
    <p>200 OK Ventures is a friendly community of angel investors who have all worked at early stage developer-centric startups. The group was started in 2021 and is run by <a target="_blank" href="https://github.com/crtr0">Carter Rabasa</a>.</p>
    <p>We know how hard it can be to design platforms that developers love, scale up and secure them, keep documentation up-to-date, sell intro the enterprise and a host of other unique challenges that developer-centric startups run into every day.</p>
    <section id="founders">
        <h1>How We Help Founders</h1>
        <p>Our members have deep operational experience in building and bringing dev tools to market, whether it's hiring your first DevRel employee or selling into the Enterprise. We are a great fit for founders who want strategic angels as investors in their pre-seed and seed rounds or are looking for advisors.</p> 
        <div class="cta"><a href="/founders">More Info for Founders</a></div>
    </section>
    <section id="investors">
        <h1>Joining As An Investor</h1>
        <p>Our mission at 200 OK is to build an inclusive community of investors who believe in the power of developers and want to help the next generation of folks building tools that empower them. We have lots of options for folks to participate, everything from becoming a Member to joining our Syndicate to Sharing Deals.</p>
        <div class="cta"><a href="/investors">More Info for Investors</a></div>
    </section>
    <section id="startups">
        <h1>Our Portfolio</h1>
        <p>These are just some of the amazing startups that members in our group have invested in.</p>
        ${StartupsComponent({ startups })}
    </section>
</article>`
  let html = Layout({ content, title: "Home" })
  return { html }
}
