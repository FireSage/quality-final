import ProductPage from '../pages/product.page.js'
import ProductGallery from '../pages/product-gallery.page.js'
import LoginPage from '../pages/login.page.js'
import routes from '../data/routes.data.json'
import users from '../data/users.data.json'
import products from '../data/products.data.json'

describe('The User', () => {
    beforeEach(() => {
        LoginPage.login(users.test_account.username, users.test_account.password);
		cy.visit(routes.products)
    });

    it.only('should be able to visit about page', () => {

        //click the about button
        cy.get(ProductPage.aboutBtn).then(($a)=>{
        	 $a.attr('target', '_self')
        }).click();//)invoke('removeAttr', 'target').click();

		cy.url().should('include', 'qualityworkscg.com/');

    });


    it('User should be able to visit contact page', () => {
        cy.get(ProductPage.contactBtn).click();

        //verify the url is contact url
        cy.url().should('include', routes.contact);

    });

});
