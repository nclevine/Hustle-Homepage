import { Box, Flex, Heading } from 'rebass'

export default function IntroVideo({ videoSrc, copy }) {
	return (
		<Box sx={{
			position: 'relative',
			height: '100%',
			'video': {
				display: 'block',
				width: '100%'
			}
		}}>
			<video src={videoSrc} autoPlay loop muted />
			<Flex sx={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				maxHeight: 610,
				top: 0,
				left: 0,
				bg: 'primaryO5',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Heading variant='lHeading' sx={{
					color: 'white',
					fontSize: [ 4, 5, 6, 7 ]
				}}>{copy}</Heading>
			</Flex>
		</Box>
	)
}
