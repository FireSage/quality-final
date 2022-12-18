import ProductDetails from '../pages/product-details.page.js'
import ProductPage from '../pages/product.page.js'
import LoginPage from '../pages/login.page.js'
import routes from '../data/routes.data.json'
import users from '../data/users.data.json'
import products from '../data/products.data.json'


describe("Product details", ()=>{
	beforeEach(()=>{
		LoginPage.login(users.test_account.username, users.test_account.password);
		cy.visit(routes.products)
	});

	it("All product details should be visible", ()=>{
		const product_id = Math.round(Math.random()*22)

		cy.get(ProductPage.getProductImageSelector(product_id)).click();

		cy.get(ProductDetails.productImage).should('be.visible');
		cy.get(ProductDetails.productName).should('be.visible');
		cy.get(ProductDetails.productPrice).should('be.visible');
		cy.get(ProductDetails.productDescription).should('be.visible');
	});

	it("Back to products link should take user to home page", ()=>{
		const product_id = Math.round(Math.random()*22)

		cy.get(ProductPage.getProductImageSelector(product_id)).click();

		cy.get(ProductDetails.backToproductsLink).should('be.visible');
		cy.get(ProductDetails.backToproductsLink).click();
		cy.get(ProductPage.getProductImageSelector(product_id)).should('be.visible');
	});

	it("Be able to view related products", ()=>{
		const product_id = Math.round(Math.random()*22)

		cy.get(ProductPage.getProductImageSelector(product_id)).click();

		cy.get(ProductDetails.relatedProductsHeader).should('be.visible');
		cy.get(ProductDetails.relatedProductsContainer).should('be.visible');
	});

});