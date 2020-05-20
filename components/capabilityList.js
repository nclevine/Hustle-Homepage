import { useState } from 'react'
import { Box, Flex, Text, Heading, Button } from 'rebass'
// import Carat from './carat'

export default function CapabilityList({ capabilities }) {
	const [showingMore, setShowingMore] = useState(false)

	const showMore = e => {
		setShowingMore(true)
	}

	return (
		<Box className='capabilities' sx={{
			px: [ 20, 30, 40 ],
			pb: [ 20, 30, 40 ],
			pt: [ 0 ]
		}}>
			<Box sx={{
				display: 'grid',
				gridTemplateColumns: [ 'repeat(2, auto)', 'repeat(3, auto)', 'repeat(4, auto)'],
				columnGap: [ 2, 2, 3 ],
				rowGap: [ 1 ],
				p: [ 20, 30, 40 ]
			}}>
				{capabilities.filter((c, i) => {
					return showingMore ? true : c.priority
				}).map((c, i) => (
					<Text key={i} sx={{
						color: 'primary',
						alignItems: 'center',
						justifyContent: 'center',
						fontWeight: 'bold',
						fontSize: [ 2 ],
					}}>{c.name}</Text>
				))}
			</Box>
			{!showingMore ?
				<Text sx={{
					color: 'dark',
					textAlign: 'center',
					transition: '0.2s',
					'span': {
						display: 'inline-block',
						overflow: 'hidden',
						position: 'relative',
						cursor: 'pointer',
						':hover': {
							color: 'primary',
							':before': {
								left: '100%',
								transitionDelay: '0s'
							},
							':after': {
								left: '0',
								transitionDelay: '0.4s'
							}
						},
						':before': {
							position: 'absolute',
							bottom: 0,
							left: 0,
							width: '100%',
							height: '1px',
							bg: 'dark',
							content: '""',
							display: 'block',
							transition: '0.2s',
							transitionDelay: '0.4s'
						},
						':after': {
							position: 'absolute',
							bottom: 0,
							left: '-100%',
							width: '100%',
							height: '1px',
							bg: 'primary',
							content: '""',
							display: 'block',
							transition: '0.2s',
							transitionDelay: 0
						}
					}
				}}>
					<span onClick={e => showMore()}>Show More</span>
				</Text> :
				''
			}
		</Box>
	)
}
