import Link from 'next/link'
import { Box, Flex, Text, Heading } from 'rebass'
import { getCopy, getCapabilities } from '../lib/contentful-api'

export default function Index({ copy, capabilities }) {
	return (
		<Box className='home'>
			<Box className='intro' sx={{
				p: [ 20, 30, 40 ],
				pt: [ 0, 0, 0 ]
			}}>
				<Heading variant='lHeading'>
					{copy[1].text}
				</Heading>
			</Box>
			<Box className='about' sx={{
				bg: 'light',
				p: [ 20, 30, 40 ],
			}}>
				<Heading variant='mHeading' sx={{
					color: 'dark'
				}}>Who We Are</Heading>
				<Text variant='largeCopy' sx={{
					color: 'primary'
				}}>{copy[0].text}</Text>
				<Box sx={{
					'a': {
						color: 'dark',
						textDecoration: 'none',
						':hover': {
							textDecoration: 'underline'
						}
					}
				}}>
					<Link href='/team'><a>Meet the Team</a></Link>
				</Box>
			</Box>
			<Box className='capabilities' sx={{
				p: [ 20, 30, 40 ],
			}}>
				<Heading variant='mHeading'>Our Capabilities</Heading>
				<Box sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 3fr))',
					gap: [ 3, 3, 4 ],
					'@media screen and (max-width: 40em)': {
						gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 3fr))',
					}
				}}>
					{capabilities.map((c, i) => (
						<Flex key={i} sx={{
							color: 'primary',
							p: [ 1, 2, 3 ],
							borderColor: 'light',
							borderWidth: [ 1, 2, 3 ],
							borderStyle: 'solid',
							borderRadius: 'exaggerated',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
							fontWeight: 'bold',
							minHeight: [ 45, 55, 86 ],
							fontSize: [ 1, 2, 3 ],
							fontStyle: 'italic',
						}}><Text>{c}</Text></Flex>
					))}
				</Box>
				<Box sx={{
					'a': {
						color: 'light',
						textDecoration: 'none',
						':hover': {
							textDecoration: 'underline'
						}
					}
				}}>
					<Link href='/partners'><a>Who We Work With</a></Link>
				</Box>
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

