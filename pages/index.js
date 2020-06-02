import Link from 'next/link'
import { Box, Flex, Text, Heading, Image } from 'rebass'
import { getCopy, getCapabilities, getPartners, getLocations, getFreeTheBidders, getFTBRoles, getAbbreviatedCapabilities, getSectionBackgroundImages, getIntroVideo } from '../lib/contentful-api'
import IntroVideo from '../components/introVideo'
import CapabilityList from '../components/capabilityList'
import Partners from '../components/partners'
import Contact from '../components/contact'
import Divider from '../components/divider'
import Carat from '../components/carat'

export default function Index({ copy, capabilities, partners, locations, freeTheBidders, ftbRoles, emailSubjects, sectionBackgroundImages, introVideo }) {
	const introCopy = copy.find(c => c.title.toLowerCase() === 'hello')
	const wwaCopy = copy.find(c => c.title.toLowerCase() === 'who we are')
	const wwdCopy = copy.filter(c => c.order > 0).sort((a, b) => {
		const orderA = a.order
		const orderB = b.order
		if (orderA < orderB) {
			return -1
		}
		if (orderA > orderB) {
			return 1
		}
		return 0
	})

	return (
		<Box className='home' sx={{
			position: 'relative',
			pb: [ 40, 40, 60, 80 ],
			':before': {
				content: '""',
				position: 'fixed',
				width: '100vw',
				height: '100vh',
				top: 0,
				left: 0,
				zIndex: 0,
				backgroundImage: 'url(\'/background-gradient.jpg\')',
				backgroundSize: 'cover',
				backgroundPosition: 'top center',
			},
		}}>
			<Box id='intro' sx={{
				pt: [ 68, 68, 90, 90 ],
				maxHeight: 680,
				overflow: 'hidden'
			}}>
				<IntroVideo videoSrc={introVideo.url} copy={introCopy.text} />
			</Box>
			<Box id='about' sx={{
				px: [ 20, 20, 30, 40 ],
				pb: [ 20, 20, 30, 40 ],
				pt: [ 40, 40, 60, 80 ],
				position: 'relative',
				zIndex: 1
			}}>
				<Box sx={{
					p: [ 20, 20, 30, 30 ],
					bg: 'primaryO2'
				}}>
					<Flex sx={{
						p: [ 20, 20, 30, 40 ],
						flexDirection: [ 'column', 'column', 'row', 'row' ]
					}}>
						<Heading variant='sHeading' sx={{
							width: [ '100%', '100%', '45%', '45%'],
							color: 'dark',
							textAlign: [ 'center', 'center', 'left', 'left' ],
							pb: [ 10, 10, 0, 0 ],
							fontSize: [ 3, 3, 5, 6 ]
						}}>
							{wwaCopy.title}
						</Heading>
						<Text sx={{
							width: [ '100%', '100%', '55%', '55%' ],
							pl: [ 0, 0, 20, 30 ],
							fontSize: [ 1, 2, 3, 4 ],
							lineHeight: '175%'
						}}>
							{wwaCopy.text}
						</Text>
					</Flex>
					<Text sx={{
						textAlign: 'center',
						textTransform: 'uppercase',
						fontWeight: 'bold',
						my: [ 20, 20, 30, 40],
						'a': {
							bg: 'light',
							borderWidth: 2,
							borderColor: 'transparent',
							borderStyle: 'solid',
							color: 'dark',
							textDecoration: 'none',
							fontSize: [ 1, 1, 2, 2 ],
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
				</Box>
			</Box>
			<Box id='partners' sx={{
				pt: 110,
				position: 'relative',
				zIndex: 1
			}}>
				<Partners
					partners={partners}
					locations={locations}
					capabilities={capabilities}
					freeTheBidders={freeTheBidders}
					ftbRoles={ftbRoles}
				/>
			</Box>
			<Box id='wwd' sx={{
				px: [ 20, 20, 30, 40 ],
				pb: [ 20, 20, 30, 40 ],
				pt: [ 40, 40, 60, 80 ],
				position: 'relative',
				zIndex: 1
			}}>
				<Box sx={{
					p: [ 20, 20, 30, 30 ],
					bg: 'primaryO2'
				}}>
					{
						wwdCopy.map((c, i) => (
							<Flex key={i} sx={{
								p: [ 20, 20, 30, 40 ],
								flexDirection: [ 'column', 'column', 'row', 'row' ]
							}}>
								<Heading variant='sHeading' sx={{
									width: [ '100%', '100%', '45%', '45%'],
									color: 'dark',
									textAlign: [ 'center', 'center', 'left', 'left' ],
									pb: [ 10, 10, 0, 0 ],
									fontSize: [ 3, 3, 5, 6 ]
								}}>
									{c.title}
								</Heading>
								<Text sx={{
									width: [ '100%', '100%', '55%', '55%' ],
									pl: [ 0, 0, 20, 30 ],
									fontSize: [ 1, 2, 3, 4 ],
									lineHeight: '175%'
								}}>
									{c.text}
								</Text>
							</Flex>
						))
					}
				</Box>
			</Box>
			<Box id='contact' sx={{
				pt: 110,
				position: 'relative',
				zIndex: 1
			}}>
				<Contact emailSubjects={emailSubjects} />
			</Box>
		</Box>
	)
}

Index.isHome = true

export async function getServerSideProps() {
	const copy = await getCopy()
	const capabilities = await getCapabilities()
	const partners = await getPartners()
	const locations = await getLocations()
	const freeTheBidders = await getFreeTheBidders()
	const ftbRoles = await getFTBRoles()
	const emailSubjects = await getAbbreviatedCapabilities()
	const sectionBackgroundImages = await getSectionBackgroundImages()
	const introVideo = await getIntroVideo()

	return {
		props: { copy, capabilities, partners, locations, freeTheBidders, ftbRoles, emailSubjects, sectionBackgroundImages, introVideo }
	}
}
