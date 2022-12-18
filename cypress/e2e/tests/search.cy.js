import Authentication from '../pages/login.page';
import {test_account} from '../data/users.data';
import { category } from '../data/search-sort.data.json';
import { search_term } from '../data/search-sort.data.json';
import products from '../data/products.data.json';
import productPage from '../pages/product.page';

let products_copy;

describe('Sort', () => {
    before(()=>{
        // copy products array
        products_copy = JSON.parse(JSON.stringify(products));
    });
    beforeEach(() => {

        cy.visit("");

        Authentication.login(test_account.username, test_account.password);
    });


    it('Should not be able to search by name correct name and wrong category', () => {
    	let searchString = products[0].name;
    	
    	// select category
        cy.get(productPage.selectCategoryDropDown).select(category.Shirts);

        //enter a product name -- using first product because it is not a part of shirt category
        cy.get(productPage.searchTextField).type(searchString);
        
        //verify that no products are found
        cy.get(productPage.getProductNameSelector(0)).should('not.exist', searchString);

    });

    it('should be able to search by search term', () => {

        //enter a product name
        cy.get(productPage.searchTextField).type(search_term.Shirts);

        //verify that each result has search term in name
        cy.get(productPage.productNameList).each(($el, index, $list)=>{
        	expect($el).to.contain(search_term.Shirts);
        });

    });

    it('should be able to search by name', () => {
    	let searchString = products[0].name;

        //enter a product name
        cy.get(productPage.searchTextField).type(searchString);

        //verify that each result has search term in name
        cy.get(productPage.productNameList).each(($el, index)=>{
        	expect($el).to.contain(searchString);
        });

    });


    // tests filtering by category - 
    // this test fails for pants because the selected value (<option value=pant>) for pants is missing an 's' 
    // category is selected randomly from product list
    it('should be able to filter by category', () => {
		let product_id = Math.round(Math.random()*21);
        
        // select a product cat
        cy.get(productPage.selectCategoryDropDown).select(products[product_id].category);

        cy.wait(500);

        cy.get(productPage.productCategoryList).each(($el, index)=>{
        	expect($el).to.contain(products[product_id].category);
        });
        
    });

    it('should not be able to search by price', () => {
    	let product_id = Math.round(Math.random()*21);

        //enter a product price in search field
        cy.get(productPage.searchTextField).type(products[product_id].price);

        //verify that no products are found
        cy.get(productPage.getProductNameSelector(0)).should('not.exist', products[product_id].name);        
    });


});