require('dotenv').config()
let fetch = require('node-fetch')
let slugify = require('slugify')
let fs = require('fs')

let appId = process.env.AIRTABLE_APP_ID
let appKey = process.env.AIRTABLE_APP_KEY
let baseUrl = `https://api.airtable.com/v0/${ appId }`

async function fetchSkills() {
    let json = await fetch(`${ baseUrl }/Skills?view=Grid%20view`, { headers: {'Authorization': `Bearer ${ appKey }`}})
    let results = await json.json()
    return results.records
}

/*async getStartups() {


}*/

async function fetchMembers() {
    let skills = await fetchSkills()
    let fields = ['Full Name', 'Short Bio', 'Photo', 'Super Powers', 'Website']
    let json = await fetch(`${ baseUrl }/Members?view=Grid%20view${ fields.map((f) => '&fields%5B%5D='+encodeURIComponent(f)).join('') }`, { headers: {'Authorization': `Bearer ${ appKey }`}})
    let results = await json.json()
    let members = results.records.map((r) => { return { 
        slug: slugify(r.fields['Full Name'], { lower: true }),
        full_name: r.fields['Full Name'],
        bio: r.fields['Short Bio'] ,
        photo: r.fields['Photo'][0].thumbnails.large.url,
        super_powers: r.fields['Super Powers']
            .map((id) => skills.find((s) => s.id === id)) // grab the skill objects that match the ids
            .map((s) => s.fields.Name), // grab the Name
        website: r.fields['Website']
    } })
    fs.writeFileSync('./src/shared/data/members.json', JSON.stringify(members))
}

fetchMembers()