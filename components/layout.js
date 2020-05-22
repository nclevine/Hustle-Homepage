import Head from 'next/head'
import Navigation from './navigation'
import Footer from '../components/footer'
import { Box } from 'rebass'

export default function Layout({ children, subtitle, isHome }) {
	return (
		<Box className='layout-container' sx={{
			fontFamily: 'body',
			bg: 'light',
			minWidth: '100vw',
			minHeight: '100vh',
			position: 'relative'
		}}>
			<Head>
				<title>HUSTLE{subtitle ? ' - ' + subtitle : ''}</title>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
				<meta name='description' content='An independent network in service of creativity and talent for modern brands.' />
			</Head>
			<Navigation isHome={isHome} />
			{children}
			<Footer />
		</Box>
	)
}
