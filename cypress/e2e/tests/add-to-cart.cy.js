import ProductPage from '../pages/product.page.js'
import LoginPage from '../pages/login.page.js'
import routes from '../data/routes.data.json'
import users from '../data/users.data.json'
import products from '../data/products.data.json'

//TODO:: confirm product names in cart

describe("Products", ()=>{
	beforeEach(()=>{
		LoginPage.login(users.test_account.username, users.test_account.password);
		cy.visit(routes.products)
	});

	it("Add a single product to the shopping cart", ()=>{
		const product_id = Math.round(Math.random()*22)
		ProductPage.addProductToCart(product_id);
		cy.get(ProductPage.cartCount).should('contain', 1);
		cy.get(ProductPage.getCartItemNameSelector(1)).should('contain', products[product_id].name);
	});

	it("Add a single product to the shopping cart with higher qualtity", ()=>{
		const product_quantity = Math.round(Math.random()*5)
		const product_id = Math.round(Math.random()*22)
		ProductPage.addProductToCart(product_id, product_quantity);
		cy.get(ProductPage.cartCount).should('contain', product_quantity);
		cy.get(ProductPage.getCartItemNameSelector(1)).should('contain', products[product_id].name);
	});

	it("Add a single product to the shopping cart multiple times", ()=>{
		const product_quantity = Math.round(Math.random()*5)
		const product_id = Math.round(Math.random()*22)
		for(let i =0; i < product_quantity; i++){
			ProductPage.addProductToCart(product_id);
			cy.get(ProductPage.cartCount).should('contain', (i+1));
			cy.get(ProductPage.continueShoppingBtn).click();
		}
	});

	it("Add multiple products to the shopping cart", ()=>{
		const product_quantity = Math.round((Math.random()*5)+3)
		const product_ids = []; 
		for(let i =0; i < product_quantity; i++){
			let product_id = 0;
			do{
				product_id = Math.round((Math.random()*21)-1);
				ProductPage.addProductToCart(product_id);
				cy.get(ProductPage.cartCount).should('contain', (i+1));
				cy.get(ProductPage.getCartItemNameSelector(1)).should('contain', products[product_id].name);
				cy.get(ProductPage.continueShoppingBtn).click();
			}while(product_ids.includes(product_id));
			product_ids.push(product_id);
		}
	});

	it("Remove an item from the shopping cart", ()=>{
		const product_id = Math.round(Math.random()*22)
		ProductPage.addProductToCart(product_id);
		cy.get(ProductPage.cartCount).should('contain', 1);
		cy.get(ProductPage.getCartItemNameSelector(1)).should('contain', products[product_id].name);
		ProductPage.removeItemFromCart(1);
		cy.get(ProductPage.cartCount).should('contain', 1);
	});

});