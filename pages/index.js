import { Box, Text, Heading } from 'rebass'
import { getCopy, getCapabilities } from '../lib/contentful-api'

export default function Index({ copy, capabilities }) {
	return (
		<Box>
			<Box className="intro">
				<Heading variant='lHeading' sx={{
					m: [ 20, 30, 40 ],
					mt: [ 0, 0, 0 ],
					color: 'primary'
				}}>
					{copy[1].text}
				</Heading>
			</Box>
			<Box className="about">
				<Heading>What We Do</Heading>
				<Text>{copy[0].text}</Text>
				<Heading>Our Capabilities</Heading>
				<ul>
					{capabilities.map((c, i) => <li key={'capability-' + i}>{c}</li>)}
				</ul>
			</Box>
		</Box>
	)
}

Index.isHome = true

export async function getStaticProps() {
	const copy = await getCopy()
	const capabilities = await getCapabilities()

	return {
		props: { copy, capabilities }
	}
}

