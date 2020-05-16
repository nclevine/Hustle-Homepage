import { Box } from 'rebass'

export default function Carat({ sx }) {
	return (
		<Box sx={{
			display: 'inline-block',
			width: 10,
			'svg': {
				verticalAlign: 'middle',
			},
			...sx
		}}>
			<svg viewBox='0 0 50 25' version='1.1' xmlns='http://www.w3.org/2000/svg'>
				<title>Carat</title>
				<polygon id='Carat' points='0 0 50 0 25 25'></polygon>
			</svg>
		</Box>
	)
}
