import CheckoutPage from '../pages/cart.page.js'
import ProductPage from '../pages/product.page.js'
import LoginPage from '../pages/login.page.js'
import routes from '../data/routes.data.json'
import users from '../data/users.data.json'
import products from '../data/products.data.json'
import checkoutInfo from '../data/checkout.data.json'


describe("Shopping cart", ()=>{
	beforeEach(()=>{
		LoginPage.login(users.test_account.username, users.test_account.password);
		cy.visit(routes.products);
	});

	it("Should NOT allow checkout with invalid information", ()=>{
		const product_id = Math.round(Math.random()*22)
		ProductPage.addProductToCart(product_id);
		cy.get(ProductPage.cartCount).should('contain', 1);
		cy.get(ProductPage.getCartItemNameSelector(1)).should('contain', products[product_id].name);

		cy.get(CheckoutPage.checkoutBtn).click();

		cy.get(CheckoutPage.continuePaymentBtn).click();

		cy.get(CheckoutPage.shippingEmailError).should('be.visible');
		cy.get(CheckoutPage.shippingEmailError).should('contain', checkoutInfo.error.email);

		cy.get(CheckoutPage.shippingCityError).should('be.visible');
		cy.get(CheckoutPage.shippingCityError).should('contain', checkoutInfo.error.city);

		cy.get(CheckoutPage.shippingCountryError).should('be.visible');
		cy.get(CheckoutPage.shippingCountryError).should('contain', checkoutInfo.error.country);

		cy.get(CheckoutPage.shippingPostalCodeError).should('be.visible');
		cy.get(CheckoutPage.shippingPostalCodeError).should('contain', checkoutInfo.error.postalcode);

	});

	it("Should NOT allow checkout with invalid payment information", ()=>{
		cy.viewport(1920, 1080);
		const product_id = Math.round(Math.random()*22)
		ProductPage.addProductToCart(product_id);
		// cy.get(ProductPage.cartCount).should('contain', 1);
		cy.get(ProductPage.getCartItemNameSelector(1)).should('contain', products[product_id].name);

		cy.get(CheckoutPage.checkoutBtn).click();

		CheckoutPage.fillShippingForm(checkoutInfo.name, checkoutInfo.email, checkoutInfo.street, checkoutInfo.apt, checkoutInfo.city, checkoutInfo.country, checkoutInfo.province, checkoutInfo.postalcode);
		
		// cy.get(CheckoutPage.continuePaymentBtn).wait(1000);
		// // cy.get("snipcart-modal__container").scrollTo('bottom');
		cy.get(CheckoutPage.continuePaymentBtn).scrollIntoView();
		cy.get(CheckoutPage.continuePaymentBtn).click();

		cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').should('be.visible')
        cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').type(checkoutInfo.invalid_card.number)
        cy.iframe('.snipcart-payment-card-form iframe').find('#expiry-date').type(checkoutInfo.invalid_card.expiry)
        cy.iframe('.snipcart-payment-card-form iframe').find('#cvv').type(checkoutInfo.invalid_card.cvc)
		// cy.get(CheckoutPage.checkoutTotal).should('contain', `$${products[product_id].price.toLocalString("en-US")}`)
		cy.get(CheckoutPage.continuePaymentBtn).click();

		cy.wait(3000);
		cy.url().should('not.contain', 'order');
		// cy.get(CheckoutPage.checkoutOrderInvoiceNumber).should('not.be.visible');


	});

	it("Should checkout with valid information", ()=>{
		cy.viewport(1920, 1080);
		const product_id = Math.round(Math.random()*22)
		ProductPage.addProductToCart(product_id);
		// cy.get(ProductPage.cartCount).should('contain', 1);
		cy.get(ProductPage.getCartItemNameSelector(1)).should('contain', products[product_id].name);

		cy.get(CheckoutPage.checkoutBtn).click();

		CheckoutPage.fillShippingForm(checkoutInfo.name, checkoutInfo.email, checkoutInfo.street, checkoutInfo.apt, checkoutInfo.city, checkoutInfo.country, checkoutInfo.province, checkoutInfo.postalcode);
		
		// cy.get(CheckoutPage.continuePaymentBtn).wait(1000);
		// // cy.get("snipcart-modal__container").scrollTo('bottom');
		cy.get(CheckoutPage.continuePaymentBtn).scrollIntoView();
		cy.get(CheckoutPage.continuePaymentBtn).click();

		cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').should('be.visible')
        cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').type(checkoutInfo.card.number)
        cy.iframe('.snipcart-payment-card-form iframe').find('#expiry-date').type(checkoutInfo.card.expiry)
        cy.iframe('.snipcart-payment-card-form iframe').find('#cvv').type(checkoutInfo.card.cvc)
		
		// check total
		cy.get(CheckoutPage.checkoutTotal).should('contain', `$${products[product_id].price.toLocaleString("en-US")}`)
		
		cy.get(CheckoutPage.continuePaymentBtn).click();

		// TODO:: check cart items
		// check invoice number
		cy.get(CheckoutPage.checkoutOrderInvoiceNumber).should('be.visible');

		// check address
		cy.get(CheckoutPage.checkoutOrderInvoiceAddress).should('be.visible');
		cy.get(CheckoutPage.checkoutOrderInvoiceAddress).should('contain', `${checkoutInfo.apt}, ${checkoutInfo.city}, ${checkoutInfo.province}, JM, ${checkoutInfo.postalcode}`);

		// check cardinfo
		cy.get(CheckoutPage.checkoutOrderInvoiceCard).should('be.visible');
		cy.get(CheckoutPage.checkoutOrderInvoiceCard).should('contain', checkoutInfo.card.number.substring(checkoutInfo.card.number.length-4, checkoutInfo.card.number.length));
		

	});
});