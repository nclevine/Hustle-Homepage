import { useState } from 'react'
import { Box, Flex, Heading, Text, Link, Image } from 'rebass'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import Carat from './carat'
import XOut from './xout'

function FilterListItem({ name, onClick, selected, sx }) {
	return (
		<Text onClick={() => onClick()} sx={{
			cursor: 'pointer',
			color: selected ? 'primary' : 'primaryO3',
			':hover': {
				color: 'primary'
			},
			...sx
		}}>
			{name}
		</Text>
	)
}

function CurrentFilterItem({ filter, onClick }) {
	return (
		<Text onClick={() => onClick()} sx={{
			p: 1,
			mr: 1,
			mb: 1,
			borderStyle: 'solid',
			borderWidth: 2,
			borderColor: 'primary',
			bg: 'white',
			color: 'primary',
			cursor: 'pointer',
			':hover': {
				'svg': {
					stroke: 'primary'
				}
			},
		}}>{filter.toUpperCase()} <XOut sx={{
			ml: [ 1 ],
			'svg': {
				stroke: 'primaryO3',
				strokeWidth: 3
			}
		}} /> </Text>
	)
}

function PartnerModule({ partners, locations, capabilities }) {
	const [locationFilters, setLocationFilters] = useState([])
	const [locationFiltersExpanded, setLocationFiltersExpanded] = useState(false)
	const [capabilityFilters, setCapabilityFilters] = useState([])
	const [capabilityFiltersExpanded, setCapabilityFiltersExpanded] = useState(false)
	const [expandedPartner, setExpandedPartner] = useState(null)

	const filterList = (filter, type) => {
		let filters = type === 'location' ? [...locationFilters] : [...capabilityFilters]
		let index = -1
		if (!filter) {
			filters = []
		} else {
			index = filters.indexOf(filter)
			if (index > -1) {
				filters.splice(index, 1)
			} else {
				filters.push(filter)
			}
		}
		if (type === 'location') {
			setLocationFilters(filters)
		} else {
			setCapabilityFilters(filters)
		}
		setExpandedPartner('')
	}

	const expandPartnerCard = partner => {
		setExpandedPartner(partner)
		disableBodyScroll()
	}

	return (
		<Box className='partner-module'>
			{expandedPartner ?
				<PartnerDetailCard partner={expandedPartner} exit={() => {
					clearAllBodyScrollLocks()
					setExpandedPartner(null)
				}} /> :
				''
			}
			<Box className='partner-filters' variant='options'>
				<Flex sx={{
					justifyContent: 'center'
				}}>
					<Text sx={{
						mr: [ 3 ]
					}}>FILTER BY:</Text>
					<Box className='partner-filters-locations' sx={{
						mr: [ 3 ]
					}}>
						<Text onClick={e => {
							setLocationFiltersExpanded(!locationFiltersExpanded)
							setCapabilityFiltersExpanded(false)
						}} sx={{
							cursor: 'pointer'
						}}>
							LOCATION <Carat sx={{
								transform: locationFiltersExpanded ? 'rotate(180deg)' : '',
							}} />
						</Text>
						<Box sx={{
							height: locationFiltersExpanded ? 'auto' : 0,
							overflow: 'hidden'
						}}>
							<FilterListItem name='All' onClick={() => filterList(null, 'location')} selected={!locationFilters.length} />
							{locations.map((l, i) => <FilterListItem key={i} name={l} onClick={() => filterList(l, 'location')} selected={locationFilters.includes(l)} />)}
						</Box>
					</Box>
					<Box className='partner-filters-capabilities'>
						<Text onClick={e => {
							setCapabilityFiltersExpanded(!capabilityFiltersExpanded)
							setLocationFiltersExpanded(false)
						}} sx={{
							cursor: 'pointer'
						}}>
							CAPABILITY <Carat sx={{
								transform: capabilityFiltersExpanded ? 'rotate(180deg)' : '',
							}} />
						</Text>
						<Box sx={{
							height: capabilityFiltersExpanded ? 'auto' : 0,
							overflow: 'hidden'
						}}>
							<FilterListItem name='All' onClick={() => filterList(null, 'capability')} selected={!capabilityFilters.length} />
							{capabilities.map((c, i) => <FilterListItem key={i} name={c.name} onClick={() => filterList(c.name, 'capability')} selected={capabilityFilters.includes(c.name)} />)}
						</Box>
					</Box>
				</Flex>
				{locationFilters.length || capabilityFilters.length ? 
					<Box className='current-filters' sx={{
						mt: [ 2 ]
					}}>
						<Flex sx={{
							flexWrap: 'wrap',
							width: [ '92%', '81%', '88%' ],
							margin: '0 auto'
						}}>
							{locationFilters.map((f, i) => (
								<CurrentFilterItem
									key={i}
									filter={f}
									onClick={() => {
										filterList(f, 'location')
										setCapabilityFiltersExpanded(false)
										setLocationFiltersExpanded(false)
									}}
								/>
							))}
							{capabilityFilters.map((f, i) => (
								<CurrentFilterItem
									key={i}
									filter={f}
									onClick={() => {
										filterList(f, 'capability')
										setCapabilityFiltersExpanded(false)
										setLocationFiltersExpanded(false)
									}}
								/>
							))}
						</Flex>
					</Box> :
					''
				}
			</Box>
			<Box className='partner-list' sx={{
				display: 'grid',
				gridTemplateColumns: [ 'repeat(2, 46%)', 'repeat(3, 27%)', 'repeat(4, 22%)' ],
				justifyContent: 'center',
				my: [ 3, 4, 4 ]
			}}>
				{partners
					.filter(p => {
						const matchesLocations = p.locations.map(l => locationFilters.includes(l)).includes(true)
						const matchesCapabilities = p.capabilities.map(c => capabilityFilters.includes(c)).includes(true)
						return ((matchesLocations || !locationFilters.length) && (matchesCapabilities || !capabilityFilters.length))
					})
					.map((p, i) => (
						<Box key={i} sx={{
							position: 'relative',
							// top: [ ((i % 2) * 40), ((i % 3) * 30), ((i % 4) * 20) ]
						}}>
							<PartnerCard partner={p} index={i} onClick={() => expandPartnerCard(p)} />
						</Box>
					))
				}
			</Box>
		</Box>
	)
}

