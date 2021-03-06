import { Box, Flex, Heading, Text, Link, Image } from 'rebass'
import { getTeamMembers } from '../lib/contentful-api'

function TeamMember({ teamMember, index }) {
	return (
		<Box
			className='team-member'
			// variant={'card' + (index % 3 * 2 + 1)}
			variant={'card' + (index % 3 + 1)}
			sx={{
				p: [ 4 ],
				height: '100%',
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
				fontSize: [ 2, 2, 3, 3 ],
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
			pt: [ 88, 88, 110, 110 ],
			pb: [ 40, 40, 60, 80 ],
			position: 'relative',
			':before': {
				content: '""',
				position: 'fixed',
				width: '100vw',
				height: '100vh',
				top: 0,
				left: 0,
				zIndex: 0,
				backgroundImage: 'url(\'/background-gradient.jpg\')',
				backgroundSize: 'cover',
				backgroundPosition: 'top center',
			},
		}}>
			<Heading variant='lHeading' sx={{
				position: 'relative',
				zIndex: 1
			}}>Our Team</Heading>
			<Box className='team-members' sx={{
				display: 'grid',
				gridTemplateColumns: [ 'repeat(1, 55vw)', 'repeat(1, 55vw)', 'repeat(2, 32vw)', 'repeat(2, 28vw)' ],
				justifyContent: 'center',
				p: [ 20, 20, 30, 40 ],
				alignItems: 'stretch',
				position: 'relative',
				zIndex: 1
			}}>
				{teamMembers.map((t, i) => (
					<Box key={i} sx={{
						position: 'relative',
						height: '100%'
						// top: [ 0, ((i % 2) * 30), ((i % 2) * 30) ]
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
