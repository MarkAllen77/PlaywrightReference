const { test, expect } = require('@playwright/test')

test.describe('Multiple test', () => {

    test('AssertionsTest', async ({page}) => {
        //open app url
        await page.goto('https://demo.nopcommerce.com/register')
        
        //expect(page).toHaveURL()   			Page has URL
        await expect(page).toHaveURL('https://demo.nopcommerce.com/register')

        //expect(page).toHaveTitle()   			Page has title
        await expect(page).toHaveTitle('nopCommerce demo store. Register')

        //expect(locator).toBeVisible()  		Element is visible
        const pageLogo = page.locator('//img[@alt="nopCommerce demo store"]')
        await expect(pageLogo).toBeVisible() 

        //expect(locator).toBeEnabled()  		Control is enabled
        const searchTextBox = page.locator('//input[@id="small-searchterms"]')
        await expect(searchTextBox).toBeEnabled

        //expect(locator).toBeChecked()  		Radio/Checkbox is checked
        const genderMaleRadioButton = page.locator('//input[@id="gender-male"]')
        genderMaleRadioButton.click()
        await expect(genderMaleRadioButton).toBeChecked()

        const newsletterCheckBox = page.locator('//input[@id="Newsletter"]')
        await expect(newsletterCheckBox).toBeChecked()

        //expect(locator).toHaveAttribute() 	Element has attribute
        const registerButton = page.locator('//button[@id="register-button"]')
        await expect(registerButton).toHaveAttribute('type','submit')

        //expect(locator).toHaveText()  		Element matches text
        const registerLabel = page.locator('//h1[normalize-space()="Register"]')
        await expect(registerLabel).toHaveText('Register')
        //expect(locator).toContainText()  		Element contains text
        await expect(registerLabel).toContainText('ister')

        //expect(locator).toHaveValue(value) 	Input has a value
        const emailTextBox = page.locator('//input[@id="Email"]')
        await emailTextBox.fill('test@email.com')

        await expect(emailTextBox).toHaveValue('test@email.com')

        //expect(locator).toHaveCount()  		List of elements has given length
        const dobDayDropDown = page.locator('//select[@name="DateOfBirthDay"]//option')
        await expect(dobDayDropDown).toHaveCount(32)
        
        //negative assertions
        await expect(dobDayDropDown).not.toHaveCount(31)

    })

    test('SoftAssertionsTest', async ({page}) => {
        //open app url
        await page.goto('https://www.demoblaze.com/index.html')
        
        //Hard assertions
        await expect(page).toHaveTitle('STORE')
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
        await expect(page.locator('.navbar-brand')).toBeVisible()

        //Soft assertions
        await expect.soft(page).toHaveTitle('STORE123')
        await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html')
        await expect.soft(page.locator('.navbar-brand')).toBeVisible()

    })

})    