function PartnerCard({ partner, index, onClick }) {
	return (
		<Box
			className='partner-card'
			onClick={() => onClick()}
			variant={'card' + (index % 5 + 1)}
			sx={{
				position: 'relative',
				':hover': {
					'.partner-card-name': {
						opacity: 1
					}
				}
			}}
		>
			<Box className='partner-card-logo'>
				<Image src={partner.logo} />
			</Box>
			<Flex className='partner-card-name' sx={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				top: 0,
				left: 0,
				justifyContent: 'center',
				alignItems: 'center',
				borderStyle: 'solid',
				borderColor: 'primary',
				borderWidth: 2,
				bg: 'white',
				transition: '0.2s',
				opacity: 0,
				p: 2,
				cursor: 'pointer',
			}}>
				<Heading sx={{
					textAlign: 'center'
				}}>{partner.name}</Heading>
				<Carat sx={{
					position: 'absolute',
					left: '50%',
					transform: 'translateX(-50%)',
					bottom: 3,
					'svg': {
						fill: 'primary'
					}
				}} />
			</Flex>
		</Box>
	)
}

function PartnerDetailCard({ partner, exit }) {
	return (
		<Box className='partner-detail-card' sx={{
			position: 'fixed',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: '100vw',
			height: '100vh',
			zIndex: 999999
		}}>
			<Box onClick={() => exit()} sx={{
				width: '100%',
				height: '100%',
				bg: '#000000ef'
			}}>
			</Box>
			<Flex sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				bg: 'light',
				p: [ 3, 4, 4 ],
				flexDirection: [ 'column', 'row', 'row' ],
				alignItems: 'center',
				justifyContent: 'space-between',
				width: 'max-content'
			}}>
				<Box sx={{
					bg: 'primaryO3',
					width: [ '46vw', '27vw', '22vw' ],
					height: [ '46vw', '27vw', '22vw' ],
				}}>
					<Image src={partner.logo} />
				</Box>
				<Box className='partner-card-info' sx={{
					ml: [ 0, 4, 4 ],
					mt: [ 4, 0, 0 ],
					width: 'fit-content',
				}}>
					<Heading variant='sHeadingAlt' sx={{
						width: 'max-content',
						mb: [ 3 ],
						fontSize: [ 5, 4, 5 ]
					}}>
						{partner.name}
					</Heading>
					<Box sx={{
						py: 2
					}}>
						<Text variant='smallCaps' sx={{
							fontSize: '10px'
						}}>Locations:</Text>
						{partner.locations.map((l, i) => (
							<Text key={i} variant='smallCaps' sx={{
								mt: 1
							}}>{l}</Text>
						))}
					</Box>
					<Box sx={{
						py: 2
					}}>
						<Text variant='smallCaps' sx={{
							fontSize: '10px'
						}}>Capabilities:</Text>
						{partner.capabilities.map((c, i) => (
							<Text key={i} variant='smallCaps' sx={{
								mt: 1
							}}>{c}</Text>
						))}
					</Box>
					<Link href={partner.site} target='_blank' sx={{
						fontSize: 1,
						textTransform: 'uppercase',
						fontWeight: 'bold'
					}}>Visit Site</Link>
				</Box>
			</Flex>
		</Box>
	)
}

