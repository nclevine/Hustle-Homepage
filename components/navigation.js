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
					width: '50%'
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
							width: isHome ? mobileNavExpanded ? 75 : 200 : 75 
						}
					}} />
				</NavLink>
			</Box>
			<Box className='nav-mobile-hamburger' onClick={e => toggleMobileNav(e)} sx={{
				display: 'none',
				mt: 25,
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
					width: 20,
					height: 2,
					bg: 'light',
					my: 1,
					transition: '0.2s'
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
