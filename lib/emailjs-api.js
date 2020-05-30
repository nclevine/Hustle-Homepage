import emailjs from 'emailjs-com'

export function sendEmail(templateParams) {
	// emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams, process.env.EMAILJS_USER_ID)
	emailjs.send('hello_hustle_rs', 'hustle_homepage_email', templateParams, 'user_o6AJXLLAPCkp5EGia6Yi0')	
		.then(res => {
			console.log('SUCCESS!', res.status, res.text)
		}, err => {
			console.log('FAILED...', err)
		})
}

export function joinMailingList(templateParams) {
	emailjs.send('hello_hustle_rs', 'hustle_homepage_mailing_list', templateParams, 'user_o6AJXLLAPCkp5EGia6Yi0')
		.then(res => {
			console.log('SUCCESS!', res.status, res.text)
		}, err => {
			console.log('FAILED...', err)
		})
}
