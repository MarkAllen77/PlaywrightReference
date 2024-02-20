export class LoginPage {

    constructor (page) {
        this.page = page
        this.loginLink = '#login2'
        this.usernameInput = '#loginusername'
        this.passwordInput = '#loginpassword'
        this.loginButton = '//button[normalize-space()="Log in"]'
    }

    async gotoLoginPage(pageURL) {
        await this.page.goto(pageURL)
    }

    async login(username, password) {
        await this.page.locator(this.loginLink).click()
        await this.page.locator(this.usernameInput).fill(username)
        await this.page.locator(this.passwordInput).fill(password)
        await this.page.locator(this.loginButton).click()
    }
}
module.exports = LoginPage;	