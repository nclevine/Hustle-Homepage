// import { Client } from 'postmark'
import { Box, Flex, Heading, Text } from 'rebass'
import { Label, Input, Select, Textarea } from '@rebass/forms'
import { useState } from 'react'
import { sendEmail, joinMailingList } from '../lib/emailjs-api'

export default function Contact({ emailSubjects }) {
	const [emailSent, setEmailSent] = useState(false)
	const [visitorName, setVisitorName] = useState('')
	const [visitorEmail, setVisitorEmail] = useState('')
	const [subjectCapability, setSubjectCapability] = useState('')
	const [message, setMessage] = useState('')
	const [signedUp, setSignedUp] = useState(false)
	const [signupEmail, setSignupEmail] = useState('')
	const [signupName, setSignupName] = useState('')

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
			message: message.replace(/\n/g, '<br>\n')
		}
		setEmailSent(true)
		sendEmail(templateParams)
		e.preventDefault()
	}

	const onSignupEmailChanged = e => {
		setSignupEmail(e.target.value)
	}

	const onSignupNameChanged = e => {
		setSignupName(e.target.value)
	}

	const onSignupSubmit = e => {
		// implement copper or whatever
		const templateParams = {
			visitorName: signupName,
			visitorEmail: signupEmail
		}
		setSignedUp(true)
		joinMailingList(templateParams)
		e.preventDefault()
	}

	return (
		<Box sx={{pb: [ 20, 20, 30, 40 ]}}>
			<Heading variant='lHeading'>Contact Us</Heading>
			{!emailSent ? 
				<Box
					variant='contactInput'
					as='form'
					onSubmit={e => onEmailSubmit(e)}
					sx={{
						width: [ '80%', '80%', '75%', '50%' ],
						m: '0 auto'
					}}
				>
			    	<Input 
			    		required
			    		type='text'
			    		name='name'
			    		placeholder='Name' 
			    		onChange={e => onNameChange(e)}
			    	/>
				    <Box sx={{pt: [ 2, 2, 3, 4 ]}}>
				    	<Input
				    		required
				    		type='email'
				    		name='email'
				    		placeholder='Email' 
				    		onChange={e => onEmailChange(e)}
				    	/>
				    </Box>
				    <Box sx={{
				    	pt: [ 2, 2, 3, 4 ],
						'svg': {
							fill: 'primaryO3'
						}
				    }}>
					    <Select
					    	required
					    	value={subjectCapability}
					    	onChange={e => onSubjectChange(e)}
					    	sx={{
						    	color: subjectCapability ? 'dark' : 'primaryO3',
						    }}
					    >
					    	<option defaultValue value='' disabled>SUBJECT</option>
					    	{emailSubjects.map((s, i) => (
					    		<option key={i} value={s}>{s}</option>
					    	))}
					    </Select>
				    </Box>
					<Box sx={{pt: [ 2, 2, 3, 4 ]}}>
				    	<Textarea
				    		required
				    		name='message'
				    		placeholder='Enter your message here' 
				    		onChange={e => onMessageChange(e)}
				    		sx={{
				    			height: [ 100, 100, 150, 200 ],
				    			whiteSpace: 'pre-wrap'
				    		}}>
				    	</Textarea>
				    </Box>
					<Box sx={{pt: [ 2, 2, 3, 4 ]}}>
					    <Input
					    	type='submit'
					    	name='submit'
					    	value='Send'
					    	disabled={!(visitorName && visitorEmail && subjectCapability && message)}
					    />
					</Box>
				</Box> :
				<Heading variant='sHeadingAlt' sx={{
					p: [ 20, 20, 30, 40 ],
					textAlign: 'center'
				}}>
					Thanks for your message!
				</Heading>
			}
			<Heading variant='sHeading' sx={{
				pt: [ 40, 40, 60, 80 ],
				textAlign: 'center',
				color: 'dark'
			}}>Receive Our Mailing List</Heading>
			{!signedUp ? 
				<Box
					variant='contactInput'
					as='form'
					onSubmit={e => onSignupSubmit(e)}
					sx={{
						width: [ '80%', '80%', '75%', '50%' ],
						m: '0 auto'
					}}
				>
					<Box sx={{pt: [ 2, 2, 3, 4 ]}}>
						<Input 
							required
							type='text'
							name='name'
							placeholder='Name'
							onChange={e => onSignupNameChanged(e)}
						/>
					</Box>
					<Box sx={{pt: [ 2, 2, 3, 4 ]}}>
						<Input 
							required
							type='email'
							name='email'
							placeholder='Email'
							onChange={e => onSignupEmailChanged(e)}
						/>
					</Box>
					<Box sx={{pt: [ 2, 2, 3, 4 ]}}>
						<Input
							type='submit'
							name='submit'
							value='Sign Up'
							disabled={!signupEmail}
						/>
					</Box>
				</Box> :
				<Heading variant='sHeadingAlt' sx={{
					p: [ 20, 20, 30, 40 ],
					textAlign: 'center'
				}}>
					Thanks for signing up!
				</Heading>
			}
		</Box>
	)
}