function FreeTheBidModule({ freeTheBidders, ftbRoles }) {
	const [roleFilter, setRoleFilter] = useState('')
	const [expandedBidder, setExpandedBidder] = useState('')

	const filterList = filter => {
		setRoleFilter(filter)
		setExpandedBidder('')
	}

	const expandPartnerCard = partner => {
		setExpandedPartner(partner)
		disableBodyScroll()
	}

	const expandBidderCard = bidder => {
		setExpandedBidder(bidder)
		disableBodyScroll()
	}

	return (
		<Box className='ftb-module'>
			{expandedBidder ?
				<FreeTheBidDetailCard freeTheBidder={expandedBidder} exit={() => {
					clearAllBodyScrollLocks()
					setExpandedBidder(null)
				}} /> :
				''
			}
			<Flex className='ftb-filters' variant='options' sx={{
				width: 'max-content',
				m: '0 auto'
			}}>
				<Text sx={{mr: [ 3 ]}}>FILTER BY ROLE:</Text>
				<FilterListItem name='ALL' onClick={() => filterList('')} selected={roleFilter === ''} sx={{mr: [ 3 ]}} />
				{ftbRoles.map((r, i) => <FilterListItem key={i} name={r.toUpperCase()} onClick={() => filterList(r)} selected={roleFilter === r} sx={{mr: [ 3 ]}} />)}
			</Flex>
			<Box className='ftb-list' sx={{
				display: 'grid',
				gridTemplateColumns: [ 'repeat(2, 35vw)', 'repeat(3, 22vw)', 'repeat(4, 17vw)' ],
				justifyContent: 'center',
				my: [ 3 ]
			}}>
				{freeTheBidders
					.filter(b => {
						return roleFilter === b.role || roleFilter === ''
					})
					.map((b, i) => (
						<Box key={i} sx={{
							position: 'relative',
							height: [ '35vw', '22vw', '17vw' ],
							// top: [ ((i % 2) * 40), ((i % 3) * 30), ((i % 4) * 20) ]
						}}>
							<FreeTheBidCard freeTheBidder={b} index={i} onClick={() => expandBidderCard(b)} />
						</Box>
					))
				}
			</Box>
		</Box>
	)
}

