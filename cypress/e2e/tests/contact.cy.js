import { test_account} from "../data/users.data.json"
import contactInfo from "../data/contact.data.json"
import Contact from "../pages/contact.page.js"
import Login from "../pages/login.page"


describe("Contact page", ()=>{
	beforeEach(()=>{

		Login.login(test_account.username, test_account.password);
		Contact.open();
	});
	it("Social and email should be visible", ()=>{

		cy.get(Contact.contactEmailLink).should('be.visible')
		cy.get(Contact.contactTwitterLink).should('be.visible')		
		cy.get(Contact.contactLinkedInLink).should('be.visible')
	});

	it("Should be able to send message with valid data", ()=>{

		Contact.fillContactForm(contactInfo.firstName, contactInfo.lastName, contactInfo.email, contactInfo.subject, contactInfo.emailMessage);
		cy.get(Contact.sendBtn).click();
		cy.get(Contact.sentAlert).should('be.visible');
		cy.get(Contact.sentAlert).should('contain', contactInfo.success_alert);
	});


    it('should not submit with missing firstname', () => {
		// submit form
		cy.get(Contact.sendBtn).click();

        //check for error messages
        cy.get(Contact.firstnameError).should('be.visible');
        cy.get(Contact.firstnameError).should('have.text', contactInfo.requiredError);

        cy.get(Contact.lastnameError).should('be.visible');
        cy.get(Contact.lastnameError).should('have.text', contactInfo.requiredError);
    
        cy.get(Contact.emailError).should('be.visible');
        cy.get(Contact.emailError).should('have.text', contactInfo.requiredError);

        cy.get(Contact.subjectError).should('be.visible');
        cy.get(Contact.subjectError).should('have.text', contactInfo.requiredError);

        cy.get(Contact.messageError).should('be.visible');
        cy.get(Contact.messageError).should('have.text', contactInfo.requiredError);
    });
});
