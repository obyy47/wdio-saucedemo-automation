import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CartPage from '../pageobjects/cart.page.js'
import CheckoutPage from '../pageobjects/checkout.page.js'

describe('End-to-end', () => {
    it('SWA-27: complete user journey with standard_user', async () => {
        // 1. Log in
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))

        // 2. Add two items to the cart
        await InventoryPage.addToCart('sauce-labs-backpack')
        await InventoryPage.addToCart('sauce-labs-bike-light')
        await expect(InventoryPage.cartBadge).toHaveText('2')

        // 3. Go to the cart and start checkout
        await InventoryPage.openCart()
        await expect(CartPage.cartItems).toBeElementsArrayOfSize(2)
        await CartPage.checkout()

        // 4. Fill in the information and review the order
        await CheckoutPage.fillInformation('Robby', 'Adriansyah Fadillah', '40227')
        await CheckoutPage.continue()
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-two.html'))

        // 5. Finish the order
        await CheckoutPage.finish()
        await expect(CheckoutPage.completeHeader).toHaveText(expect.stringContaining('Thank you for your order'))

        // 6. Back home, then log out
        await CheckoutPage.backHome()
        await expect(InventoryPage.cartBadge).not.toBeExisting()
        await InventoryPage.logout()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
    })
})
