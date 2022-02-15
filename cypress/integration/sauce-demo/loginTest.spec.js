describe('Login test', () => {

    it('navigate to login screen', () => {
        cy.visit('https://saucedemo.com')
        cy.get('[data-test="login-button"]').should('have.value', 'Login')
    })

    it('click login without inputting username or password', () => {
        cy.get('[data-test="login-button"]').should('have.value', 'Login').click()
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required')
    })

    it('input invalid username and invalid password', () => {
       cy.get('[data-test="username"]').type('unusual_user')
       cy.get('[data-test="password"]').type('public_sauce')
       cy.get('[data-test="login-button"]').click()
       cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
       cy.get('[data-test="username"]').clear('unusual_user')
       cy.get('[data-test="password"]').clear('public_sauce')
    })   

    it('input valid username and invalid password', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('public_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
        cy.get('[data-test="username"]').clear('standard_user')
        cy.get('[data-test="password"]').clear('public_sauce')
    })

    it('input invalid username and valid password', () => {
        cy.get('[data-test="username"]').type('unusual_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
        cy.get('[data-test="username"]').clear('unusual_user')
        cy.get('[data-test="password"]').clear('secret_sauce')
    })

    it('input valid username and valid password', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.wait(2000)
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('have.text', 'Add to cart')
        cy.get('[id="react-burger-menu-btn"]').should('have.text', 'Open Menu')
        cy.get('[id="shopping_cart_container"]').should('be.visible')
    })

})