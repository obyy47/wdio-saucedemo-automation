import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CartPage from '../pageobjects/cart.page.js'

const BACKPACK = 'sauce-labs-backpack'
const BIKE_LIGHT = 'sauce-labs-bike-light'

describe('Shopping cart', () => {
    beforeEach(async () => {
        await LoginPage.loginAs('standard_user')
    })

    it('SWA-12: add two items, remove one, and continue shopping', async () => {
        // Add two items
        await InventoryPage.addToCart(BACKPACK)
        await InventoryPage.addToCart(BIKE_LIGHT)
        await expect(InventoryPage.cartBadge).toHaveText('2')
        await expect(InventoryPage.removeButton(BACKPACK)).toBeDisplayed()

        // Both items are listed in the cart
        await InventoryPage.openCart()
        await expect(browser).toHaveUrl(expect.stringContaining('/cart.html'))
        await expect(CartPage.cartItems).toBeElementsArrayOfSize(2)

        // Remove one item
        await CartPage.removeItem(BIKE_LIGHT)
        await expect(CartPage.cartItems).toBeElementsArrayOfSize(1)

        // Back to the inventory with one item left
        await CartPage.continueShopping()
        await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
        await expect(InventoryPage.cartBadge).toHaveText('1')
        await expect(InventoryPage.removeButton(BACKPACK)).toBeDisplayed()
    })

    it('Cart badge is empty when no item is added', async () => {
        await expect(InventoryPage.cartBadge).not.toBeExisting()
    })
})
