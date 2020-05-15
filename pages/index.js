import Layout from '../components/layout'
import { getCopy, getCapabilities } from '../lib/contentful-api'

export default function Index({ copy, capabilities }) {
	return (
		<Layout>
			<div className="intro">
				<h1>HUSTLE</h1>
				<h2>{copy[1].text}</h2>
			</div>
			<div className="about">
				<h3>What We Do</h3>
				<p>{copy[0].text}</p>
				<h3>Our Capabilities</h3>
				<ul>
					{capabilities.map((c, i) => <li key={'capability-' + i}>{c}</li>)}
				</ul>
			</div>
		</Layout>
	)
}

export async function getStaticProps() {
	const copy = await getCopy()
	const capabilities = await getCapabilities()

	return {
		props: { copy, capabilities }
	}
}

