import Link from 'next/link'

export default function Navigation() {
	return (
		<>
			<nav>
				<Link href='/'><a>Home</a></Link>
				<Link href='/partners'><a>Who We Work With</a></Link>
				<Link href='/team'><a>Who We Are</a></Link>
				<Link href='/contact'><a>Contact Us</a></Link>
			</nav>
		</>
	)
}
