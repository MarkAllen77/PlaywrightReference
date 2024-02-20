//import {test, expect} from '@playwright/test'
const { test, expect } = require('@playwright/test')

//none POM setup
// test ('test', async ({page}) => {
//     await page.goto('https://www.demoblaze.com/index.html')
//     await page.locator('#login2').click()
//     await page.locator('#loginusername').fill('pavanol')
//     await page.locator('#loginpassword').fill('test@123')
//     await page.locator('//button[normalize-space()="Log in"]').click()
// })

// import {LoginPage} from './pages/pom2.spec.js'
// import {HomePage} from './pages/pom3.spec.js'
// import {CartPage} from './pages/pom4.spec.js'

const LoginPage = require('./pages/pom2.spec.js')
const HomePage = require('./pages/pom3.spec.js')
const CartPage = require('./pages/pom4.spec.js')

test ('MyTest', async ({page}) => {
    test.setTimeout(0)

    const LoginPageInstance = new LoginPage(page)
    await LoginPageInstance.gotoLoginPage('https://www.demoblaze.com/index.html')
    await LoginPageInstance.login('pavanol','test@123')
    await page.waitForTimeout(3000)

    const HomePageInstance = new HomePage(page)
    await HomePageInstance.addProductToCart('Nexus 6')
    await page.waitForTimeout(3000)
    await HomePageInstance.gotoCart()

    const CartPageInstance = new CartPage(page)
    //await page.waitForTimeout(3000)
    const status = await CartPageInstance.checkProductInCart('Nexus 6')
    expect (await status).toBe(true)

    //await new Promise(() => {})
})