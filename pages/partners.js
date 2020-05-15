import { useState } from 'react'
import { getPartners, getLocations, getCapabilities, getFreeTheBidders, getFTBRoles } from '../lib/contentful-api'
import Layout from '../components/layout'

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

function PartnerModule({ partners, locations, capabilities }) {
	const [locationFilters, setLocationFilters] = useState([])
	const [capabilityFilters, setCapabilityFilters] = useState([])
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
		<div className='partner-module'>
			<div className='partner-filters'>
				<p>Filter</p>
				<div className='partner-filters-inner'>
					<div className='partner-filters-locations'>
						<p>By Location</p>
						<FilterItem name='All' onClick={() => filterList(null, 'location')} selected={!locationFilters.length} />
						{locations.map((l, i) => <FilterItem key={i} name={l} onClick={() => filterList(l, 'location')} selected={locationFilters.includes(l)} />)}
					</div>
					<div className='partner-filters-capabilities'>
						<p>By Capability</p>
						<FilterItem name='All' onClick={() => filterList(null, 'capability')} selected={!capabilityFilters.length} />
						{capabilities.map((c, i) => <FilterItem key={i} name={c} onClick={() => filterList(c, 'capability')} selected={capabilityFilters.includes(c)} />)}
					</div>
				</div>
			</div>
			<div className='partner-list'>
				{partners
					.filter(p => {
						const matchesLocations = p.locations.map(l => locationFilters.includes(l)).includes(true)
						const matchesCapabilities = p.capabilities.map(c => capabilityFilters.includes(c)).includes(true)
						return ((matchesLocations || !locationFilters.length) && (matchesCapabilities || !capabilityFilters.length))
					})
					.map((p, i) => <PartnerCard key={i} partner={p} expanded={expandedPartner === p.id} onClick={() => expandPartnerCard(p.id)} />)
				}
			</div>

			<style jsx>{`
				.partner-filters-inner {
					display: flex;
				}
			`}</style>
		</div>
	)
}

function PartnerCard({ partner, expanded, onClick }) {
	return (
		<div className='partner-card' onClick={() => onClick()}>
			<h3 className='partner-card-name'>{partner.name}</h3>
			<div className='partner-card-image'><img src={partner.logo} style={{width: '100%'}} /></div>
			{expanded ? 
				(
					<div className='partner-card-info'>
						<p className='partner-card-link'><a href={partner.site} target='_blank'>Visit</a></p>
						<div className='partner-card-locations'>
							{partner.locations.map((l, i) => <p key={i} className='partner-card-location'>{l}</p>)}
						</div>
						<div className='partner-card-capabilities'>
							{partner.capabilities.map((c, i) => <p key={i} className='partner-card-capability'>{c}</p>)}
						</div>
					</div>
				) :
				''
			}
		</div>
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
	let className = 'module-toggle'
	if(!selected) {
		className += ' deselected'
	}

	return (
		<div className={className} onClick={() => onClick()}>
			<h2>{text}</h2>

			<style jsx>{`
				.deselected {
					font-size: 75%;
				}
			`}</style>
		</div>
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
		<Layout subtitle='Our Partners'>
			<h1>Who We Work With</h1>
			<div className='partner-module-toggles'>
				<ModuleToggle text='Our Partners' selected={module === 'partners'} onClick={() => toggleModule('partners')} />
				<ModuleToggle text='Free the Bid' selected={module === 'ftb'} onClick={() => toggleModule('ftb')} />
			</div>
			{module === 'partners' ? 
				<PartnerModule partners={partners} locations={locations} capabilities={capabilities} /> :
				<FreeTheBidModule freeTheBidders={freeTheBidders} ftbRoles={ftbRoles} />}
			
			<style jsx>{`
				.partner-module-toggles {
					display: flex;
				}
			`}</style>
		</Layout>
	)
}

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
