import Link from 'next/link'
import { Box, Flex, Text, Heading } from 'rebass'
import { getCopy, getCapabilities, getPartners, getLocations, getFreeTheBidders, getFTBRoles, getAbbreviatedCapabilities } from '../lib/contentful-api'
import Intro from '../components/intro'
import CapabilityList from '../components/capabilityList'
import Partners from '../components/partners'
import Contact from '../components/contact'
import Divider from '../components/divider'
import Carat from '../components/carat'

export default function Index({ copy, capabilities, partners, locations, freeTheBidders, ftbRoles, emailSubjects }) {
	return (
		<Box className='home'>
			<Box id='intro' sx={{
				position: 'relative',
				width: '100vw',
				minHeight: '100vh'
			}}>
				<Intro sx={{
					position: 'absolute',
					top: 'calc(50% + 55px)',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '70%'
				}} />
			</Box>
			<Box id='about' sx={{
				bg: 'white',
				p: [ 20, 30, 40 ],
			}}>
				<Heading variant='mHeading' sx={{
					color: 'dark'
				}}>Who We Are</Heading>
				<Text variant='largeCopy' sx={{
					color: 'primary'
				}}>{copy[0].text}</Text>
				<Text sx={{
					textAlign: 'center',
					textTransform: 'uppercase',
					fontWeight: 'bold',
					my: [ 20, 30, 40],
					'a': {
						bg: 'light',
						borderWidth: 2,
						borderColor: 'transparent',
						borderStyle: 'solid',
						color: 'dark',
						textDecoration: 'none',
						fontSize: [ 1, 2, 2 ],
						p: [ 2 ],
						transition: '0.2s',
						'svg': {
							transition: '0.2s'
						},
						':hover': {
							borderColor: 'primary',
							color: 'primary',
							bg: 'white',
							'svg': {
								fill: 'primary'
							}
						}
					}
				}}>
					<Link href='/team'><a>Meet the Team <Carat sx={{transform: 'rotate(-90deg)'}} /></a></Link>
				</Text>
				<Box sx={{
					bg: 'primaryO1',
					mt: [ 40, 60, 80 ]
				}}>
					<Heading variant='mHeading' sx={{
						pt: [ 20, 30, 40 ]
					}}>
						What We Do
					</Heading>
					<CapabilityList capabilities={capabilities} />
				</Box>
			</Box>
			<Box id='partners' sx={{
				pt: 110
			}}>
				<Partners
					partners={partners}
					locations={locations}
					capabilities={capabilities}
					freeTheBidders={freeTheBidders}
					ftbRoles={ftbRoles}
				/>
			</Box>
			<Box id='contact' sx={{
				pt: 110
			}}>
				<Contact emailSubjects={emailSubjects} />
			</Box>
		</Box>
	)
}

Index.isHome = true

export async function getStaticProps() {
	const copy = await getCopy()
	const capabilities = await getCapabilities()
	const partners = await getPartners()
	const locations = await getLocations()
	const freeTheBidders = await getFreeTheBidders()
	const ftbRoles = await getFTBRoles()
	const emailSubjects = await getAbbreviatedCapabilities()

	return {
		props: { copy, capabilities, partners, locations, freeTheBidders, ftbRoles, emailSubjects }
	}
}

// <Heading variant='lHeading' sx={{
// 	position: 'absolute',
// 	top: 'calc(50% + 55px)',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: '80%'
// }}>
// 	{copy[1].text}
// </Heading>
