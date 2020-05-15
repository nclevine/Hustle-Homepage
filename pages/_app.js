import '../styles/global.css'
import { ThemeProvider } from 'emotion-theming'
import theme from '../styles/theme'
import Layout from '../components/layout'

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Layout subtitle={Component.subtitle} isHome={Component.isHome}>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	)
}
