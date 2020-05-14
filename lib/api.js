import { createClient } from 'contentful'

const client = createClient({
	space: '9e676kxulstg',
	accessToken: '9VHJxytSd26r_8tvWhgGT_xxLDPHzsciWPp7SiPYJ9w'
})

function parseCopyEntries(entries) {
	return entries.map(entry => ({
		title: entry.fields.title,
		text: entry.fields.text
	}))
}

function parseNamedEntries(entries) {
	return entries.map(entry => entry.fields.name.trim()).sort()
}

function parsePartnerEntries(entries) {
	return entries.map(entry => ({
		id: entry.sys.id,
		name: entry.fields.name.trim(),
		site: entry.fields.site.trim(),
		logo: 'https:' + entry.fields.logo.fields.file.url,
		locations: entry.fields.locations.map(l => l.fields.name.trim()),
		capabilities: entry.fields.capabilities.map(c => c.fields.name.trim())
	}))
}

// export async function getAllEntries() {
// 	const entries = await client.getEntries()
// 	return JSON.stringify(entries.items)
// }

export async function getCopy() {
	const entries = await client.getEntries({ content_type: 'copy' })
	return parseCopyEntries(entries.items)
}

export async function getLocations() {
	const entries = await client.getEntries({ content_type: 'location' })
	return parseNamedEntries(entries.items)
}

export async function getCapabilities() {
	const entries = await client.getEntries({ content_type: 'capability' })
	return parseNamedEntries(entries.items)
}

export async function getPartners() {
	const entries = await client.getEntries({ content_type: 'partner' })
	return parsePartnerEntries(entries.items)
}

export async function getFreeTheBidders() {
	const entries = await client.getEntries({ content_type: 'freeTheBid' })
	return entries
}

export async function getFTBRoles() {
	const entries = await client.getEntries({ content_type: 'ftbRole' })
	return entries
}

export async function getTeamMembers() {
	const entries = await client.getEntries({ content_type: 'teamMember' })
	return entries
}

export async function getAbbreviatedCapabilites() {
	const entries = await client.getEntries({ content_type: 'abbreviatedCapability' })
	return entries
}
