import { useState } from 'react'
import { getPartners, getLocations, getCapabilities, getFreeTheBidders, getFTBRoles } from '../lib/contentful-api'
import { Box, Flex, Heading, Text, Link, Image } from 'rebass'
import Carat from '../components/carat'
import XOut from '../components/xout'

function FilterListItem({ name, onClick, selected }) {
	return (
		<Text onClick={() => onClick()} sx={{
			cursor: 'pointer',
			color: selected ? 'primary' : 'light',
			':hover': {
				color: 'primary'
			}
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
			color: 'primary',
			cursor: 'pointer',
			':hover': {
				'span': {
					color: 'primary'
				},
				'svg': {
					stroke: 'light'
				}
			}
		}}>{filter.toUpperCase()} <XOut sx={{
			ml: [ 1 ]
		}} /> </Text>
	)
}

function PartnerModule({ partners, locations, capabilities }) {
	const [locationFilters, setLocationFilters] = useState([])
	const [locationFiltersExpanded, setLocationFiltersExpanded] = useState(false)
	const [capabilityFilters, setCapabilityFilters] = useState([])
	const [capabilityFiltersExpanded, setCapabilityFiltersExpanded] = useState(false)
	const [expandedPartner, setExpandedPartner] = useState('')

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

	const expandPartnerCard = id => {
		if (expandedPartner === id) {
			setExpandedPartner('')
		} else {
			setExpandedPartner(id)
		}
	}

	return (
		<Box className='partner-module'>
			<Box className='partner-filters' sx={{
				// bg: 'light'
				color: 'light',
				fontWeight: 'bold',
				fontSize: [ 1 ]
			}}>
				<Flex>
					<Text sx={{
						mr: [ 3 ]
					}}>FILTER BY:</Text>
					<Box className='partner-filters-locations' sx={{
						mr: [ 3 ]
					}}>
						<Text onClick={e => {
							setLocationFiltersExpanded(!locationFiltersExpanded)
							setCapabilityFiltersExpanded(false)
						}}>
							LOCATION <Carat sx={{
								transform: locationFiltersExpanded ? 'rotate(180deg)' : '',
								fill: 'light'
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
						}}>
							CAPABILITY <Carat sx={{
								transform: capabilityFiltersExpanded ? 'rotate(180deg)' : '',
								fill: 'light'
							}} />
						</Text>
						<Box sx={{
							height: capabilityFiltersExpanded ? 'auto' : 0,
							overflow: 'hidden'
						}}>
							<FilterListItem name='All' onClick={() => filterList(null, 'capability')} selected={!capabilityFilters.length} />
							{capabilities.map((c, i) => <FilterListItem key={i} name={c} onClick={() => filterList(c, 'capability')} selected={capabilityFilters.includes(c)} />)}
						</Box>
					</Box>
				</Flex>
				{locationFilters.length || capabilityFilters.length ? 
					<Box className='current-filters' sx={{
						mt: [ 2 ]
					}}>
						<Flex sx={{
							flexWrap: 'wrap'
						}}>
							{locationFilters.map((f, i) => <CurrentFilterItem key={i} filter={f} onClick={() => filterList(f, 'location')} />)}
							{capabilityFilters.map((f, i) => <CurrentFilterItem key={i} filter={f} onClick={() => filterList(f, 'capability')} />)}
						</Flex>
					</Box> :
					''
				}
			</Box>
			<Flex className='partner-list' sx={{
				flexWrap: 'wrap',
				justifyContent: 'space-around',
				my: [ 3 ]
			}}>
				{partners
					.filter(p => {
						const matchesLocations = p.locations.map(l => locationFilters.includes(l)).includes(true)
						const matchesCapabilities = p.capabilities.map(c => capabilityFilters.includes(c)).includes(true)
						return ((matchesLocations || !locationFilters.length) && (matchesCapabilities || !capabilityFilters.length))
					})
					.map((p, i) => <PartnerCard key={i} partner={p} expanded={expandedPartner === p.id} onClick={() => expandPartnerCard(p.id)} />)
				}
			</Flex>
		</Box>
	)
}

