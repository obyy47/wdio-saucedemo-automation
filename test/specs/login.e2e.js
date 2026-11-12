import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'

describe('Login', () => {
    beforeEach(async () => {
        await LoginPage.open()
    })

    it('SWA-1: log in with standard_user', async () => {
        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
        await expect(InventoryPage.inventoryList).toBeDisplayed()
    })

    it('SWA-2: locked_out_user is rejected with an error message', async () => {
        await LoginPage.login('locked_out_user', 'secret_sauce')
        await expect(LoginPage.errorMessage).toBeDisplayed()
        await expect(LoginPage.errorMessage).toHaveText(expect.stringContaining('locked out'))
        await expect(browser).not.toHaveUrl(expect.stringContaining('/inventory.html'))
    })

    it('SWA-28: valid username with incorrect password shows an error', async () => {
        await LoginPage.login('standard_user', 'wrong_password')
        await expect(LoginPage.errorMessage).toBeDisplayed()
        await expect(LoginPage.errorMessage).toHaveText(expect.stringContaining('do not match'))
    })

    it('SWA-33: empty username and empty password shows an error', async () => {
        await LoginPage.btnLogin.click()
        await expect(LoginPage.errorMessage).toBeDisplayed()
        await expect(LoginPage.errorMessage).toHaveText(expect.stringContaining('Username is required'))
    })
})
