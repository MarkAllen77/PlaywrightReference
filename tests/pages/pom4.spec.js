export class CartPage {

    constructor (page) {
        this.page = page
        this.numberOfProducts = '//tbody[@id="tbodyid"]/tr/td[2]'
    }

    async checkProductInCart(productName) {
        await this.page.waitForSelector(this.numberOfProducts)

        const productsInCart = await this.page.$$(this.numberOfProducts)
        for (const product of productsInCart) {
            console.log(await product.textContent())
            if (productName === await product.textContent()) {
                return true
                break;
            }
        }
    }

}
module.exports = CartPage;