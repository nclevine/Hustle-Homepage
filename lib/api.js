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

export async function getAllEntries() {
	const entries = await client.getEntries()
	return JSON.stringify(entries.items)
}

export async function getCopy() {
	const entries = await client.getEntries({content_type: 'copy'})
	return parseCopyEntries(entries.items)
}
