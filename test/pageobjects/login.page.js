import { $, browser } from '@wdio/globals'

class LoginPage {
    get inputUsername() { return $('#user-name') }
    get inputPassword() { return $('#password') }
    get btnLogin() { return $('#login-button') }
    get errorMessage() { return $('[data-test="error"]') }

    // Open the site with a clean state (no old session or cart from a previous test)
    async open() {
        await browser.url('https://www.saucedemo.com')
        await browser.deleteAllCookies()
        await browser.execute(() => window.localStorage.clear())
        await browser.refresh()
    }

    async login(username, password) {
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.btnLogin.click()
    }

    // Shortcut used by other specs that start from a logged-in state
    async loginAs(username = 'standard_user', password = 'secret_sauce') {
        await this.open()
        await this.login(username, password)
    }
}

export default new LoginPage()
