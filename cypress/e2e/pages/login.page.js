const fs = require('fs')

import Page from "./page.js"

class Login extends Page{
	get btnSignInTab(){
		return "ul.auth0-lock-tabs li:first-child"
	}

	get btnRegisterTab(){
		return "ul.auth0-lock-tabs li:nth-child(2)"
	}

		get btnSignInRegister(){
		return "#signInOrRegister"
	}

	get txtSignInEmail(){
		return "#1-email"
	}

	get emailError(){
		return "#auth0-lock-error-msg-email"
	}

	get txtSignInPassword(){
		return "#1-password"
	}

	get passwordError(){
		return "#auth0-lock-error-msg-password"
	}

	get signInError(){
		return "div.auth0-global-message.auth0-global-message-error"
	}

	get btnSignIn(){
		return "#1-submit";
	}

	get btnSignOut(){
		return "#top-sign-out";
	}

	get googleSignUp(){
		return "a.auth0-lock-social-button.auth0-lock-social-big-button"
	}
		get btnForgotPassword(){
		return "a.auth0-lock-alternative-link"
	}

	get signUpTerms(){
		return "small.auth0-lock-terms"
	}
	

	login(username, password){
		cy.visit("");

		cy.get(this.btnSignInRegister).click();
		if(username || username == "0" || username == 0){
			cy.get(this.txtSignInEmail).type(username);
		}
		if(password || password == "0" || password == 0){
			cy.get(this.txtSignInPassword).type(password);
		}
		cy.get(this.btnSignIn).click();
	}

	logout(){
		cy.get(this.btnSignOut).click();
	}

	signUp(username, password){
		cy.visit("");
		
		cy.get(this.btnSignInRegister).click();
		cy.get(this.btnRegisterTab).click();

		if(username || username == "0" || username == 0){
			cy.get(this.txtSignInEmail).type(username);
		}
		if(password || password == "0" || password == 0){
			cy.get(this.txtSignInPassword).type(password);
		}
		cy.get(this.btnSignIn).click();

	}

	// Save the login inifor for any user created during registration test
    saveLoginInfo(email, password){
        const path = "cypress/e2e/data/users.data.json";

        const fileEncoding = "utf8"

        cy.readFile(path, fileEncoding).then((users)=>{
        	users.users.push({username:email, password: password});
        	cy.writeFile(path, users);

        });

    }

}

module.exports = new Login();