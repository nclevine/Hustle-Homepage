import { createClient } from 'contentful'

const client = createClient({
	// space: process.env.CONTENTFUL_SPACE_ID,
	space: '9e676kxulstg',
	// accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
	accessToken: '9VHJxytSd26r_8tvWhgGT_xxLDPHzsciWPp7SiPYJ9w' 
})

function parseCopyEntries(entries) {
	return entries.map(entry => ({
		title: entry.fields.title,
		text: entry.fields.text,
		order: entry.fields.order ? parseInt(entry.fields.order) : null
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

function parseCapabilities(entries) {
	return entries.map(entry => ({
		name: entry.fields.name.trim(),
		priority: entry.fields.priority || false
	}))
}

function parsePartnerEntries(entries) {
	return entries.map((entry, i) => ({
		id: entry.sys.id,
		name: entry.fields.name.trim(),
		site: entry.fields.site.trim(),
		logo: 'https:' + entry.fields.logo.fields.file.url,
		missionStatement: entry.fields.logo.fields.description || null,
		locations: entry.fields.locations.map(l => l.fields.name.trim()),
		capabilities: entry.fields.capabilities.map(c => c.fields.name.trim()),
		order: entry.fields.order ? parseInt(entry.fields.order) : i + 100
	})).sort((a, b) => {
		const orderA = a.order
		const orderB = b.order
		if (orderA < orderB) {
			return -1
		}
		if (orderA > orderB) {
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
	return entries.map((entry, i) => ({
		firstName: entry.fields.firstName.trim(),
		lastName: entry.fields.lastName.trim(),
		headshot: 'https:' + entry.fields.headshot.fields.file.url.trim(),
		title: entry.fields.title.trim(),
		specialty: entry.fields.specialty ? entry.fields.specialty.trim() : null,
		email: entry.fields.email.trim(),
		phoneNumber: entry.fields.phoneNumber.trim(),
		linkedIn: entry.fields.linkedIn ? entry.fields.linkedIn.trim() : null,
		order: entry.fields.order ? parseInt(entry.fields.order) : i + 100
	})).sort((a, b) => {
		const orderA = a.order
		const orderB = b.order
		if (orderA < orderB) {
			return -1
		}
		if (orderA > orderB) {
			return 1
		}
		return 0
	})
}

function parseSectionBackgroundImages(entries) {
	return entries.map(entry => ({
		sectionName: entry.fields.sectionName.trim(),
		backgroundImage: 'https:' + entry.fields.backgroundImage.fields.file.url.trim()
	}))
}

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
	return parseCapabilities(entries.items)
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

export async function getSectionBackgroundImages() {
	const entries = await client.getEntries({ content_type: 'sectionBackgroundImage' })
	return parseSectionBackgroundImages(entries.items)
}

export async function getIntroVideo() {
	const entries = await client.getEntries({ content_type: 'introVideo' })
	return {url: 'https:' + entries.items[0].fields.video.fields.file.url}
}
