import {test, expect} from '@playwright/test'
import {chromium} from '@playwright/test'
let page

test.describe('Serial execution of test', async () => {
    test.describe.configure({ mode: 'serial' })
    
    let page
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });
    test.afterAll(async () => {
        await page.close();
    });


    test('Handle Web Objects - Input and Radio', async ({page}) => {
        //-----How to handle Input box & Radio Buttons-----
        //const pageURL = 'https://demoqa.com/login'
        //test.setTimeout(120000)

        let pageURL = 'https://demoqa.com/automation-practice-form'

        await page.goto(pageURL)

        const firstnameInput = page.locator('//input[@id="firstName"]')
        const lastnameInput = page.locator('//input[@id="lastName"]')

        await expect(firstnameInput).toBeVisible()
        await expect(firstnameInput).toBeEmpty()
        await expect(firstnameInput).toBeEditable()
        //await expect(firstnameInput).toBeEnabled()

        await firstnameInput.fill('John')
        await lastnameInput.fill('Doe')

        const genderMaleRadiobutton = page.locator('//label[normalize-space()="Male"]')
        const genderFemaleRadiobutton = page.locator('//label[normalize-space()="Female"]')

        await genderMaleRadiobutton.check()
        await expect(genderMaleRadiobutton).toBeChecked()
        await expect(genderMaleRadiobutton.isChecked()).toBeTruthy()   

        await expect(genderFemaleRadiobutton).toBeEnabled()
        await expect(genderFemaleRadiobutton).not.toBeChecked()
        //await expect(genderFemaleRadiobutton.isChecked()).toBeFalsy()
        await expect(await page.locator('//label[normalize-space()="Female"]').isChecked()).toBeFalsy()

        //-----How to handle Single Checkboxes-----
        //const hobbiesSportsCheckbox = page.locator('//input[@id="hobbies-checkbox-1"]')
        const hobbiesSportsCheckbox = page.locator('//label[normalize-space()="Sports"]')

        //const hobbiesReadingCheckbox = page.locator('//input[@id="hobbies-checkbox-2"]')
        const hobbiesReadingCheckbox = page.locator('//label[normalize-space()="Reading"]')

        await hobbiesSportsCheckbox.check()
        await expect(hobbiesSportsCheckbox).toBeChecked()

        await expect(hobbiesReadingCheckbox).not.toBeChecked()
        //await expect.soft(hobbiesReadingCheckbox).toBeChecked()

        //-----How to handle Multiple Checkboxes-----
        const hobbiesCheckboxes = [ page.locator('//label[normalize-space()="Sports"]'),
                                    page.locator('//label[normalize-space()="Reading"]'), 
                                    page.locator('//label[normalize-space()="Music"]')
                                    ]
        for (const box of hobbiesCheckboxes) 
        {
            //check will select the checkbox, click will select or unselect
            await box.click()
        }
    })        


    test('Handle Web Objects - Dropdown', async ({page}) => {    
        //-----How to handle Dropdown-----
        const pageURL2 = 'https://testautomationpractice.blogspot.com/'
        const countryDropdown = page.locator('#country')

        await page.goto(pageURL2)

        //commands to select options
        await countryDropdown.selectOption({label:'Japan'})
        await page.waitForTimeout(200)

        await countryDropdown.selectOption('United States')
        await page.waitForTimeout(200)

        await countryDropdown.selectOption({value: 'uk'})
        await page.waitForTimeout(200)

        await countryDropdown.selectOption({index: 8})
        await page.waitForTimeout(200)

        //assertions
        const options1 = await page.locator('#country option')
        await expect(options1).toHaveCount(10)

        const options2 = await page.$$('#country option')
        console.log('Number of options: ', options2.length)
        await expect(options2.length).toBe(10)

        const content = await countryDropdown.textContent()
        await expect(content.includes('Australia')).toBeTruthy()

        let status = false
        for (const option of options2)
        {
            const value = await option.textContent()
            console.log(value)
            if (value.includes('France'))
            {
                status = true
                break
            }
        }
        expect(status).toBeTruthy()

        for (const option of options2)
        {
            const value = await option.textContent()
            if (value.includes('China'))
            {
                await page.selectOption('#country', option)
                break
            }
        }
    })


    test('Handle Web Objects - Multi Dropdown', async ({page}) => {
        //-----How to handle Multiple select Dropdown-----
        const pageURL2 = 'https://testautomationpractice.blogspot.com/'
        const colorsMultiDropdown = page.locator('#colors')

        await page.goto(pageURL2)

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
    })


    test('Handle Web Objects - Bootstrap Dropdown', async ({page}) => {
        //-----How to handle Bootstrap Multiple select Dropdown-----
        const pageURL3 = 'https://www.jquery-az.com/boots/demo.php?ex=63.0_2'
        const bootstrapDropdown = page.locator('.multiselect')
        const bootstrapDropdownOptions = page.locator('ul> li label input')

        await page.goto(pageURL3)

        await bootstrapDropdown.click()
        await expect (bootstrapDropdownOptions).toHaveCount(11)

        const bootstrapDropdownOptionsList = await page.$$('ul> li label input')
        await expect(bootstrapDropdownOptionsList.length).toBe(11)

        const bootstrapDropdownOptions2 = await page.$$('ul> li label')
        for (let option of bootstrapDropdownOptions2)
        {
            const value = await option.textContent()
            console.log("Value is: ", value)
            if (value.includes('Angular') || value.includes('Java'))
            {
                await option.click()
            }

            if (value.includes('HTML') || value.includes('CSS'))
            {
                await option.click()
            }
        }
    })


    test('Handle Web Objects - Dropdown auto suggestions', async ({page}) => {
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
    })


    test('Handle Web Objects - Hidden Items in Dropdown', async ({page}) => {
        //-----How to handle Hidden Items in Dropdown-----
        const pageURL5 = 'https://opensource-demo.orangehrmlive.com/'
        //const autoDropdown = page.locator('//input[@id="src"]')

        await page.goto(pageURL5)

        await page.locator('[name="username"]').fill('Admin')
        await page.locator('[name="password"]').fill('admin123')
        await page.locator('[type="submit"]').click()
    })


    test('Handle Web Objects - Dialogs or Alerts', async ({page}) => {
        //-----How to handle Dialogs or Alerts-----
        const pageURL6 = 'https://testautomationpractice.blogspot.com/'

        const alertButton = page.locator('//button[normalize-space()="Alert"]')
        const confirmBoxButton = page.locator('//button[normalize-space()="Confirm Box"]')
        const promptButton = page.locator('//button[normalize-space()="Prompt"]')

        await page.goto(pageURL6)

        //Handle alert dialog
        // page.on('dialog', async dialog => {
        //     expect(dialog.type()).toContain('alert')
        //     expect(dialog.message()).toContain('I am an alert box')

        //     await page.waitForTimeout(3000)
        //     await dialog.accept()
        // })
        // await alertButton.click()

        // await page.waitForTimeout(5000)

        //Handle confirm dialog
        // page.on('dialog', async dialog => {
        //     expect(dialog.type()).toContain('confirm')
        //     expect(dialog.message()).toContain('Press a button')

        //     await page.waitForTimeout(2000)
        //     //await dialog.dismiss()
        //     await dialog.accept()
        // })
        // await confirmBoxButton.click()
        // await expect(page.locator('//p[@id="demo"]')).toHaveText('You pressed OK!')

        // await page.waitForTimeout(5000)

        //Handle prompt dialog
        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('prompt')
            expect(dialog.message()).toContain('Please enter your name')
            expect(dialog.defaultValue()).toContain('Harry Potter')

            await page.waitForTimeout(2000)

            await dialog.accept('John')
        })
        await promptButton.click()
        await expect(page.locator('//p[@id="demo"]')).toHaveText('Hello John! How are you today?')
    })


    test('Handle Web Objects - Frames/iFrames', async ({page}) => {
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
    })


    test('Handle Web Objects - WebTable/Pagination', async ({page}) => {
        //-----How to handle WebTable/Pagination-----
        const pageURL8 = 'https://testautomationpractice.blogspot.com/'
        await page.goto(pageURL8)

        const tablescrollIntoViewIfNeeded = await page.locator('#productTable').scrollIntoViewIfNeeded()
        const table = await page.locator('#productTable')

        //count rows and columns
        const columns = await table.locator('thead tr th')
        const rows = await table.locator('tbody tr')

        console.log('Number of columns: ', await columns.count())
        console.log('Number of rows: ', await rows.count())
        expect(await columns.count()).toBe(4)
        expect(await rows.count()).toBe(5)

        //select checkbox
        const productName = 'Product 1'
        const matchedRow = rows.filter({
            has: page.locator('td'),
            hasText: productName
        })
        await matchedRow.locator('input').check()

        //select mulitple checkbox
        await selectProduct(rows, page, 'Product 3')
        await selectProduct(rows, page, 'Product 4')
        await selectProduct(rows, page, 'Product 5')

        //retrieve all product details
        for (let x=0; x < await rows.count(); x++)
        {
            const row = rows.nth(x)
            const td = row.locator('td')

            let productNameData = ""

            for (let y=0; y < await td.count()-1; y++)
            {
                let columnData = await td.nth(y).textContent()
                productNameData = productNameData + columnData + " "
            }   
            console.log(productNameData) 
        }

        //retrieve all product details from all pages
        const pages = await page.locator('.pagination li a')
        console.log('Number of pages: ', await pages.count())

        for (let p=0; p < await pages.count(); p++)
        {
            if (p > 0)
            {
                await pages.nth(p).click()
            }
            for (let x=0; x < await rows.count(); x++)
            {
                const row = rows.nth(x)
                const td = row.locator('td')

                let productNameData = ""

                for (let y=0; y < await td.count()-1; y++)
                {
                    let columnData = await td.nth(y).textContent()
                    productNameData = productNameData + columnData + " "
                }   
                console.log(productNameData) 
            }
        }
    })


    test('Handle Web Objects - Date Pickers', async ({page}) => {    
        //-----How to handle Date Pickers/Calendars-----
        const pageURL9 = 'https://testautomationpractice.blogspot.com/'
        await page.goto(pageURL9)
    
        const datePicker = page.locator('//input[@id="datepicker"]')
    
        //direct type date
        await datePicker.scrollIntoViewIfNeeded()
        await datePicker.click()
        await datePicker.pressSequentially('12/12/2023')
    
        //using date picker
        const dateString  = '3/15/2024'
        const dateStringSplit = dateString.split('/')
        const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
        const month = monthName[dateStringSplit[0]-1]
        const day = dateStringSplit[1]
        const year = dateStringSplit[2]
    
        await datePicker.click()
    
        while(true)
        {
            const displayedYear = await page.locator('.ui-datepicker-year').textContent()
            const displayedMonth = await page.locator('.ui-datepicker-month').textContent()
    
            if(displayedYear == year && displayedMonth == month)
            {
                break;
            }
    
            await page.locator('[title="Next"]').click()
        }
    
        // //take all the dates and select specific
        // const dates = await page.$$('//a[@class="ui-state-default"]')
        // for (const date of dates)
        // {
        //     if (await date.textContent() == day)
        //     {
        //         await date.click()
        //         break;
        //     }
        //     console.log(await date.textContent())
        // }
    
        //select specific date
        await page.click(`//a[@class='ui-state-default'][text()='${day}']`)   
    })


    test('Handle Web Objects - Mouse Actions', async ({page}) => {    
        //-----How to handle Mouse Hover-----
        let pageURL10 = 'https://demo.opencart.com/'
        await page.goto(pageURL10)

        const menuDesktops = page.locator('//a[normalize-space()="Desktops"]')
        const subDesktopsMac = page.locator('//a[normalize-space()="Mac (1)"]')

        await menuDesktops.hover()
        await subDesktopsMac.hover()


        //-----How to handle Mouse Right Click-----
        pageURL10 = 'https://swisnl.github.io/jQuery-contextMenu/demo.html'
        await page.goto(pageURL10)
        
        const buttonRightClick = page.locator('//span[@class="context-menu-one btn btn-neutral"]')
        await buttonRightClick.click({button:'right'})

        const pasteContext = page.locator('//span[normalize-space()="Paste"]')
        await pasteContext.hover()


        //-----How to handle Mouse Double Click-----
        pageURL10 = 'https://testautomationpractice.blogspot.com/'
        await page.goto(pageURL10)
        
        const buttonDoubleClick = page.locator('//button[normalize-space()="Copy Text"]')
        await buttonDoubleClick.dblclick()

        const field1 = page.locator('#field1').inputValue()
        console.log("Text is: ", await field1)

        const field2 = page.locator('#field2')
        await expect(field2).toHaveValue(await field1)

        //-----How to handle Mouse Drag and Drop-----
        pageURL10 = 'https://testautomationpractice.blogspot.com/'
        await page.goto(pageURL10)

        const draggable = page.locator('//div[@id="draggable"]')
        const droppable = page.locator('//div[@id="droppable"]')

        await draggable.dragTo(droppable)

        //      -or-

        // await draggable.hover()
        // await page.mouse.down()

        // await droppable.hover()
        // await page.mouse.up()
    })


    test('Handle Web Objects - Keyboard Actions', async ({page}) => {    
        //-----How to handle Keyboard Actions-----
        let pageURL11 = 'https://gotranscript.com/text-compare/'
        await page.goto(pageURL11)

        const fromTextArea = page.locator('//textarea[@name="text1"]')
        const toTextArea = page.locator('//textarea[@name="text2"]')
        const buttonCompare = page.locator('//button[@id="recaptcha"]')

        await fromTextArea.fill('Hello World was here')
        await fromTextArea.click()
        await fromTextArea.press('Control+A')
        await fromTextArea.press('Control+C')

        await toTextArea.click()
        await page.keyboard.press('Control+V')

        await buttonCompare.click()
    })


    test('Handle Web Objects - Upload files', async ({page}) => {    
        //-----How to handle upload files-----
        test.setTimeout(120000);
        
        let pageURL12 = 'https://www.foundit.in/'
        await page.goto(pageURL12)

        await page.waitForSelector('//i[@class="mqfihd-upload"]')

        //upload single file
        const uploadButton = page.locator('//i[@class="mqfihd-upload"]')
        const windowsUpload = page.locator('//input[@id="file-upload"]')

        await uploadButton.click()
        await windowsUpload.setInputFiles('C:/Temp/sample1.txt')

        //upload mulitple file
        pageURL12 = 'https://davidwalsh.name/demo/multiple-file-upload.php'
        await page.goto(pageURL12)

        expect (await page.locator('#fileList li:nth-child(1)')).toHaveText('No Files Selected')        

        const filesToUploadButton = page.locator('//input[@id="filesToUpload"]')
        await filesToUploadButton.setInputFiles(['C:/Temp/sample1.txt','C:/Temp/sample2.txt'])

        await page.waitForTimeout(3000)
        expect (await page.locator('#fileList li:nth-child(1)')).toHaveText('sample1.txt')
        expect (await page.locator('#fileList li:nth-child(2)')).toHaveText('sample2.txt')
    })


    test('Handle Web Objects - Pages and Window', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
    
        const page1 = await context.newPage()
        const page2 = await context.newPage()
    
        const allPages = context.pages()
    
        console.log('Pages: ', allPages.length)
    
        await page1.goto('https://opensource-demo.orangehrmlive.com/')
        await expect (page1).toHaveTitle('OrangeHRM')
    
        await page2.goto('https://www.orangehrm.com/')
        await expect (page2).toHaveTitle('OrangeHRM HR Software | OrangeHRM')
    })
    
    
    test('Handle Web Objects - Multiple Pages and Window', async () => {
        const browser = await chromium.launch()
        const context = await browser.newContext()
    
        const page1 = await context.newPage()
        await page1.goto('https://opensource-demo.orangehrmlive.com/')
        await expect (page1).toHaveTitle('OrangeHRM')
    
        const pagePromise = context.waitForEvent('page')
        await page1.locator('//a[normalize-space()="OrangeHRM, Inc"]').click()
    
        const newPage = await pagePromise
        await expect (newPage).toHaveTitle('OrangeHRM HR Software | OrangeHRM')
    
        await newPage.locator('//input[@id="Form_submitForm_EmailHomePage"]').fill('sample text')
    
        await page1.bringToFront()
        await page1.locator('//input[@placeholder="Username"]').fill('username123')
      
        await page1.waitForTimeout(3000)
        // await new Promise(() => {})
    })
})

async function selectProduct(rows, page, productName)
{
    const matchedRow = rows.filter({
        has: page.locator('td'),
        hasText: productName
    })
    await matchedRow.locator('input').check()
}
