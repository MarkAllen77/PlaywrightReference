import {test, expect} from '@playwright/test'
let page

test.beforeEach('Login', async ({browser}) => {    
    //-----How to handle Hooks - beforeEach, afterEach, beforeAll & afterAll----- 
    page = await browser.newPage()

    let pageURL13 = 'https://www.demoblaze.com/'
    await page.goto(pageURL13)

    const loginLink = page.locator('//a[@id="login2"]')
    const loginUsername = page.locator('//input[@id="loginusername"]')
    const loginPassword = page.locator('//input[@id="loginpassword"]')
    const loginLoginButton = page.locator('//button[normalize-space()="Log in"]')

    await loginLink.click()
    await loginUsername.fill('pavanol')
    await loginPassword.fill('test@123')
    await loginLoginButton.click()
})


test.afterEach('Logout', async () => {    
    //-----How to handle Hooks - beforeEach, afterEach, beforeAll & afterAll----- 
    const loginLogoutButton = page.locator('//a[@id="logout2"]')
    await loginLogoutButton.click()

    await page.waitForTimeout(5000)
    //await new Promise(() => {})
})


test('Home Page Test', async () => {    
    //-----How to handle Hooks - beforeEach, afterEach, beforeAll & afterAll-----    
    const productDisplayed = await page.$$('.hrefch')
    expect(productDisplayed).toHaveLength(9)
})


test('Add Product to Cart Test', async ()=> {
    //-----How to handle Hooks - beforeEach, afterEach, beforeAll & afterAll-----    
    const samsungGalaxyS6 = page.locator('//a[normalize-space()="Samsung galaxy s6"]')
    const addToCart = page.locator('//a[normalize-space()="Add to cart"]')

    samsungGalaxyS6.click()
    addToCart.click()
    await page.waitForTimeout(5000)

    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Product added')
        await dialog.accept()
    })
})