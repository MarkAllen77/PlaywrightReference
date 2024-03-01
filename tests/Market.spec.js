import {test, expect} from '@playwright/test'
import {chromium} from '@playwright/test'
let page, browser
const index = 0
const arrayCompany = []
const arrayBuyOutlook = []

// NOTE: npx playwright test tests/market.spec.js --project chromium

test.describe('Serial execution of test', async () => {
    test.describe.configure({ mode: 'serial' })
    
    let page
    test.beforeAll(async ({ browser }) => {
        browser = await chromium.launch()
        // page = await browser.newPage()
    });
    // test.afterAll(async () => {
    //     await page.close()
    // });


    test('[MARKET ANALYSIS]', async ({page}) => {
        //----- Market Analysis -----
        console.log('--[Start Extraction]--')

        await populateArrayCompany()

        page.on('dialog', async dialog => {
            await dialog.dismiss()
        })

        const today = new Date()
        const yyyy = today.getFullYear()
        let MM = today.getMonth() + 1
        let dd = today.getDate()
        let hh = today.getHours()
        let mm = today.getMinutes()
        let ss = today.getSeconds()

        if (dd < 10) dd = '0' + dd;
        if (MM < 10) MM = '0' + MM;

        const formattedToday = MM + dd + yyyy + '_' + hh + mm + ss;

        const fs = require('fs')
        fs.appendFile('c:\\temp\\Output.txt', '------- '+ formattedToday +' -------\n', (err) => {
            if (err) throw err;
        })

        for (let i=index; i < arrayCompany.length; i++) {
            test.setTimeout(1200000)

            let pageURL = 'https://ph.investing.com/equities/' + arrayCompany[i]
            await page.goto(pageURL, { waitUntil: 'load' })
        
            try {
                const analystsTab = page.locator('//div[text()="Analysts"]')
                await expect(analystsTab).toHaveCount(1)
                await analystsTab.scrollIntoViewIfNeeded()

                await page.locator('//div[text()="Analysts"]').click()

                let analystsTarget = await page.$$('//div[text()="Analysts"]/../../following-sibling::div[1]//div[2]')
                console.log(arrayCompany[i] + ' - Analysts Outlook: ', await analystsTarget[2].textContent())
                arrayBuyOutlook[i] = ('\t - Analysts Outlook: \t' + await analystsTarget[2].textContent())

                let data = arrayCompany[i] + arrayBuyOutlook[i] + '\n'
        
                fs.appendFile('c:\\temp\\Output.txt', data, (err) => {
                    if (err) throw err;
                })
   
            } catch (err) {
                console.log('Analysts Tab Not Available for: ', arrayCompany[i])
                const technicalTab = page.locator('//div[text()="Technical"]')
                await technicalTab.scrollIntoViewIfNeeded()

                let technicalTarget = await page.$$('//div[text()="Technical"]/../following-sibling::div[1]//div[2]')
                console.log(arrayCompany[i] + ' - Technical Outlook: ', await technicalTarget[2].textContent())
                arrayBuyOutlook[i] = ('\t - Technical Outlook: \t' + await technicalTarget[2].textContent())

                let data = arrayCompany[i] + arrayBuyOutlook[i] + '\n'
        
                fs.appendFile('c:\\temp\\Output.txt', data, (err) => {
                    if (err) throw err;
                })
            }
        }

        fs.appendFile('c:\\temp\\Output.txt', '------- '+ formattedToday +' -------\n', (err) => {
            if (err) throw err;
        })

        console.log('--[Extraction Complete]--')
    })    
})

