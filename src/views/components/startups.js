module.exports = function StartupComponent({ startups }) {
  return `<div class=list>${startups
    .map(
      (s) => `
        <div class="startup"><a href="${s.Website}" title="${s.Name}"><img src="${s.Logo}" alt="${s.Name} logo"/></a></div>
        `
    )
    .join("")}</div>`
}
