import {test, expect} from '@playwright/test'

// test.describe('Serial execution of test', async () => {
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
    // //-----How to handle Dropdown auto suggestions-----
    // const pageURL4 = 'https://www.redbus.in/'
    // const autoDropdown = page.locator('//input[@id="src"]')
    // const autoDropdownOptions = page.waitForSelector('//li[contains(@class,"sc-iwsKbI")]/div/text[1]')

    // await page.goto(pageURL4)

    // await autoDropdown.fill('Delhi')
    // await autoDropdownOptions
    // const autoOptions = await page.$$('//li[contains(@class,"sc-iwsKbI")]/div/text[1]')

    // for (let option of autoOptions)
    // {
    //     const value = await option.textContent()
    //     console.log(value)

    //     if (value.includes('RK Ashram'))
    //     {
    //         await option.click()
    //         break;
    //     }
    // }


    // //-----How to handle Hidden Items in Dropdown-----
    // const pageURL5 = 'https://opensource-demo.orangehrmlive.com/'
    // //const autoDropdown = page.locator('//input[@id="src"]')

    // await page.goto(pageURL5)

    // await page.locator('[name="username"]').fill('Admin')
    // await page.locator('[name="password"]').fill('admin123')
    // await page.locator('[type="submit"]').click()


    // //-----How to handle Dialogs or Alerts-----
    // const pageURL6 = 'https://testautomationpractice.blogspot.com/'

    // const alertButton = page.locator('//button[normalize-space()="Alert"]')
    // const confirmBoxButton = page.locator('//button[normalize-space()="Confirm Box"]')
    // const promptButton = page.locator('//button[normalize-space()="Prompt"]')

    // await page.goto(pageURL6)

    // //Handle alert dialog
    // // page.on('dialog', async dialog => {
    // //     expect(dialog.type()).toContain('alert')
    // //     expect(dialog.message()).toContain('I am an alert box')

    // //     await page.waitForTimeout(3000)
    // //     await dialog.accept()
    // // })
    // // await alertButton.click()

    // // await page.waitForTimeout(5000)

    // //Handle confirm dialog
    // // page.on('dialog', async dialog => {
    // //     expect(dialog.type()).toContain('confirm')
    // //     expect(dialog.message()).toContain('Press a button')

    // //     await page.waitForTimeout(2000)
    // //     //await dialog.dismiss()
    // //     await dialog.accept()
    // // })
    // // await confirmBoxButton.click()
    // // await expect(page.locator('//p[@id="demo"]')).toHaveText('You pressed OK!')

    // // await page.waitForTimeout(5000)

    // //Handle prompt dialog
    // page.on('dialog', async dialog => {
    //     expect(dialog.type()).toContain('prompt')
    //     expect(dialog.message()).toContain('Please enter your name')
    //     expect(dialog.defaultValue()).toContain('Harry Potter')

    //     await page.waitForTimeout(2000)

    //     await dialog.accept('John')
    // })
    // await promptButton.click()
    // await expect(page.locator('//p[@id="demo"]')).toHaveText('Hello John! How are you today?')


    //-----How to handle Frames/iFrames-----
    const pageURL7 = 'https://ui.vision/demo/webtest/frames/'

    await page.goto(pageURL7)
    page.waitForLoadState('domcontentloaded')

    //total frames
    const allframes = await page.frames()
    console.log("Number of frames: ", allframes.length)

    //approach 1: using name or url
    const frame1 = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1.html'})
    await frame1.fill('//input[@name="mytext1"]','Hello')

    //approach 2: using frame locator
    const frame3TextBox = await page.frameLocator('frame[src="frame_3.html"]').locator('//input[@name="mytext3"]')
    frame3TextBox.fill('Frame3')

    //-----How to handle Inner / Nested Frames-----
    const frame3 = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'})

    const childFrames = await frame3.childFrames()

    await childFrames[0].locator('//*[@id="i5"]/div[3]/div').check()

    await page.waitForTimeout(5000)

})


// test('Handle', async () => {
    


// })
