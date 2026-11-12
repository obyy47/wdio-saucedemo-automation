import { $, $$ } from '@wdio/globals'

class CartPage {
    get cartItems() { return $$('.cart_item') }
    get btnCheckout() { return $('#checkout') }
    get btnContinueShopping() { return $('#continue-shopping') }

    removeButton(slug) { return $(`[data-test="remove-${slug}"]`) }

    async removeItem(slug) {
        await this.removeButton(slug).click()
    }

    async checkout() {
        await this.btnCheckout.click()
    }

    async continueShopping() {
        await this.btnContinueShopping.click()
    }
}

export default new CartPage()
