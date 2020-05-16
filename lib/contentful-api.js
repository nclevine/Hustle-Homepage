import { createClient } from 'contentful'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN 
})

function parseCopyEntries(entries) {
	return entries.map(entry => ({
		title: entry.fields.title,
		text: entry.fields.text
	}))
}

function parseNamedEntries(entries) {
	return entries.map(entry => {
		if (entry.fields.name) {
			return entry.fields.name.trim()
		} else if (entry.fields.title) {
			return entry.fields.title.trim()
		} else {
			return entry
		}
	}).sort()
}

function parsePartnerEntries(entries) {
	return entries.map(entry => ({
		id: entry.sys.id,
		name: entry.fields.name.trim(),
		site: entry.fields.site.trim(),
		logo: 'https:' + entry.fields.logo.fields.file.url,
		locations: entry.fields.locations.map(l => l.fields.name.trim()),
		capabilities: entry.fields.capabilities.map(c => c.fields.name.trim())
	})).sort((a, b) => {
		const nameA = a.name.toUpperCase()
		const nameB = b.name.toUpperCase()
		if (nameA < nameB) {
			return -1
		}
		if (nameA > nameB) {
			return 1
		}
		return 0
	})
}

function parseFreeTheBidders(entries) {
	return entries.map(entry => ({
		id: entry.sys.id,
		firstName: entry.fields.firstName.trim(),
		lastName: entry.fields.lastName.trim(),
		partner: {
			name: entry.fields.partner.fields.name,
			site: entry.fields.partner.fields.site
		},
		role: entry.fields.role.fields.title,
		site: entry.fields.site
	})).sort((a, b) => {
		const lastNameA = a.lastName.toUpperCase()
		const lastNameB = b.lastName.toUpperCase()
		if (lastNameA < lastNameB) {
			return -1
		}
		if (lastNameA > lastNameB) {
			return 1
		}
		return 0
	})
}

function parseTeamMembers(entries) {
	return entries.map(entry => ({
		firstName: entry.fields.firstName.trim(),
		lastName: entry.fields.lastName.trim(),
		headshot: 'https:' + entry.fields.headshot.fields.file.url.trim(),
		title: entry.fields.title.trim(),
		specialty: entry.fields.specialty ? entry.fields.specialty.trim() : null,
		email: entry.fields.email.trim(),
		phoneNumber: entry.fields.phoneNumber.trim(),
		linkedIn: entry.fields.linkedIn ? entry.fields.linkedIn.trim() : null
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
	return parseFreeTheBidders(entries.items)
}

export async function getFTBRoles() {
	const entries = await client.getEntries({ content_type: 'ftbRole' })
	return parseNamedEntries(entries.items)
}

export async function getTeamMembers() {
	const entries = await client.getEntries({ content_type: 'teamMember' })
	return parseTeamMembers(entries.items)
}

export async function getAbbreviatedCapabilities() {
	const entries = await client.getEntries({ content_type: 'abbreviatedCapability' })
	return parseNamedEntries(entries.items)
}
