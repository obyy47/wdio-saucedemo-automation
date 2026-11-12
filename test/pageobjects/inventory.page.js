import { $, $$ } from '@wdio/globals'

class InventoryPage {
    get inventoryList() { return $('.inventory_list') }
    get cartBadge() { return $('.shopping_cart_badge') }
    get cartLink() { return $('.shopping_cart_link') }
    get menuButton() { return $('#react-burger-menu-btn') }
    get logoutLink() { return $('#logout_sidebar_link') }

    // Product buttons use the product slug, e.g. "sauce-labs-backpack"
    addToCartButton(slug) { return $(`[data-test="add-to-cart-${slug}"]`) }
    removeButton(slug) { return $(`[data-test="remove-${slug}"]`) }

    async addToCart(slug) {
        await this.addToCartButton(slug).click()
    }

    async removeFromCart(slug) {
        await this.removeButton(slug).click()
    }

    async openCart() {
        await this.cartLink.click()
    }

    async logout() {
        await this.menuButton.click()
        await this.logoutLink.waitForClickable()
        await this.logoutLink.click()
    }
}

export default new InventoryPage()