function FreeTheBidCard({ freeTheBidder, index, onClick }) {
	return (
		<Flex
			className='ftb-card'
			onClick={() => onClick()}
			variant={'card' + (index % 5 + 1)}
			sx={{
				width: '100%',
				height: '100%',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				p: [ 2 ],
				position: 'relative',
				borderStyle: 'solid',
				borderColor: 'transparent',
				borderWidth: 2,
				transition: '0.2s',
				cursor: 'pointer',
				':hover': {
					bg: 'white',
					borderColor: 'primary',
					color: 'primary',
					'.ftb-card-role': {
						opacity: 0
					},
					'svg': {
						opacity: 1
					}
				}
			}}
		>
			<Heading sx={{
				textAlign: 'center'
			}}>
				{freeTheBidder.firstName + ' ' + freeTheBidder.lastName}
			</Heading>
			<Text className='ftb-card-role' sx={{
				transition: 'opacity 0.2s'
			}}>{freeTheBidder.role}</Text>
			<Carat sx={{
				position: 'absolute',
				left: '50%',
				bottom: '20%',
				transform: 'translateX(-50%)',
				transition: '0.2s',
				'svg': {
					opacity: 0,
					fill: 'primary'
				}
			}} />
		</Flex>
	)
}

function FreeTheBidDetailCard({ freeTheBidder, exit }) {
	return (
		<Box className='ftb-detail-card' sx={{
			position: 'fixed',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: '100vw',
			height: '100vh',
			zIndex: 999999
		}}>
			<Box onClick={() => exit()} sx={{
				width: '100%',
				height: '100%',
				bg: '#000000ef'
			}}>
			</Box>
			<Box sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				bg: 'light',
				p: [ 3, 4, 4 ],
			}}>
				<Heading variant='sHeadingAlt' sx={{
					mb: 3
				}}>
					{freeTheBidder.firstName + ' ' + freeTheBidder.lastName}
				</Heading>
				<Heading sx={{
					fontSize: [ 2, 3, 4 ],
					mb: 3 
				}}>{freeTheBidder.role}</Heading>
				<Box className='ftb-card-info'>
					<Text variant='smallCaps' sx={{
						py: 2
					}}>
						Partnered with <Link href={freeTheBidder.partner.site} target='_blank'>{freeTheBidder.partner.name}</Link>
					</Text>
					<Text variant='smallCaps' sx={{
						py: 2
					}}>
						<Link href={freeTheBidder.site} target='_blank'>Learn More</Link>
					</Text>
				</Box>
			</Box>
		</Box>
	)
}

function ModuleToggle({ text, selected, onClick }) {
	return (
		<Box onClick={() => onClick()} sx={{
			mx: [ 2, 3, 4 ]
		}}>
			<Heading variant={selected ? 'mHeading' : 'sHeading'} sx={{
				position: 'relative',
				cursor: 'pointer',
				transition: 'color 0.2s',
				':hover': {
					color: selected ? 'dark' : 'primary'
				}
			}}>
				{text}
				<Carat sx={{
					position: 'absolute',
					left: '50%',
					bottom: [ -20, -20, -30 ],
					transform: 'translateX(-50%)',
					opacity: selected ? 1 : 0,
					transition: '0.2s'
				}} />
			</Heading>
		</Box>
	)
}

export default function Partners({ partners, locations, capabilities, freeTheBidders, ftbRoles }) {
	const [module, setModule] = useState('partners')

	const toggleModule = m => {
		if(m === module) {
			return
		}
		setModule(m)
	}

	return (
		<Box>
			<Heading variant='lHeading'>Who We Work With</Heading>
			<Flex sx={{
				px: [ 20, 30, 40],
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<ModuleToggle text='Our Partners' selected={module === 'partners'} onClick={() => toggleModule('partners')} />
				<ModuleToggle text='Free the Bid' selected={module === 'ftb'} onClick={() => toggleModule('ftb')} />
			</Flex>
			<Box sx={{
				p: [ 20, 30, 40]
			}}>
				{module === 'partners' ? 
					<PartnerModule partners={partners} locations={locations} capabilities={capabilities} /> :
					<FreeTheBidModule freeTheBidders={freeTheBidders} ftbRoles={ftbRoles} />
				}
			</Box>
		</Box>
	)
}
