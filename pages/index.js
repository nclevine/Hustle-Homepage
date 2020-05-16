import Link from 'next/link'
import { Box, Flex, Text, Heading } from 'rebass'
import { getCopy, getCapabilities } from '../lib/contentful-api'
import Carat from '../components/carat'

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
				<Heading sx={{
					'a': {
						color: 'dark',
						textDecoration: 'none',
						':hover': {
							color: 'primary',
							'svg': {
								fill: 'primary'
							}
						}
					}
				}}>
					<Link href='/team'><a>Meet the Team <Carat sx={{transform: 'rotate(-90deg)'}} /></a></Link>
				</Heading>
			</Box>
			<Box className='capabilities' sx={{
				p: [ 20, 30, 40 ],
			}}>
				<Heading variant='mHeading'>Our Capabilities</Heading>
				<Box sx={{
					display: 'grid',
					gridTemplateColumns: [ 'repeat(auto-fit, minmax(30%, 3fr))', 'repeat(auto-fit, minmax(20%, 3fr))'],
					gridGap: [ 1, 2, 3 ],
					p: [ 20, 30, 40 ]
				}}>
					{capabilities.map((c, i) => (
						<Flex key={i} sx={{
							color: 'primary',
							p: [ 1, 2, 3 ],
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
				<Heading sx={{
					'a': {
						color: 'light',
						textDecoration: 'none',
						'svg': {
							fill: 'light'
						},
						':hover': {
							color: 'primary',
							'svg': {
								fill: 'primary'
							}
						}
					}
				}}>
					<Link href='/partners'><a>Who We Work With <Carat sx={{transform: 'rotate(-90deg)'}} /></a></Link>
				</Heading>
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

