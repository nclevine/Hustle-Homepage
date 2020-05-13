import Head from 'next/head'
import { getCopy } from '../lib/api'

export async function getStaticProps() {
	const copy = await getCopy()
	return {
		props: { copy }
	}
}

export default function Index(props) {
	console.log(props.copy)
	return (
		<>
			<Head>
				<title>HUSTLE</title>
			</Head>
			<h1>Hello!</h1>
		</>
	)
}
