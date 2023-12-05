import {test, expect} from '@playwright/test'

// test.describe('Add a simple invoice test', async () => {
//     test.describe.configure({ mode: 'serial' })
    
//     let page
//     test.beforeAll(async ({ browser }) => {
//       page = await browser.newPage();
//     });
//     test.afterAll(async () => {
//         await page.close();
//     });

//     test('Handle Web Objects - Input and Radio', async () => {
//         //-----How to handle Input box & Radio Buttons-----
//         //const pageURL = 'https://demoqa.com/login'
//         let pageURL = 'https://demoqa.com/automation-practice-form'
//         const firstnameInput = page.locator('//input[@id="firstName"]')
//         const lastnameInput = page.locator('//input[@id="lastName"]')

//         await page.goto(pageURL)

//         await expect(firstnameInput).toBeVisible()
//         await expect(firstnameInput).toBeEmpty()
//         await expect(firstnameInput).toBeEditable()
//         await expect(firstnameInput).toBeEnabled()

//         await firstnameInput.fill('John')
//         await lastnameInput.fill('Doe')

//         const genderMaleRadiobutton = page.locator('//label[normalize-space()="Male"]')
//         const genderFemaleRadiobutton = page.locator('//label[normalize-space()="Female"]')

//         await genderMaleRadiobutton.check()
//         await expect(genderMaleRadiobutton).toBeChecked()
//         await expect(genderMaleRadiobutton.isChecked()).toBeTruthy()   

//         await expect(genderFemaleRadiobutton).toBeEnabled()
//         await expect(genderFemaleRadiobutton).not.toBeChecked()
//         //await expect(genderFemaleRadiobutton.isChecked()).toBeFalsy()
//         await expect(await page.locator('//label[normalize-space()="Female"]').isChecked()).toBeFalsy()
//     })


//     test('Handle Web Objects - Checkbox', async () => {    
//         //-----How to handle Single Checkboxes-----
//         //const hobbiesSportsCheckbox = page.locator('//input[@id="hobbies-checkbox-1"]')
//         const hobbiesSportsCheckbox = page.locator('//label[normalize-space()="Sports"]')

//         //const hobbiesReadingCheckbox = page.locator('//input[@id="hobbies-checkbox-2"]')
//         const hobbiesReadingCheckbox = page.locator('//label[normalize-space()="Reading"]')

//         await hobbiesSportsCheckbox.check()
//         await expect(hobbiesSportsCheckbox).toBeChecked()

//         await expect(hobbiesReadingCheckbox).not.toBeChecked()
//         //await expect.soft(hobbiesReadingCheckbox).toBeChecked()
//     })


//     test('Handle Web Objects - Multi Checkbox', async () => {
//         //-----How to handle Multiple Checkboxes-----
//         const hobbiesCheckboxes = [ page.locator('//label[normalize-space()="Sports"]'),
//                                     page.locator('//label[normalize-space()="Reading"]'), 
//                                     page.locator('//label[normalize-space()="Music"]')
//                                     ]
//         for (const box of hobbiesCheckboxes) 
//         {
//             //check will select the checkbox, click will select or unselect
//             await box.click()
//         }
//     })


//     test('Handle Web Objects - Dropdown', async () => {    
//         //-----How to handle Dropdown-----
//         const pageURL2 = 'https://testautomationpractice.blogspot.com/'
//         const countryDropdown = page.locator('#country')

//         await page.goto(pageURL2)

//         //commands to select options
//         await countryDropdown.selectOption({label:'Japan'})
//         await page.waitForTimeout(200)

//         await countryDropdown.selectOption('United States')
//         await page.waitForTimeout(200)

//         await countryDropdown.selectOption({value: 'uk'})
//         await page.waitForTimeout(200)

//         await countryDropdown.selectOption({index: 8})
//         await page.waitForTimeout(200)

//         //assertions
//         const options1 = await page.locator('#country option')
//         await expect(options1).toHaveCount(10)

//         const options2 = await page.$$('#country option')
//         console.log('Number of options: ', options2.length)
//         await expect(options2.length).toBe(10)

//         const content = await countryDropdown.textContent()
//         await expect(content.includes('Australia')).toBeTruthy()

//         let status = false
//         for (const option of options2)
//         {
//             const value = await option.textContent()
//             console.log(value)
//             if (value.includes('France'))
//             {
//                 status = true
//                 break
//             }
//         }
//         expect(status).toBeTruthy()

//         for (const option of options2)
//         {
//             const value = await option.textContent()
//             if (value.includes('China'))
//             {
//                 await page.selectOption('#country', option)
//                 break
//             }
//         }
//     })


//     test('Handle Web Objects - Multi Dropdown', async () => {
//         //-----How to handle Multiple select Dropdown-----
//         const pageURL2 = 'https://testautomationpractice.blogspot.com/'
//         const colorsMultiDropdown = page.locator('#colors')

//         await page.goto(pageURL2)

//         //await page.selectOption('#colors', ['Blue', 'Red', 'Yellow'])
//         await colorsMultiDropdown.scrollIntoViewIfNeeded()
//         await colorsMultiDropdown.selectOption(['Blue', 'Red', 'Yellow'])

//         //assertions
//         const multiOptions1 = await page.locator('#colors option')
//         await expect(multiOptions1).toHaveCount(5)

//         const multiOptions2 = await page.$$('#colors option')
//         console.log('Number of Multi Options: ', multiOptions2.length)
//         await expect(multiOptions2.length).toBe(5)

//         const multiOptionContent = await page.locator('#colors').textContent()
//         await expect(multiOptionContent.includes('Blue')).toBeTruthy() 
//     })


//     test('Handle Web Objects - Bootstrap Dropdown', async () => {
//         //-----How to handle Bootstrap Multiple select Dropdown-----
//         const pageURL3 = 'https://www.jquery-az.com/boots/demo.php?ex=63.0_2'
//         const bootstrapDropdown = page.locator('.multiselect')
//         const bootstrapDropdownOptions = page.locator('ul> li label input')

//         await page.goto(pageURL3)

//         await bootstrapDropdown.click()
//         await expect (bootstrapDropdownOptions).toHaveCount(11)

//         const bootstrapDropdownOptionsList = await page.$$('ul> li label input')
//         await expect(bootstrapDropdownOptionsList.length).toBe(11)

//         const bootstrapDropdownOptions2 = await page.$$('ul> li label')
//         for (let option of bootstrapDropdownOptions2)
//         {
//             const value = await option.textContent()
//             console.log("Value is: ", value)
//             if (value.includes('Angular') || value.includes('Java'))
//             {
//                 await option.click()
//             }

//             if (value.includes('HTML') || value.includes('CSS'))
//             {
//                 await option.click()
//             }
//         }
//     })

// })

test('Handle Web Objects', async ({page}) => {    
    //-----How to handle Dropdown auto suggestions-----
    const pageURL4 = 'https://www.redbus.in/'
    const autoDropdown = page.locator('//input[@id="src"]')
    const autoDropdownOptions = page.waitForSelector('//li[contains(@class,"sc-iwsKbI")]/div/text[1]')

    await page.goto(pageURL4)

    await autoDropdown.fill('Delhi')
    await autoDropdownOptions
    const autoOptions = await page.$$('//li[contains(@class,"sc-iwsKbI")]/div/text[1]')

    for (let option of autoOptions)
    {
        const value = await option.textContent()
        console.log(value)

        if (value.includes('RK Ashram'))
        {
            await option.click()
            break;
        }
    }

    await page.waitForTimeout(5000)

})


// test('Handle', async () => {
    


// })
