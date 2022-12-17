import Wishlist from '../pages/wishlist.page.js'
import ProductPage from '../pages/product.page.js'
import LoginPage from '../pages/login.page.js'
import routes from '../data/routes.data.json'
import users from '../data/users.data.json'
import products from '../data/products.data.json'

describe("Favourites/Wishlist", ()=>{
	beforeEach(()=>{
		LoginPage.login(users.test_account.username, users.test_account.password);
		cy.visit(routes.products);
	});

	it("Star should be visible on all products", ()=>{
		
		for(let i = 0; i < 22; i++){
			// check if star is on product 
			cy.get(Wishlist.getFavouriteButtonSelector(i)).should('be.visible');
		}
	});

	it("Star should allow users to add a single product to favourites", ()=>{
		// get random product
		const product_id = Math.round(Math.random()*22)

		// check if star is on product 
		cy.get(Wishlist.getFavouriteButtonSelector(product_id)).should('be.visible');

		// click star  
		cy.get(Wishlist.getFavouriteButtonSelector(product_id)).click();
		cy.get(Wishlist.wishlistSuccessMessage).should('be.visible');
		cy.get(Wishlist.wishlistSuccessMessage).should('contain', `${products[product_id].name} added to favorites`);
		cy.get(Wishlist.getFavouriteButtonSelectorActive(product_id)).should('be.visible');
		cy.get(Wishlist.getFavouriteButtonSelectorActive(product_id)).should('be.visible');


	});

	it("Star should allow users to add multiple items to favourites in succession", ()=>{
		// get random product
		const product_id = Math.round(Math.random()*14);
		const product_count = Math.round(Math.random()*5)+3;

		// check if star is on product 
		for(let i = product_id; i < product_id+product_count; i++){
			cy.log(i);
			cy.get(Wishlist.getFavouriteButtonSelector(i)).should('be.visible');
			// click star  
			cy.get(Wishlist.getFavouriteButtonSelector(i)).click();
			cy.wait(1000);
			cy.get(Wishlist.wishlistSuccessMessage).should('be.visible');
			cy.get(Wishlist.getFavouriteButtonSelectorActive(i)).should('be.visible');
			cy.get(Wishlist.wishlistSuccessMessage).should('contain', `${products[i].name} added to favorites`);
		}


	});

	it("Star should allow users to remove a single product favourites", ()=>{
		// get random product
		const product_id = Math.round(Math.random()*22)

		// check if star is on product 
		cy.get(Wishlist.getFavouriteButtonSelector(product_id)).should('be.visible');

		// click star  
		cy.get(Wishlist.getFavouriteButtonSelector(product_id)).click();
		cy.get(Wishlist.wishlistSuccessMessage).should('be.visible');
		cy.get(Wishlist.wishlistSuccessMessage).should('contain', `${products[product_id].name} added to favorites`);
		cy.get(Wishlist.getFavouriteButtonSelectorActive(product_id)).should('be.visible');
		cy.get(Wishlist.getFavouriteButtonSelectorActive(product_id)).should('be.visible');

		cy.get(Wishlist.favouritesLink).click();
		cy.url().should('contain', routes.favorites);
		cy.get(Wishlist.getRemoveButtonSelector(1)).click();

		cy.get("div.chakra-container div.chakra-stack ").should('contain', 'No favorites added!')
	});


	it("Star should allow users to remove a product from favourites from the product list", ()=>{
		// get random product
		const product_id = Math.round(Math.random()*22)

		// check if star is on product 
		cy.get(Wishlist.getFavouriteButtonSelector(product_id)).should('be.visible');

		// add product  
		cy.get(Wishlist.getFavouriteButtonSelector(product_id)).click();

		// confirm product added
		cy.get(Wishlist.wishlistSuccessMessage).should('be.visible');
		cy.get(Wishlist.wishlistSuccessMessage).should('contain', `${products[product_id].name} added to favorites`);
		cy.get(Wishlist.getFavouriteButtonSelectorActive(product_id)).should('be.visible');
		// cy.get(Wishlist.getFavouriteButtonSelectorActive(product_id)).should('be.visible');

		// remove product  
		cy.get(Wishlist.getFavouriteButtonSelector(product_id)).click();

		// confirm product removed
		cy.get(Wishlist.wishlistSuccessMessage).should('be.visible');
		cy.get(Wishlist.wishlistSuccessMessage).should('contain', `${products[product_id].name} removed from favorites`);
		cy.get(Wishlist.getFavouriteButtonSelectorActive(product_id)).should('not.exist');

	});

});