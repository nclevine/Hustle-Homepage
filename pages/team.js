import { getTeamMembers } from '../lib/contentful-api'
import Layout from '../components/layout'

function TeamMember({ teamMember }) {
	return (
		<div className='team-member'>
			<div className='team-member-headshot'><img src={teamMember.headshot} style={{width: '100%'}} /></div>
			<h3 className='team-member-name'>{teamMember.firstName + ' ' + teamMember.lastName}</h3>
			<h4 className='team-member-title'>{teamMember.title}</h4>
			{teamMember.specialty ? 
				<p className='team-member-specialty'>{teamMember.specialty}</p> : 
				''
			}
			<p className='team-member-email'>{teamMember.email}</p>
			<p className='team-member-phoneNumber'>{teamMember.phoneNumber}</p>
			{teamMember.linkedIn ? 
				<p className='team-member-linkedIn'><a href={teamMember.linkedIn} target='_blank'>LinkedIn</a></p> :
				''
			}
		</div>
	)
}

export default function Team({ teamMembers }) {
	return (
		<Layout>
			<h1>Our Team</h1>
			<div className='team-members'>
				{teamMembers.map((t, i) => <TeamMember key={i} teamMember={t} />)}
			</div>
		</Layout>
	)
}

export async function getStaticProps() {
	const teamMembers = await getTeamMembers()

	return {
		props: { teamMembers }
	}
}
