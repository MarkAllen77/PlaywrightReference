import {test, expect} from '@playwright/test'
let page

test.beforeAll('Login', async ({browser}) => {    
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


test.afterAll('Logout', async () => {    
    //-----How to handle Hooks - beforeEach, afterEach, beforeAll & afterAll----- 
    const loginLogoutButton = page.locator('//a[@id="logout2"]')
    await loginLogoutButton.click()

    await page.waitForTimeout(3000)
    //await new Promise(() => {})
})


test('Home Page Test', async () => {    
    //-----How to handle Hooks - beforeEach, afterEach, beforeAll & afterAll----- 
    await page.waitForTimeout(3000)

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


test.describe('Group 1', async ()=> {
    test('Test 1', async ()=> {
        console.log('Test 1')
    })
    
    test('Test 2', async ()=> {
        console.log('Test 2')
    })    
})

test.describe('Group 2', async ()=> {
    test('Test 3', async ()=> {
        console.log('Test 3')
    })
    
    test('Test 4', async ()=> {
        console.log('Test 4')
    })
})

test.describe('Group 3', async ()=> {
    test('Screen Capture', async ()=> {
        const today = new Date()
        const yyyy = today.getFullYear()
        let MM = today.getMonth() + 1
        let dd = today.getDate()
        let hh = today.getHours()
        let mm = today.getMinutes()
        let ss = today.getSeconds()

        if (dd < 10) dd = '0' + dd;
        if (MM < 10) MM = '0' + MM;

        let newURL = 'https://demo.opencart.com/'
        await page.goto(newURL)

        const formattedToday = MM + dd + yyyy + '_' + hh + mm + ss;

        //page screenshot
        await page.screenshot({path:'tests/screenshots/page_'+ formattedToday +'.png'})

        //fullpage screenshot
        await page.screenshot({path:'tests/screenshots/full_'+ formattedToday +'.png', fullPage: true})

        //element screenshot
        const elementTarget = page.locator('//*[@id="content"]/div[2]/div[1]/form/div')
        await elementTarget.screenshot({path:'tests/screenshots/element_'+ formattedToday +'.png'})

        await page.goBack();
    })
})

