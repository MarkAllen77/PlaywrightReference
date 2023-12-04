import {test, expect} from '@playwright/test'

test('Handle Web Objects', async ({page}) => {
    // //-----How to handle Input box & Radio Buttons-----
    // //const pageURL = 'https://demoqa.com/login'
    // let pageURL = 'https://demoqa.com/automation-practice-form'
    // const firstnameInput = page.locator('//input[@id="firstName"]')
    // const lastnameInput = page.locator('//input[@id="lastName"]')

    // await page.goto(pageURL)

    // await expect(firstnameInput).toBeVisible()
    // await expect(firstnameInput).toBeEmpty()
    // await expect(firstnameInput).toBeEditable()
    // await expect(firstnameInput).toBeEnabled()

    // await firstnameInput.fill('John')
    // await lastnameInput.fill('Doe')

    // const genderMaleRadiobutton = page.locator('//label[normalize-space()="Male"]')
    // const genderFemaleRadiobutton = page.locator('//label[normalize-space()="Female"]')

    // await genderMaleRadiobutton.check()
    // await expect(genderMaleRadiobutton).toBeChecked()
    // await expect(genderMaleRadiobutton.isChecked()).toBeTruthy()   

    // await expect(genderFemaleRadiobutton).toBeEnabled()
    // await expect(genderFemaleRadiobutton).not.toBeChecked()
    // //await expect(genderFemaleRadiobutton.isChecked()).toBeFalsy()
    // await expect(await page.locator('//label[normalize-space()="Female"]').isChecked()).toBeFalsy()


    // //-----How to handle Single Checkboxes-----
    // //const hobbiesSportsCheckbox = page.locator('//input[@id="hobbies-checkbox-1"]')
    // const hobbiesSportsCheckbox = page.locator('//label[normalize-space()="Sports"]')

    // //const hobbiesReadingCheckbox = page.locator('//input[@id="hobbies-checkbox-2"]')
    // const hobbiesReadingCheckbox = page.locator('//label[normalize-space()="Reading"]')

    // await hobbiesSportsCheckbox.check()
    // await expect(hobbiesSportsCheckbox).toBeChecked()

    // await expect(hobbiesReadingCheckbox).not.toBeChecked()
    // //await expect.soft(hobbiesReadingCheckbox).toBeChecked()


    // //-----How to handle Multiple Checkboxes-----
    // const hobbiesCheckboxes = [ page.locator('//label[normalize-space()="Sports"]'),
    //                             page.locator('//label[normalize-space()="Reading"]'), 
    //                             page.locator('//label[normalize-space()="Music"]')
    //                             ]
    // for (const box of hobbiesCheckboxes) 
    // {
    //     //check will select the checkbox, click will select or unselect
    //     await box.click()
    // }


    // //-----How to handle Dropdown-----
    // const pageURL = 'https://testautomationpractice.blogspot.com/'
    // const countryDropdown = page.locator('#country')

    // await page.goto(pageURL)

    // //commands to select options
    // await countryDropdown.selectOption({label:'Japan'})
    // await page.waitForTimeout(2000)

    // await countryDropdown.selectOption('United States')
    // await page.waitForTimeout(2000)

    // await countryDropdown.selectOption({value: 'uk'})
    // await page.waitForTimeout(2000)

    // await countryDropdown.selectOption({index: 8})
    // await page.waitForTimeout(2000)

    // //assertions
    // const options1 = await page.locator('#country option')
    // await expect(options1).toHaveCount(10)

    // const options2 = await page.$$('#country option')
    // console.log('Number of options: ', options2.length)
    // await expect(options2.length).toBe(10)

    // const content = await countryDropdown.textContent()
    // await expect(content.includes('Australia')).toBeTruthy()

    // let status = false
    // for (const option of options2)
    // {
    //     const value = await option.textContent()
    //     console.log(value)
    //     if (value.includes('France'))
    //     {
    //         status = true
    //         break
    //     }
    // }
    // expect(status).toBeTruthy()

    // for (const option of options2)
    // {
    //     const value = await option.textContent()
    //     if (value.includes('China'))
    //     {
    //         await page.selectOption('#country', option)
    //         break
    //     }
    // }


    //-----How to handle Multiple select Dropdown-----
    const pageURL = 'https://testautomationpractice.blogspot.com/'
    const colorsMultiDropdown = page.locator('#colors')

    await page.goto(pageURL)

    //await page.selectOption('#colors', ['Blue', 'Red', 'Yellow'])
    await colorsMultiDropdown.scrollIntoViewIfNeeded()
    await colorsMultiDropdown.selectOption(['Blue', 'Red', 'Yellow'])

    //assertions
    const multiOptions1 = await page.locator('#colors option')
    await expect(multiOptions1).toHaveCount(5)

    const multiOptions2 = await page.$$('#colors option')
    console.log('Number of Multi Options: ', multiOptions2.length)
    await expect(multiOptions2.length).toBe(5)

    const multiOptionContent = await page.locator('#colors').textContent()
    await expect(multiOptionContent.includes('Blue')).toBeTruthy() 

    await page.waitForTimeout(5000)

})

test('Handle', async ({page}) => {
    


})
