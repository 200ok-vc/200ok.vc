let Layout = require('./layout')

module.exports = function IndexView ({ memberData, skillData }) {
    let content = `
<article>
    <p>Hey there! 👋</p>
    <p>200 OK Ventures is a friendly group of angel investors who have all worked at API and platform startups.</p>
    <section class="member-list">
    ${ memberData.sort(() => Math.random() - 0.5).map((m) => {
        return `<div class="member">
            <a href="/${ m.slug }" title="${ m.full_name }">
                <div class="member-photo" style="background-image:url('${ m.photo }')"></div>
            </a>
        </div>`
    }).join('')}
    </section>
    <p>We know how hard it can be to design APIs that developers love, scale up and secure those services, keep documentation up-to-date and a host of other unique challenges that developer-centric startups run into every day.</p>
    <p>If you are a startup that is building a product for developers, we would love to talk to you! Please View Source for more info on how to reach us.</p>
    <!--
  
    Please make a POST to https://200ok.vc/api and pass the following parameters:
    
    name | string | your full name
    email | string | a valid email address
    startup | string | the name of your startup
    need_help_with | string | must be one of the following: ${ skillData.map((s) => s.name).join(', ') }
    one_liner | string | literally just one sentence on what your startup does, don't over think it :)

    We will be in touch!
    
    P.S.
    
    The code for this web app is open-source and can be found at: https://github.com/200ok-vc/200ok.vc
    
    -->
</article>`
    let html = Layout({ content, title: 'Home' })
    return { html }
  }