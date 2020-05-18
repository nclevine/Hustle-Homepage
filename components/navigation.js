import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Flex } from 'rebass'
import Logo from './logo'

function NavLink({ route, current, children, onClick }) {
	return (
		<Box onClick={() => onClick()} sx={{
			m: [ 1, 2, 3 ],
			'a': {
				color: current ? 'light' : 'primary',
				fontSize: [ 1, 2, 3 ],
				fontWeight: 'bold',
				textDecoration: 'none',
				transition: '0.2s',
				':hover': {
					color: 'light'
				}
			}
		}}>
			<Link href={route}><a>{children}</a></Link>
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
			p: isHome ? [ 20, 30, 40 ] : 10,
			justifyContent: 'center',
			alignItems: 'center',
			'@media screen and (max-width: 40em)': {
				flexWrap: 'wrap',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
				p: 20
			}
		}}>
			<Box sx={{
				'@media screen and (max-width: 40em)': {
					ml: isHome ? mobileNavExpanded ? 0 : 'calc(50% - 100px)' : 0,
				}
			}}>
				<NavLink route='/' onClick={e => closeMobileNav(e)}>
					<Logo sx={{
						mr: [ 2, 3, 4 ],
						width: isHome ? [ 100, 200, 300 ] : 75,
						transition: '0.3s ease',
						'path': {
							fill: isHome ? 'light' : 'primary',
							transition: '0.2s'
						},
						':hover': {
							'path': {
								fill: isHome ? 'primary' : 'light'
							}
						},
						'@media screen and (max-width: 40em)': {
							width: isHome ? mobileNavExpanded ? 75 : 200 : 75,
							mr: 0
						}
					}} />
				</NavLink>
			</Box>
			
			<Box className='nav-mobile-hamburger' onClick={e => toggleMobileNav(e)} sx={{
				display: 'none',
				position: 'relative',
				mt: 25,
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
						bg: 'primary'
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
					bg: 'light',
					transition: '0.2s',
					transformOrigin: 'left center'
				}} />)}
			</Box>
			<Flex sx={{
				justifyContent: 'center',
				flexDirection: isHome ? 'column' : 'row',
				'@media screen and (max-width: 40em)': {
					width: '100%',
					alignItems: 'center',
					overflow: 'hidden',
					height: mobileNavExpanded ? 'auto' : 0,
					flexDirection: 'column'
				}
			}}>
				<NavLink route='/partners' current={router.pathname === '/partners'} onClick={e => closeMobileNav(e)}>PARTNERS</NavLink>
				<NavLink route='/team' current={router.pathname === '/team'} onClick={e => closeMobileNav(e)}>TEAM</NavLink>
				<NavLink route='/contact' current={router.pathname === '/contact'} onClick={e => closeMobileNav(e)}>CONTACT</NavLink>
			</Flex>
		</Flex>
		
	)
}
