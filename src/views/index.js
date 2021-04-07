let Layout = require('./layout')

module.exports = function ({ memberData }) {
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
</article>`
    let html = Layout({ content, title: 'Home' })
    return { html }
  }