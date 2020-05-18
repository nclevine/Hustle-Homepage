import { Box, Flex, Heading, Text, Link, Image } from 'rebass'
import { getTeamMembers } from '../lib/contentful-api'

function TeamMember({ teamMember }) {
	return (
		<Box className='team-member' variant='card'>
			<Image src={teamMember.headshot} sx={{
				width: '100%'
			}} />
			<Heading variant='sHeadingAlt'>{teamMember.firstName + ' ' + teamMember.lastName}</Heading>
			<Heading sx={{
				fontStyle: 'italic'
			}}>{teamMember.title}</Heading>
			{teamMember.specialty ? 
				<Text sx={{
					fontWeight: 'bold'
				}}>{teamMember.specialty}</Text> : 
				''
			}
			<Text variant='smallCaps'>{teamMember.email}</Text>
			<Text variant='smallCaps'>{teamMember.phoneNumber}</Text>
			{teamMember.linkedIn ? 
				<Link href={teamMember.linkedIn} target='_blank' sx={{
					fontSize: [ 1 ],
					textTransform: 'uppercase',
					color: 'dark',
					fontWeight: 'bold'
				}}>LinkedIn</Link> :
				''
			}
		</Box>
	)
}

export default function Team({ teamMembers }) {
	return (
		<Box>
			<Heading variant='lHeading'>Our Team</Heading>
			<Box className='team-members' sx={{
				display: 'grid',
				gridTemplateColumns: [ 'repeat(1, 90%)', 'repeat(2, 46%)', 'repeat(3, 27%)' ],
				gridGap: [ '2.5em' ],
				justifyContent: 'center',
				p: [ 20, 30, 40 ]
			}}>
				{teamMembers.map((t, i) => <TeamMember key={i} teamMember={t} />)}
			</Box>
		</Box>
	)
}

Team.subtitle = 'Our Team'

export async function getStaticProps() {
	const teamMembers = await getTeamMembers()

	return {
		props: { teamMembers }
	}
}
