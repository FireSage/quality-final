import { test_account, users, error_messages, incorrect_user } from "../data/users.data.json"
import routes from "../data/routes.data.json"

import Login from "../pages/login.page"


describe("", ()=>{
	beforeEach(()=>{
		// cy.visit("")
	});

	it("Should NOT login with missing email", ()=>{
		Login.login(null, test_account.password);
		cy.get(Login.emailError).should("be.visible");
		cy.get(Login.emailError).should("contain", error_messages.missing_email);
	});

	it("Should NOT login with invalid email", ()=>{
		Login.login("em", test_account.password);
		cy.get(Login.emailError).should("be.visible");
		cy.get(Login.emailError).should("contain", error_messages.invalid_email);
	});

	it("Should NOT login with missing password", ()=>{
		Login.login(test_account.username, null);
		cy.get(Login.passwordError).should("be.visible");
		cy.get(Login.passwordError).should("contain", error_messages.missing_password);
	});

	// it("Should not login with invalid password", ()=>{
	// 	Login.login(test_account.username, "em");
	// });

	it("Should NOT login with invalid credentials", ()=>{
		Login.login(incorrect_user.username, incorrect_user.password);
		cy.get(Login.signInError).should("be.visible");
		cy.get(Login.signInError).should("contain", error_messages.incorrect_credentials);

	});
	it("Should login with valid credentials", ()=>{
		Login.login(test_account.username, test_account.password);
		cy.url().should("contain", routes.products);
	});
});