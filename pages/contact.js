import { useState } from 'react'
import { getAbbreviatedCapabilities } from '../lib/contentful-api'
import { sendEmail } from '../lib/emailjs-api'
import Layout from '../components/layout'

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
		<Layout>
			<h1>Contact Us</h1>
			<div className='contact-email-form-container'>
				{!emailSent ? 
					<form className='contact-email-form' onSubmit={e => onEmailSubmit(e)}>
					    <input type='text' name='name' placeholder='Name' onChange={e => onNameChange(e)} />
					    <input type='email' name='email' placeholder='Email' onChange={e => onEmailChange(e)} />
					    <select value={subjectCapability} onChange={e => onSubjectChange(e)}>
					    	<option defaultValue value=''>Subject</option>
					    	{emailSubjects.map((s, i) => <option key={i} value={s}>{s}</option>)}
					    </select>
					    <textarea name='message' placeholder='Enter your message here' onChange={e => onMessageChange(e)}></textarea>
					    <input type='submit' name='submit' value='Send' />
					</form> :
					<h3 className='contact-email-sent'>Thanks for your message!</h3>
				}
			</div>
			<h2>Receive Our Mailing List</h2>
			<form className='mailing-list-form'>
				<input type='email' name='email' placeholder='Email' />
				<input type='submit' name='submit' value='Sign Up' />
			</form>
		</Layout>
	)
}

export async function getStaticProps() {
	const emailSubjects = await getAbbreviatedCapabilities()

	return {
		props: { emailSubjects }
	}
}
