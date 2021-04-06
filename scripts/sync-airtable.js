let fetch = require('node-fetch')
let appId = process.env.AIRTABLE_APP_ID
let appKey = process.env.AIRTABLE_APP_KEY
let baseUrl = `https://api.airtable.com/v0/${ appId }`


async function getMembers() {
    let json = await fetch(`${ baseUrl }/Members?view=Grid%20view&fields%5B%5D=Full%20Name&fields%5B%5D=Short%20Bio`, { headers: {'Authorization': `Bearer ${ appKey }`}})
    let results = await json.json()
    let members = results.records.map((r) => { return { full_name: r.fields['Full Name']}})
    console.log(members)
}

getMembers()

