import { Box, Flex, Heading, Text } from 'rebass'
import { Label, Input, Select, Textarea } from '@rebass/forms'
import { useState } from 'react'
// import { getAbbreviatedCapabilities } from '../lib/contentful-api'
import { sendEmail } from '../lib/emailjs-api'

export default function Contact({ emailSubjects }) {
	const [emailSent, setEmailSent] = useState(false)
	const [visitorName, setVisitorName] = useState('')
	const [visitorEmail, setVisitorEmail] = useState('')
	const [subjectCapability, setSubjectCapability] = useState('')
	const [message, setMessage] = useState('')

	const onNameChange = e => {
		setVisitorName(e.target.value)
	}

	const onEmailChange = e => {
		setVisitorEmail(e.target.value)
	}

	const onSubjectChange = e => {
		setSubjectCapability(e.target.value)
	}

	const onMessageChange = e => {
		setMessage(e.target.value)
	}

	const onEmailSubmit = e => {
		const templateParams = {
			visitorName: visitorName,
			visitorEmail: visitorEmail,
			subjectCapability: subjectCapability,
			message: message
		}
		setEmailSent(true)
		sendEmail(templateParams)
		e.preventDefault()
	}


	return (
		<Box sx={{pb: [ 20, 30, 40 ]}}>
			<Heading variant='lHeading'>Contact Us</Heading>
			{!emailSent ? 
				<Box variant='contactInput' as='form' onSubmit={e => onEmailSubmit(e)} sx={{
					width: [ '80%', '75%', '50%' ],
					m: '0 auto'
				}}>
			    	<Input type='text' name='name' placeholder='Name' onChange={e => onNameChange(e)} />
				    <Box sx={{pt: [ 2, 3, 4 ]}}>
				    	<Input type='email' name='email' placeholder='Email' onChange={e => onEmailChange(e)} />
				    </Box>
				    <Box sx={{pt: [ 2, 3, 4 ]}}>
					    <Select value={subjectCapability} onChange={e => onSubjectChange(e)}>
					    	<option defaultValue value=''>SUBJECT</option>
					    	{emailSubjects.map((s, i) => <option key={i} value={s}>{s}</option>)}
					    </Select>
				    </Box>
					<Box sx={{pt: [ 2, 3, 4 ]}}>
				    	<Textarea name='message' placeholder='Enter your message here' onChange={e => onMessageChange(e)} sx={{height: [ 100, 150, 200 ]}}></Textarea>
				    </Box>
					<Box sx={{pt: [ 2, 3, 4 ]}}>
					    <Input type='submit' name='submit' value='Send' />
					</Box>
				</Box> :
				<Heading variant='sHeadingAlt' sx={{
					p: [ 20, 30, 40 ]
				}}>Thanks for your message!</Heading>
			}
			<Heading variant='mHeading' sx={{
				p: [ 20, 30, 40 ]
			}}>Receive Our Mailing List</Heading>
			<Box variant='contactInput' as='form' sx={{
				width: [ '80%', '75%', '50%' ],
				m: '0 auto'
			}}>
				<Box sx={{pt: [ 2, 3, 4 ]}}>
					<Input type='email' name='email' placeholder='Email' />
				</Box>
				<Box sx={{pt: [ 2, 3, 4 ]}}>
					<Input type='submit' name='submit' value='Sign Up' />
				</Box>
			</Box>
		</Box>
	)
}

// Contact.subtitle = 'Contact Us'

// export async function getStaticProps() {
// 	const emailSubjects = await getAbbreviatedCapabilities()

// 	return {
// 		props: { emailSubjects }
// 	}
// }
