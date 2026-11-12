import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CartPage from '../pageobjects/cart.page.js'
import CheckoutPage from '../pageobjects/checkout.page.js'

describe('Checkout', () => {
    // Start every test logged in, with one item in the cart, on the "Your Information" page
    beforeEach(async () => {
        await LoginPage.loginAs('standard_user')
        await InventoryPage.addToCart('sauce-labs-backpack')
        await InventoryPage.openCart()
        await CartPage.checkout()
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one.html'))
    })

    it('SWA-41: all information fields empty shows an error', async () => {
        await CheckoutPage.continue()
        await expect(CheckoutPage.errorMessage).toBeDisplayed()
        await expect(CheckoutPage.errorMessage).toHaveText(expect.stringContaining('First Name is required'))
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one.html'))
    })

    it('SWA-38: empty First Name shows an error', async () => {
        await CheckoutPage.fillInformation('', 'Adriansyah', '40227')
        await CheckoutPage.continue()
        await expect(CheckoutPage.errorMessage).toHaveText(expect.stringContaining('First Name is required'))
    })

    it('SWA-17: complete checkout with valid information', async () => {
        await CheckoutPage.fillInformation('Robby', 'Adriansyah', '40227')
        await CheckoutPage.continue()
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-two.html'))

        await CheckoutPage.finish()
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-complete.html'))
        await expect(CheckoutPage.completeHeader).toHaveText(expect.stringContaining('Thank you for your order'))

        // Back home resets the cart
        await CheckoutPage.backHome()
        await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
        await expect(InventoryPage.cartBadge).not.toBeExisting()
    })
})
