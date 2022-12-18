import routes from "../data/routes.data.json"

class Contact{
	get contactMenuLink(){
		return '#top-contact';
	}

	get contactEmailLink(){
		return '#__next > div:nth-child(2) a[href^="mailto:"]';
	}
	get contactTwitterLink(){
		return '#__next > div:nth-child(2) a[href*="twitter"]';
	}
	get contactLinkedInLink(){
		return '#__next > div:nth-child(2) a[href*="linkedin"]';
	}

	/*----------------FORM----------------*/

	get firstNameTxt(){
		return '#firstName'
	}

	get lastNameTxt(){
		return '#lastName'
	}

	get emailTxt(){
		return '#email'
	}

	get subjectTxt(){
		return '#subject'
	}

	get emailMessageTxt(){
		return '#message'
	}

	get sendBtn(){
		return 'form button[type=button]'
	}

	get firstnameError(){
		return "#firstName + .chakra-form__error-message"
	}
	get lastnameError(){
		return "#lastName + .chakra-form__error-message"
	}
	get emailError(){
		return "#email + .chakra-form__error-message"
	}
	get subjectError(){
		return "#subject + .chakra-form__error-message"
	}
	get messageError(){
		return "#message + .chakra-form__error-message"
	}

	get sentAlert(){
		return '#chakra-toast-manager-bottom li.chakra-toast'
	}

	fillContactForm(firstName, lastName, email, subject, emailMessage){	
		cy.get(this.firstNameTxt).type(firstName)

		cy.get(this.lastNameTxt).type(lastName)

		cy.get(this.emailTxt).type(email)

		cy.get(this.subjectTxt).type(subject)

		cy.get(this.emailMessageTxt).type(emailMessage)
	}

	open(){
		cy.visit(routes.contact);
	}
}

module.exports = new Contact();