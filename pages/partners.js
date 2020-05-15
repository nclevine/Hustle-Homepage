import { useState } from 'react'
import { getPartners, getLocations, getCapabilities, getFreeTheBidders, getFTBRoles } from '../lib/contentful-api'
import { Box, Flex, Text, Heading } from 'rebass'

function FilterItem({ name, onClick, selected }) {
	let className = 'filter-item'
	if (selected) {
		className += ' selected'
	}
	return (
		<div className={className} onClick={() => onClick()}>
			{name}
			{selected ? '✓' : ''}
		</div>
	)
}

function CurrentFilterItem({ filter, onClick }) {
	return (
		<Text onClick={() => onClick()} sx={{
			p: 1,
			mr: 1,
			bg: 'secondary',
			color: 'light',
			cursor: 'pointer',
			':hover': {
				'span': {
					color: 'primary'
				}
			}
		}}>{filter} <span>X</span></Text>
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
				color: 'light'
			}}>
				<Flex>
					<Text>Filter by:</Text>
					<Box className='partner-filters-locations'>
						<Text onClick={e => setLocationFiltersExpanded(!locationFiltersExpanded)}>Location</Text>
						<Box sx={{
							height: locationFiltersExpanded ? 'auto' : 0,
							overflow: 'hidden'
						}}>
							<FilterItem name='All' onClick={() => filterList(null, 'location')} selected={!locationFilters.length} />
							{locations.map((l, i) => <FilterItem key={i} name={l} onClick={() => filterList(l, 'location')} selected={locationFilters.includes(l)} />)}
						</Box>
					</Box>
					<Box className='partner-filters-capabilities'>
						<Text onClick={e => setCapabilityFiltersExpanded(!capabilityFiltersExpanded)}>Capability</Text>
						<Box sx={{
							height: capabilityFiltersExpanded ? 'auto' : 0,
							overflow: 'hidden'
						}}>
							<FilterItem name='All' onClick={() => filterList(null, 'capability')} selected={!capabilityFilters.length} />
							{capabilities.map((c, i) => <FilterItem key={i} name={c} onClick={() => filterList(c, 'capability')} selected={capabilityFilters.includes(c)} />)}
						</Box>
					</Box>
				</Flex>
				{locationFilters.length || capabilityFilters.length ? 
					<Box className='current-filters'>
						<Flex>
							{locationFilters.map((f, i) => <CurrentFilterItem key={i} filter={f} onClick={() => filterList(f, 'location')} />)}
							{capabilityFilters.map((f, i) => <CurrentFilterItem key={i} filter={f} onClick={() => filterList(f, 'capability')} />)}
						</Flex>
					</Box> :
					''
				}
			</Box>
			<Flex className='partner-list' sx={{
				flexWrap: 'wrap'
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
		<Box className='partner-card' onClick={() => onClick()} sx={{
			width: expanded ? '100%' : [ '100%', '50%', '33%' ],
			order: expanded ? -1 : 0
		}}>
			<Heading className='partner-card-name'>{partner.name}</Heading>
			<Box className='partner-card-image'><img src={partner.logo} /></Box>
			{expanded ? 
				(
					<Box className='partner-card-info'>
						<Text className='partner-card-link'>
							<a href={partner.site} target='_blank'>Visit</a>
						</Text>
						<Box className='partner-card-locations'>
							{partner.locations.map((l, i) => (
								<Text key={i} className='partner-card-location'>{l}</Text>
							))}
						</Box>
						<Box className='partner-card-capabilities'>
							{partner.capabilities.map((c, i) => (
								<Text key={i} className='partner-card-capability'>{c}</Text>
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
					<FilterItem name='All' onClick={() => filterList()} selected={!roleFilters.length} />
					{ftbRoles.map((r, i) => <FilterItem key={i} name={r} onClick={() => filterList(r)} selected={roleFilters.includes(r)} />)}
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
					<p className='ftb-card-partner'>Partnered with <a href={freeTheBidder.partner.site} target='_blank'>{freeTheBidder.partner.name}</a></p>
					<p className='ftb-card-site'><a href={freeTheBidder.site} target='_blank'>Learn More</a></p>
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
