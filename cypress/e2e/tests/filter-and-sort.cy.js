import Authentication from '../pages/login.page';
import {test_account} from '../data/users.data';
import { sort } from '../data/search-sort.data.json';
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
        //log in with valid credential
        Authentication.login(test_account.username, test_account.password);
    });

    it('should sort product list from low to high', () => {

        //changing drop down value
        productPage.selectSort(sort['Low to High']);

        //custom sorting function in ascending order
        products.sort((a, b) => {
            return a.price - b.price
        });

        cy.wait(1500);
        //cycling through the elements
        //checking if they are in the same order
        cy.get(productPage.productPriceList).each(($elem, index) => {

            expect($elem.text()).equal(`$${products[index].price}`);
        });
    });

    it('should sort product list from high to low', () => {
        
        //changing drop down value
        productPage.selectSort(sort['High to Low']);

        //custom sorting function in descending order
        products.sort((a, b) => {
            return b.price - a.price
        });

        cy.wait(1500);
        //cycling through the elements
        //checking if they are in the same order
        cy.get(productPage.productPriceList).each(($elem, index) => {

            expect($elem.text()).equal(`$${products[index].price}`);
        });
    });

    it('should sort product list from A-Z', () => {

        //changing drop down value
        productPage.selectSort(sort['A to Z']);

        //custom sorting function in alphabetic order
        products.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        cy.wait(1500);
        //cycling through the elements
        //checking if they are in the same order
        cy.get(productPage.productNameList).each(($elem, index) => {

            expect($elem.text()).equal(products[index].name);
        });
    });

    it('should sort product list from Z-A', () => {

         //changing drop down value
        productPage.selectSort(sort['Z to A']);

        //custom sorting function in reverse alphabetic order
        products.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }

            return 0;
        });
        cy.wait(1500);
        //cycling through the elements
        //checking if they are in the same order
        cy.get(productPage.productNameList).each(($elem, index) => {

            expect($elem.text()).equal(products[index].name);
        })
    });

    it('should be able to reset the products', () => {

        productPage.selectSort(sort['Low to High']);

        //sorting in ascending order
        products.sort((a, b) => {
            return a.price - b.price
        });

        cy.wait(1500);
        //checking if they are in the same order as original array
        cy.get(productPage.productPriceList).each(($elem, index) => {

            expect($elem.text()).equal(`$${products[index].price}`);
        });

        //reset
        cy.get("#reset").click();

        cy.wait(1500);
        //checking if they are in the same order as original array
        cy.get(productPage.productPriceList).each(($elem, index) => {

            expect($elem.text()).equal(`$${products_copy[index].price}`);
        });
    });

});