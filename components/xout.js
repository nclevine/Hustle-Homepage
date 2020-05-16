import { Box } from 'rebass'

export default function XOut({ sx }) {
	return (
		<Box sx={{
			display: 'inline-block',
			width: 10,
			'svg': {
				stroke: 'primary',
				strokeWidth: 3
			},
			...sx
		}}>
			<svg viewBox='0 0 25 25' version='1.1' xmlns='http://www.w3.org/2000/svg'>
				<title>X Out</title>
				<g id='x-out'>
					<line x1='0' y1='0' x2='25' y2='25' id='Line'></line>
					<line x1='25' y1='0' x2='0' y2='25' id='Line-2'></line>
				</g>
			</svg>
		</Box>
	)
}
