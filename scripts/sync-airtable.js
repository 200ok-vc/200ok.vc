require('dotenv').config()
let fetch = require('node-fetch')
let slugify = require('slugify')
let fs = require('fs')

let appId = process.env.AIRTABLE_APP_ID
let appKey = process.env.AIRTABLE_APP_KEY
let baseUrl = `https://api.airtable.com/v0/${ appId }`

async function fetchSkills() {
    let fields = ['Name']
    let json = await fetch(`${ baseUrl }/Skills?view=Grid%20view${ fields.map((f) => '&fields%5B%5D='+encodeURIComponent(f)).join('') }`, { headers: {'Authorization': `Bearer ${ appKey }`}})
    let results = await json.json()
    return results.records.map((r) => ( { id: r.id, name: r.fields.Name } ))
}

async function fetchStartups() {
    let fields = ['Name', 'Portfolio', 'Logo', 'Website']
    let json = await fetch(`${ baseUrl }/Startups?view=Grid%20view${ fields.map((f) => '&fields%5B%5D='+encodeURIComponent(f)).join('') }`, { headers: {'Authorization': `Bearer ${ appKey }`}})
    let results = await json.json()
    return results.records.filter((r) => r.fields.Portfolio).map((r) => r.fields )
}

async function fetchMembers({ skills }) {
    let fields = ['Full Name', 'Short Bio', 'Photo', 'Super Powers', 'Website']
    let json = await fetch(`${ baseUrl }/Members?view=Grid%20view${ fields.map((f) => '&fields%5B%5D='+encodeURIComponent(f)).join('') }`, { headers: {'Authorization': `Bearer ${ appKey }`}})
    let results = await json.json()
    let members = results.records.map((r) => { return {
        slug: slugify(r.fields['Full Name'], { lower: true }),
        full_name: r.fields['Full Name'],
        bio: r.fields['Short Bio'] ,
        photo: r.fields['Photo'][0].thumbnails.large.url,
        skills: r.fields['Super Powers']
            .map((id) => skills.find((s) => s.id === id)) // grab the skill objects that match the ids
            .map((s) => s.name), // grab the Name
        website: r.fields['Website']
    } })
    return members
}

async function init() {
    // get skill & member data from Airtable
    let skills = await fetchSkills()
    let members = await fetchMembers({ skills })
    let startups = await fetchStartups()
    // write these bits to JSON
    fs.writeFileSync('./src/shared/data/skills.json', JSON.stringify(skills))
    fs.writeFileSync('./src/shared/data/members.json', JSON.stringify(members))
    fs.writeFileSync('./src/shared/data/startups.json', JSON.stringify(startups))
}

init()