const { faker } = require("@faker-js/faker");

import { test_account, users, error_messages, incorrect_user } from "../data/users.data.json"
import routes from "../data/routes.data.json"

import Authentication from "../pages/login.page"

describe("Register Page", ()=>{
	it("Should not register with missing email", ()=>{
		Authentication.signUp(null, test_account.password);
		cy.get(Authentication.emailError).should("be.visible");
		cy.get(Authentication.emailError).should("contain", error_messages.missing_email);
	});

	it("Should not register with invalid email", ()=>{
		Authentication.signUp("em", test_account.password);
		cy.get(Authentication.emailError).should("be.visible");
		cy.get(Authentication.emailError).should("contain", error_messages.invalid_email);
	});

	it("Should not register with missing password", ()=>{
		Authentication.signUp(test_account.username, null);
		cy.get(Authentication.passwordError).should("be.visible");
		cy.get(Authentication.passwordError).should("contain", error_messages.missing_password);
	});

	// it("Should not login with invalid password", ()=>{
	// 	Authentication.signUp(test_account.username, "em");
	// });

	it("Should not register with existing credentials", ()=>{
		Authentication.signUp(test_account.username, test_account.password);
		cy.get(Authentication.signInError).should("be.visible");
		cy.get(Authentication.signInError).should("contain", error_messages.signup_error);

	});
	
	it("Should register with valid credentials", ()=>{
		const email = faker.internet.email();
        const password = faker.internet.password(20, false, /[a-zA-Z0-9_+#!]/);
		Authentication.signUp(email, password);
		cy.url().should("contain", routes.products);

		cy.get(Authentication.btnSignOut).should("be.visible");
		// cy.get(Authentication.btnSignOut).should("contain", "Sign Out");
		
		// Authentication.saveLoginInfo(email, password);
	});

});