class Products {
	get aboutBtn(){
		return '#top-about'
	}

	get contactBtn(){
		return '#top-contact'
	}

	get cartCount(){
		return '.snipcart-cart-header__option';
	}

	get continueShoppingBtn(){
		return '.snipcart-cart-header__close-button';
	}

	 get sortOptions(){
        return ('[id="field-:r2:-label"]');
    }


    get selectSortDropDown() { 
        return ('#sort'); 
    }

    get selectSearchDropDown(){
        return ('[id="field-:r3:-label"]');
    }

    get selectCategoryDropDown(){
        return ('#category');
    }

    get searchTextField(){
        return ('#search');
    }


    get productPriceList(){
        return ('.chakra-container:nth-child(2) > div:nth-child(3) > .chakra-stack >div:nth-child(2) >div:first-child >div:nth-child(3) p');
    }

    get productNameList(){
        return ('.chakra-container:nth-child(2) > div:nth-child(3) > .chakra-stack >div:nth-child(2) >div:first-child >div:nth-child(1) p');
    }

    get productCategoryList(){
        return ('.chakra-container:nth-child(2) > div:nth-child(3) > .chakra-stack >div:nth-child(2) >div:first-child >div:nth-child(3) span');
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

	getProductImageSelector(productNumber){
		return `#product-${productNumber} > div:nth-child(1) > div`
  }
  
	getProductCategorySelector(productNumber){
		return `#product-${productNumber} > div:nth-child(2)  div:nth-child(1) div:nth-child(3) span`
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

	selectSort(sort) {
        cy.get(this.selectSortDropDown).select(sort)
    }
}

module.exports = new Products();