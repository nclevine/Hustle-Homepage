import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Flex } from 'rebass'
import Logo from './logo'

function NavLink({ route, children, onClick }) {
	return (
		<Box onClick={() => onClick()} sx={{
			'a': {
				color: 'primary',
				fontSize: 2,
				fontWeight: 'bold',
				textDecoration: 'none',
				transition: '0.2s',
				':hover': {
					// color: 'dark'
					color: 'transparent'
				}
			}
		}}>
			{route.includes('/') ?
				<Link href={route}><a>{children}</a></Link> :
				<a href={route}>{children}</a>
			}
		</Box>
	)
}

export default function Navigation({ isHome }) {
	const [mobileNavExpanded, setMobileNavExpanded] = useState(false)
	const router = useRouter()

	const toggleMobileNav = e => {
		setMobileNavExpanded(!mobileNavExpanded)
	}

	const closeMobileNav = e => {
		setMobileNavExpanded(false)
	}

	return (
		<Flex className='nav' sx={{
			zIndex: 99999,
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100vw',
			bg: 'white',
			borderStyle: 'solid',
			borderWidth: 0,
			borderBottomWidth: 2,
			borderColor: 'primary',
			p: 10,
			justifyContent: 'space-between',
			alignItems: 'center',
			'@media screen and (max-width: 40em)': {
				flexWrap: 'wrap',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
			}
		}}>
			<Box sx={{
				position: 'relative'
			}}>
				<NavLink route={router.pathname === '/' ? '#intro' : '/'} onClick={e => closeMobileNav(e)}>
					<Logo sx={{
						ml: [ 3 ],
						width: 75,
						transition: '0.2s',
						'path': {
							fill: 'primary',
						},
						':hover': {
							// 'path': {
							// 	// fill: 'dark'
							// 	fill: 'url(#gradient)'
							// }
							opacity: 0
						}
					}} />
					<Logo sx={{
						position: 'absolute',
						width: 75,
						fill: 'url(#gradient)',
						top: 0,
						left: [ 3 ],
						zIndex: -999
					}} />
				</NavLink>
			</Box>
			
			<Box className='nav-mobile-hamburger' onClick={e => toggleMobileNav(e)} sx={{
				display: 'none',
				position: 'relative',
				mt: 25,
				mr: [ 3 ],
				width: 20,
				'div': {
					':nth-of-type(1)': {
						left: 0,
						top: mobileNavExpanded ? '-1px' : '0px',
						transform: mobileNavExpanded ? 'rotate(45deg)' : ''
					},
					':nth-of-type(2)': {
						left: 0,
						top: '6px',
						opacity: mobileNavExpanded ? 0 : 1
					},
					':nth-of-type(3)': {
						left: 0,
						top: mobileNavExpanded ? '13px' : '12px',
						transform: mobileNavExpanded ? 'rotate(-45deg)' : ''
					}
				},
				':hover': {
					'div': {
						bg: 'dark'
					}
				},
				'@media screen and (max-width: 40em)': {
					display: 'block'
				}
			}}>
				{[1, 2, 3].map((l, i) => <Box key={i} sx={{
					position: 'absolute',
					width: '100%',
					height: 2,
					bg: 'primary',
					transition: '0.2s',
					transformOrigin: 'left center'
				}} />)}
			</Box>
			<Flex sx={{
				backgroundImage: 'url(/background-gradient.jpg)',
				backgroundSize: '100vw',
				'WebkitBackgroundClip': 'text',
				backgroundClip: 'text',
				backgroundColor: 'white',
				color: 'transparent',
				backgroundPosition: 'bottom left',
				justifyContent: 'center',
				'div': {
					m: [ 1, 1, 2, 3 ],
				},
				'@media screen and (max-width: 40em)': {
					width: '100%',
					alignItems: 'center',
					overflow: 'hidden',
					height: mobileNavExpanded ? 'auto' : 0,
					flexDirection: 'column'
				}
			}}>
				<NavLink route={router.pathname === '/' ? '#partners' : '/#partners'} current={router.pathname === '#partners'} onClick={e => closeMobileNav(e)}>PARTNERS</NavLink>
				<NavLink route='/team' current={router.pathname === '/team'} onClick={e => closeMobileNav(e)}>TEAM</NavLink>
				<NavLink route={router.pathname === '/' ? '#contact' : '/#contact'} current={router.pathname === '#contact'} onClick={e => closeMobileNav(e)}>CONTACT</NavLink>
			</Flex>
		</Flex>
		
	)
}
