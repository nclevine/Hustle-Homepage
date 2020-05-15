import Head from 'next/head'
import Navigation from './navigation'
import { Box } from 'rebass'

export default function Layout({ children, subtitle, isHome }) {
	return (
		<Box sx={{
			fontFamily: 'body',
			bg: 'dark',
			minWidth: '100vw',
			minHeight: '100vh'
		}}>
			<Head>
				<title>HUSTLE{subtitle ? ' - ' + subtitle : ''}</title>
			</Head>
			<Navigation isHome={isHome} />
			{children}
		</Box>
	)
}