function PartnerCard({ partner, expanded, onClick }) {
	return (
		<Box className='partner-card' onClick={() => onClick()} variant='card' sx={{
			// width: '30%',
			// mb: '3.33333vw'
			// width: expanded ? '100%' : [ '100%', '50%', '33%' ],
			// order: expanded ? -1 : 0
		}}>
			<Box >
				<Image src={partner.logo} />
			</Box>
			{expanded ? 
				(
					<Box className='partner-card-info'>
						<Heading>{partner.name}</Heading>
						<Link href={partner.site} target='_blank'>Visit</Link>
						<Box>
							{partner.locations.map((l, i) => (
								<Text key={i}>{l}</Text>
							))}
						</Box>
						<Box>
							{partner.capabilities.map((c, i) => (
								<Text key={i}>{c}</Text>
							))}
						</Box>
					</Box>
				) :
				''
			}
		</Box>
	)
}

function FreeTheBidModule({ freeTheBidders, ftbRoles }) {
	const [roleFilters, setRoleFilters] = useState([])
	const [expandedBidder, setExpandedBidder] = useState('')

	const filterList = filter => {
		let filters = [...roleFilters]
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
		setRoleFilters(filters)
		setExpandedBidder('')
	}

	const expandBidderCard = id => {
		if (expandedBidder === id) {
			setExpandedBidder('')
		} else {
			setExpandedBidder(id)
		}
	}

	return (
		<div className='ftb-module'>
			<div className='ftb-filters'>
				<div className='ftb-filters-roles'>
					<FilterListItem name='All' onClick={() => filterList()} selected={!roleFilters.length} />
					{ftbRoles.map((r, i) => <FilterListItem key={i} name={r} onClick={() => filterList(r)} selected={roleFilters.includes(r)} />)}
				</div>
			</div>
			<div className='ftb-list'>
				{freeTheBidders
					.filter(b => {
						const matchesRole = roleFilters.includes(b.role)
						return matchesRole || !roleFilters.length
					})
					.map((b, i) => <FreeTheBidCard key={i} freeTheBidder={b} expanded={expandedBidder === b.id} onClick={() => expandBidderCard(b.id)} />)
				}
			</div>
		</div>
	)
}

function FreeTheBidCard({ freeTheBidder, expanded, onClick }) {
	return (
		<div className='ftb-card' onClick={() => onClick()}>
			<h3 className='ftb-card-name'>{freeTheBidder.firstName + ' ' + freeTheBidder.lastName}</h3>
			<p className='ftb-card-role'>{freeTheBidder.role}</p>
			{expanded ?
				<div className='ftb-card-info'>
					<p className='ftb-card-partner'>Partnered with <Link href={freeTheBidder.partner.site} target='_blank'>{freeTheBidder.partner.name}</Link></p>
					<p className='ftb-card-site'><Link href={freeTheBidder.site} target='_blank'>Learn More</Link></p>
				</div> :
				''
			}
		</div>
	)
}

function ModuleToggle({ text, selected, onClick }) {
	return (
		<Box onClick={() => onClick()} sx={{
			mx: [ 2, 3, 4 ]
		}}>
			<Heading variant={selected ? 'mHeading' : 'sHeading'} sx={{
				cursor: 'pointer',
				transition: 'color 0.2s',
				':hover': {
					color: selected ? 'light' : 'primary'
				}
			}}>{text}</Heading>
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
			<Heading variant='lHeading' sx={{
				p: [ 20, 30, 40]
			}}>Who We Work With</Heading>
			<Flex sx={{
				p: [ 20, 30, 40],
				pt: [ 0, 0, 0 ],
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
					<FreeTheBidModule freeTheBidders={freeTheBidders} ftbRoles={ftbRoles} />}
			</Box>
		</Box>
	)
}

Partners.subtitle = 'Our Partners'

export async function getStaticProps() {
	const partners = await getPartners()
	const locations = await getLocations()
	const capabilities = await getCapabilities()
	const freeTheBidders = await getFreeTheBidders()
	const ftbRoles = await getFTBRoles()

	return {
		props: { partners, locations, capabilities, freeTheBidders, ftbRoles }
	}
}
