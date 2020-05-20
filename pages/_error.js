import { Box, Heading, Text } from 'rebass'
import Link from 'next/link'

export default function Error() {
	return (
		<Box sx={{
			minHeight: 'calc(100vh - 210px)',
			pt: 110
		}}>
			<Heading>Oops, an error has occured.</Heading>
			<Text>
				<Link href='/'><a>Return Home</a></Link>
			</Text>
		</Box>
	)
}
