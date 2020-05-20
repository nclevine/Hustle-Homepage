import { Box, Heading, Text } from 'rebass'
import Link from 'next/link'

export default function Custom404() {
	return (
		<Box sx={{
			minHeight: 'calc(100vh - 210px)',
			pt: 110
		}}>
			<Heading variant='lHeading' sx={{
				color: 'dark'
			}}>Oops, looks like you're lost.</Heading>
			<Text sx={{
				textAlign: 'center',
				textTransform: 'uppercase',
				fontWeight: 'bold',
				'a': {
					color: 'primary',
					textDecoration: 'none',
					':hover': {
						textDecoration: 'underline'
					}
				}
			}}>
				<Link href='/'><a>Return Home</a></Link>
			</Text>
		</Box>
	)
}
