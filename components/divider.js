import { Box } from 'rebass'

export default function Divider({ number }) {
	let array = []

	for (var i = 1; i <= number; i++) {
		array.push(i)
	}
	for (var i = number - 1; i >= 1; i--) {
		array.push(i)
	}

	return (
		<Box className='divider' sx={{
			position: 'absolute',
			top: '50%',
			left: 0,
			width: '100%',
			transform: 'translateY(-50%)'
		}}>
			{array.map((l, i) => (
				<Box key={i} sx={{
					position: 'relative',
					left: '50%',
					transform: 'translateX(-50%)',
					borderRadius: 99999,
					width: 'calc(100% - ' + (200 / l) + 'px)',
					height: 2 * (l) + 'px',
					bg: 'primary',
					mb: l === number ? 2 * (l - 1) + 'px' : 2 * (l) + 'px'
				}}></Box>
			))}
		</Box>
	)
}
