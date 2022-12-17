class Products {

	get cartCount(){
		return '.snipcart-cart-header__option';
	}

	get continueShoppingBtn(){
		return '.snipcart-cart-header__close-button';
	}

	getAddToCartBtnSelector(productNumber){
		return `#product-${productNumber} #add-to-cart`
	}

	removeItemFromCart(item){
		if(item){
			cy.get(`.snipcart-item-line:nth-child(${item}) .snipcart-item-line__product button[title="Remove item"]`).click();
		}
	}

	getCartItemNameSelector(item){
		return `.snipcart-item-line:nth-child(${item}) h2`;
	}

	getProductNameSelector(productNumber){
		return `#product-${productNumber} > div:nth-child(2)  div:nth-child(1) div:nth-child(1) p`
	}


	addProductToCart(productNumber, quantity){
		const selector = this.getAddToCartBtnSelector(productNumber);
		if(quantity && quantity !== 0){
			cy.get(`#product-${productNumber} .chakra-numberinput__field`).type(`{backspace}${quantity}`);
		}
		cy.get(selector).scrollIntoView();
		cy.intercept('/_next/*').as('products')
		cy.wait(1500);//.should('have.property', 'status', 200)
		// cy.wait('@products');//.should('have.property', 'status', 200)
		cy.get(selector).click();

	}
}

module.exports = new Products();