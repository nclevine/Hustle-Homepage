import { Box, Flex, Heading, Text, Link, Image } from 'rebass'
import { getTeamMembers } from '../lib/contentful-api'

function TeamMember({ teamMember, index }) {
	return (
		<Box
			className='team-member'
			variant={'card' + (index % 3 * 2 + 1)}
			sx={{
				p: [ 4 ],
				minHeight: [ 0, 520, 600 ]
			}}
		>
			<Image src={teamMember.headshot} sx={{
				width: '100%',
				mb: [ 3 ]
			}} />
			<Heading variant='sHeadingAlt' sx={{
				color: 'dark',
				mb: [ 2 ]
			}}>
				{teamMember.firstName + ' ' + teamMember.lastName}
			</Heading>
			<Heading variant='sHeadingAlt' sx={{
				fontSize: [ 2, 3, 3 ],
			}}>{teamMember.title}</Heading>
			{teamMember.specialty ? 
				<Text sx={{
					fontWeight: 'bold',
					my: [ 2 ]
				}}>{teamMember.specialty}</Text> : 
				''
			}
			<Text variant='smallCaps' sx={{ my: 2 }}>{teamMember.email}</Text>
			<Text variant='smallCaps' sx={{ my: 2 }}>{teamMember.phoneNumber}</Text>
			{teamMember.linkedIn ? 
				<Link href={teamMember.linkedIn} target='_blank' sx={{
					fontSize: [ 1 ],
					textTransform: 'uppercase',
					fontWeight: 'bold',
					my: 2
				}}>LinkedIn</Link> :
				''
			}
		</Box>
	)
}

export default function Team({ teamMembers }) {
	return (
		<Box sx={{
			pt: 110
		}}>
			<Heading variant='lHeading'>Our Team</Heading>
			<Box className='team-members' sx={{
				display: 'grid',
				gridTemplateColumns: [ 'repeat(1, 80%)', 'repeat(2, 40%)', 'repeat(2, 40%)' ],
				justifyContent: 'center',
				p: [ 20, 30, 40 ]
			}}>
				{teamMembers.map((t, i) => (
					<Box key={i} sx={{
						position: 'relative',
						top: [ 0, ((i % 2) * 30), ((i % 2) * 30) ]
					}}>
						<TeamMember index={i} teamMember={t} />
					</Box>
				))}
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
