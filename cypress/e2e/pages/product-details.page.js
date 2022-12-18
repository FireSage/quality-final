class ProductDetails{
	get productName(){
		return '#__next > div:nth-child(2) div:nth-child(2) h2'
	}

	get productImage(){
		return 'div.carousel-root'
	}

	get productDescription(){
		return 'div#__next > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) >p:nth-child(2)'
	}

	get productPrice(){
		return 'div#__next > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) >div:nth-child(3)'
	}

	get backToproductsLink(){
		return 'div#__next > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) h2'
	}

	get relatedProductsHeader(){
		return 'div#__next > div:nth-child(2) > div:nth-child(1) > h2'
	}

	get relatedProductsContainer(){
		return 'div#__next > div:nth-child(2) > div:nth-child(1) > div:nth-child(4)'
	}
}

module.exports = new ProductDetails();
