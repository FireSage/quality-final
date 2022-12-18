# Saucedemo.com test automation

This project contains automated tests for the [Quality Store]https://ui-automation-camp.vercel.app/ e-commerce website.
Test coverage includes:  
authentication
add-to-cart
cart
product-gallery-home-page
product-details
checkout
filter-and-sort
search
contact


## Setup
Clone the repository
Open the folder in your shell (such as bash or power shell)
Run 
```bash
npm install 
``` 
to install dependencies

## Testing
Run 
```bash
npx cypress run
```
to run all tests


To run individual test suites
```bash
npx cypress run test --spec ".\cypress\e2e\tests\[filename]"
```
e.g.

for login
```bash
    npx cypress run --spec ".\cypress\e2e\tests\Login.cy.js"
```

for sorting
```bash
    npx cypress run --spec ".\cypress\e2e\test\filter-and-sort.cy.js"
````

for Add to cart
```bash
    npx cypress run --spec ".\cypress\e2e\test\add-to-cart.cy.js"
```

for checkout
```bash
    npx cypress run --spec ".\cypress\e2e\test\checkout.cy.js"
```

## Cross-browser testing
The project is configured for cross browser testing. Tests run in Google Chrome by default but changing this to run in other browsers or multiple browsers is simple. User the '--browser' argument when running the test:
```bash
npx cypress run --browser [browser name]
``` 
e.g. 
```bash
npx cypress run --browser firefox
```

## Testing with Random Products
Shopping cart checkout is tested with ramdom products. A randdom index is generated and used to select a product/(s) from the products list for each test.

## MochaAwesome reporter
The project is configgured to work with the MochaAwesome reporter. 
to user the reporter add the "--reporter mochawesome" argument. For example:
```bash
    npx cypress run --reporter mochawesome
```

```bash
    npx cypress run --spec ".\cypress\e2e\test\checkout.cy.js" --reporter mochawesome
```