async function populateArrayCompany()
{
    arrayCompany[0] = 'abs-cbn-broad'                           //abs
    arrayCompany[1] = 'ayala-corp'                              //ac
    arrayCompany[2] = 'transasia-oil'                           //acen
    arrayCompany[3] = 'alliance-globa'                          //agi
    arrayCompany[4] = 'ayala-land'                              //ali
    arrayCompany[5] = 'asia-united-ba'                          //aub
    arrayCompany[6] = 'bdo-unibank'                             //bdo
    arrayCompany[7] = 'bloomberry-res'                          //bloom
    arrayCompany[8] = 'bk-of-phi-isla'                          //bpi
    arrayCompany[9] = 'cebu-air-inc'                            //ceb

    arrayCompany[10] = 'century-pacifi'                         //cnpf
    arrayCompany[11] = 'converge-information-communications'    //cnvrg
    arrayCompany[12] = 'dmci-holdings'                          //dmc
    arrayCompany[13] = 'emperador-inc'                          //emi
    arrayCompany[14] = 's-m-pure-foods'                         //fb
    arrayCompany[15] = 'figaro-coffee'                          //fcg
    arrayCompany[16] = 'globe-telecom'                          //glo
    arrayCompany[17] = 'gma-network'                            //gma7
    arrayCompany[18] = 'gt-capital-hol'                         //gtcap
    arrayCompany[19] = 'intl-container'                         //ict

    arrayCompany[20] = 'jollibee-foods'                         //jfc
    arrayCompany[21] = 'jg-summit'                              //jgs
    arrayCompany[22] = 'da-vinci-capit'                         //keepr
    arrayCompany[23] = 'lodestar-hldgs'                         //lode
    arrayCompany[24] = 'pacific-online'                         //loto
    arrayCompany[25] = 'metropolitan-b'                         //mbt
    arrayCompany[26] = 'megaworld-corp'                         //meg
    arrayCompany[27] = 'manila-electri'                         //mer
    arrayCompany[28] = 'manulife-financial-corporation'         //mfc
    arrayCompany[29] = 'monde-nissin'                           //monde
 
    arrayCompany[30] = 'manila-water-c'                         //mwc
    arrayCompany[31] = 'megawide-const'                         //mwide
    arrayCompany[32] = 'nickel-asia-co'                         //nikl
    arrayCompany[33] = 'petron'                                 //pcor
    arrayCompany[34] = 'puregold-price'                         //pgold
    arrayCompany[35] = 'shakey%E2%80%99s-pizza-asia-ventures-inc'      //pizza
    arrayCompany[36] = 'leisure---reso'                         //plus
    arrayCompany[37] = 'phil-natl-bank'                         //pnb
    arrayCompany[38] = 'rizal-comml-b'                          //rcb
    arrayCompany[39] = 'rfm'                                    //rfm

    arrayCompany[40] = 'robinsons-land'                         //rlc
    arrayCompany[41] = 'robinsons-reta'                         //rrhi
    arrayCompany[42] = 'semirara-minin'                         //scc
    arrayCompany[43] = 'security-bnk'                           //secb
    arrayCompany[44] = 'pilipinas-shell-petroleum-corp'         //shlph
    arrayCompany[45] = 'sun-life-financial'                     //slf
    arrayCompany[46] = 'sm-investment'                          //sm
    arrayCompany[47] = 'san-miguel-cor'                         //smc
    arrayCompany[48] = 'sm-prime-hldgs'                         //smph
    arrayCompany[49] = 'solar-philippines-nueva-ecija'          //spnec

    arrayCompany[50] = 'phi-long-dis-t'                         //tel
    arrayCompany[51] = 'union-bank-ps'                          //ubp
    arrayCompany[52] = 'universal-robi'                         //urc
    arrayCompany[53] = 'wilcon-depot-inc'                       //wlcon
}

async function writeToOutputFile()
{
    const today = new Date()
    const yyyy = today.getFullYear()
    let MM = today.getMonth() + 1
    let dd = today.getDate()
    let hh = today.getHours()
    let mm = today.getMinutes()
    let ss = today.getSeconds()

    if (dd < 10) dd = '0' + dd;
    if (MM < 10) MM = '0' + MM;

    const formattedToday = MM + dd + yyyy + '_' + hh + mm + ss;

    const fs = require('fs')
    fs.appendFile('c:\\temp\\Output.txt', '------- '+ formattedToday +' -------\n', (err) => {
        if (err) throw err;
    })

    for (let i=0; i < arrayCompany.length; i++) {
        let data = arrayCompany[i] + arrayBuyOutlook[i] + '\n'
        
        fs.appendFile('c:\\temp\\Output.txt', data, (err) => {
            if (err) throw err;
        })
    }
}
