import {test, expect} from '@playwright/test'

test('Test Title1@fast', async({page}) => {
    console.log('Test 1')
    await page.goto('https://www.demoblaze.com/index.html')
    await expect(page).toHaveTitle('STORE')
})

test('Test Title2@reg', async({page}) => {
    console.log('Test 2')
    await page.goto('https://demo.opencart.com/')
    await expect(page).toHaveTitle('Your Store')
})

test('Test Title3@fast', async({page}) => {
    console.log('Test 3')
    await page.goto('https://demo.nopcommerce.com/')
    await expect(page).toHaveTitle('nopCommerce demo store')
})

test('Test Title4@reg', async({page}) => {
    console.log('Test 4')
})

test('Test Title5@fast@reg', async({page}) => {
    console.log('Test 5')
})

test('Test Title6@slow', async({page}) => {
    console.log('Test 6')
})

test('Test Title7@slow', async({page, browserName}) => {
    if (browserName === 'firefox')
    {   
        test.skip()
    }

    console.log('Test 7')
})

test.fixme('Test Title8@slow', async({page, browserName}) => {
    console.log('Test 8')
})