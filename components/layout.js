import Head from 'next/head'
import Navigation from './navigation'

export default function Layout({ children, subtitle }) {
	return (
		<>
			<Head>
				<title>HUSTLE{subtitle ? ' - ' + subtitle : ''}</title>
			</Head>
			<Navigation/>
			{children}
		</>
	)
}
