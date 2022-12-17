class Cart{
	get checkoutBtn(){
		return '.snipcart-cart__footer-buttons button.snipcart-button-primary'
	}

	get continuePaymentBtn(){
		return '.snipcart-form__footer button[type=submit]'
	}

	get shippingMethodsHead(){
		return 'snipcart-featured-payment-methods h3'
	}

	get shippingMethodsHead(){
		return 'snipcart-featured-payment-methods h3'
	}

	get shippingNameTxt(){
		return '#snipcart-billing-form input[name=name]'
	}

	get shippingEmailTxt(){
		return '#snipcart-billing-form input[name=email]'
	}

	get shippingEmailError(){
		return '#snipcart-billing-form .snipcart-form__set:nth-child(2) .snipcart-form__field:nth-child(2) .snipcart-field-error'
	}

	get shippingStreetTxt(){
		return '#snipcart-billing-form input[name=address1]'
	}

	get shippingAptTxt(){
		return '#snipcart-billing-form input[name=address2]'
	}

	get shippingCityTxt(){
		return '#snipcart-billing-form input[name=city]'
	}

	get shippingCityError(){
		return '#snipcart-billing-form > .snipcart__box > div:nth-child(3) .snipcart-form__set .snipcart-form__field:nth-child(2) .snipcart-field-error'
	}

	get shippingCountrySelect(){
		return '#snipcart-billing-form select[name=country]'
	}

	get shippingCountryTxt(){
		// return '#snipcart-billing-form input[name="country-target"]'
		return '#snipcart-billing-form > div.snipcart__box > div:nth-child(3)  .snipcart-form__set div.snipcart-form__field:nth-child(3)'
	}

	// get shippingCountryTxt(){
	// 	// return '#snipcart-billing-form input[name="country-target"]'
	// 	return '#snipcart-billing-form > div.snipcart__box > div:nth-child(3)  .snipcart-form__set div.snipcart-form__field:nth-child(3)'
	// }

	get shippingCountryError(){
		return '#snipcart-billing-form > .snipcart__box > div:nth-child(3) .snipcart-form__set .snipcart-form__field:nth-child(3) .snipcart-field-error'
	}

	get shippingProvinceTxt(){
		return '#snipcart-billing-form input[name=province]'
	}

	get shippingPostalCodeTxt(){
		return '#snipcart-billing-form input[name=postalCode]'
	}

	get shippingPostalCodeError(){
		return '#snipcart-billing-form > .snipcart__box > div:nth-child(3) .snipcart-form__set .snipcart-form__row:nth-child(4) .snipcart-field-error'
	}

	get checkoutTotal(){
		return '.snipcart-summary-fees__total .snipcart-summary-fees__amount'
	}

	get checkoutOrderInvoiceNumber(){
		return 'div.snipcart-order__invoice-number .snipcart-order__invoice-number--highlight'
	}

	get checkoutOrderInvoiceCard(){
		return 'div.snipcart-order__card'
	}

	get checkoutOrderInvoiceAddress(){
		return 'div.snipcart-billing-completed .snipcart-checkout-step__col:nth-child(2) .snipcart-billing-completed__information'
	}

	getShoppingCartSummaryItemNameSelector(itemNumber){
		return `ul.snipcart-cart-summary-items-list .snipcart-cart-summary-item:nth-child(${itemNumber}) .snipcart-cart-summary-item__name`
	}

	getShoppingCartSummaryItemPriceSelector(itemNumber){
		return `ul.snipcart-cart-summary-items-list .snipcart-cart-summary-item:nth-child(${itemNumber}) .snipcart-cart-summary-item__name`
	}

	getInvoiceSummaryItemNameSelector(itemNumber){
		return `ul.snipcart-cart-summary-items-list .snipcart-cart-summary-expanded-item:nth-child(${itemNumber}) >div:first-child  .snipcart-cart-summary-expanded-item__name`
	}

	getInvoiceSummaryItemPriceSelector(itemNumber){
		return `ul.snipcart-cart-summary-items-list .snipcart-cart-summary-expanded-item:nth-child(${itemNumber}) >div:nth-child(3) `
	}

	fillShippingForm(name, email, street, apt, city, country, province, postalCode){
		cy.get(this.shippingNameTxt).type(name);
		cy.get(this.shippingEmailTxt).type(email);
		cy.get(this.shippingAptTxt).type(apt);
		cy.get(this.shippingCityTxt).type(city);
		cy.get(this.shippingPostalCodeTxt).type(postalCode);
		cy.get(this.shippingCountryTxt).type("Jamaica{downArrow}{enter}");
		cy.wait(500);
		cy.get(this.shippingProvinceTxt).type(province);
		// TODO::Enter street address
		// cy.get(this.shippingStreetTxt).type(street);

	}
}
module.exports = new Cart();