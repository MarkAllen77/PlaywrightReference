import {test, expect} from '@playwright/test'

// test('Locators', async ({page})=> {
//     await page.goto('https://www.demoblaze.com')

//     //click on log in link - using property
//     await page.click('id=login2')
//     //await page.locator('id=login2').click()

//     //enter username and password - using css
//     //await page.fill('#loginusername','pavanol')
//     //await page.fill("input[id='loginpassword']",'test@123')
//     await page.locator('#loginusername').fill('pavanol')
//     await page.locator("input[id='loginpassword']").fill('test@123')

//     //click log in button - using xpath
//     //await page.locator("//button[normalize-space()='Log in']").click()
//     //await page.click("//button[normalize-space()='Log in']")
//     await page.click("//button[normalize-space()='Log in']")

//     //verify log out link
//     const logoutLink = await page.locator("//a[normalize-space()='Log out']")

//     await expect(logoutLink).toBeVisible()

//     //await page.goto('https://demoqa.com/login')
//     // await page.locator("//input[@id='userName']").fill('blazemeter')
//     // await page.locator("//input[@id='password']").fill('Password@123')
//     // await page.click("//button[@id='login']")
//     // const logoutLink = await page.locator("//div[@class='text-right col-md-5 col-sm-12']//button[@id='submit']")
//     // await expect(logoutLink).toBeVisible()

//     await page.close()
// })

test('Multiple Locators', async ({page})=> {
    await page.goto('https://www.demoblaze.com')

    const elements = await page.$$('a')

    for(const element of elements)
    {
        const linktext = await element.textContent();
        console.log(linktext)
    }

    await page.waitForSelector("//div[@id='tbodyid']//h4/a")
    const products = await page.$$("//div[@id='tbodyid']//h4/a")

    for(const product of products)
    {
        const producttext = await product.textContent();
        console.log(producttext)
    }
})
