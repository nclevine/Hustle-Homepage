import emailjs from 'emailjs-com'

export function sendEmail(templateParams) {
	// emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams, process.env.EMAILJS_USER_ID)
	emailjs.send('gmail05142020', 'hustle_homepage_email', templateParams, 'user_uoFtBhcnJERS5Rbz1J2hz')	
		.then(res => {
			console.log('SUCCESS!', res.status, res.text)
		}, err => {
			console.log('FAILED...', err)
		})
}

export function joinMailingList(templateParams) {
	emailjs.send('gmail05142020', 'hustle_homepage_mailing_list', templateParams, 'user_uoFtBhcnJERS5Rbz1J2hz')
		.then(res => {
			console.log('SUCCESS!', res.status, res.text)
		}, err => {
			console.log('FAILED...', err)
		})
}
