class Wishlist {
	get favouritesLink(){
		return `#top-favorite`
	}
	get wishlistSuccessMessage(){
		return '#chakra-toast-manager-top-right .chakra-toast:nth-child(1)';
	}

	getFavouriteButtonSelectorActive(productNumber){
		return `#product-${productNumber} > div:nth-child(2)  div:nth-child(1) div:nth-child(1) div svg[style="color: rgb(241, 196, 15);"]`
	}

	getFavouriteButtonSelector(productNumber){
		return `#product-${productNumber} > div:nth-child(2)  div:nth-child(1) div:nth-child(1) div`
	}

	getRemoveButtonSelector(productNumber){
		return `.chakra-container >div:nth-child(2) > .chakra-stack:nth-child(${productNumber}) #remove-favorite-btn`
	}

}

module.exports = new Wishlist();