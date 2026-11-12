import { $ } from '@wdio/globals'

class CheckoutPage {
    // Step one: your information
    get inputFirstName() { return $('#first-name') }
    get inputLastName() { return $('#last-name') }
    get inputPostalCode() { return $('#postal-code') }
    get btnContinue() { return $('#continue') }
    get errorMessage() { return $('[data-test="error"]') }

    // Step two: overview
    get btnFinish() { return $('#finish') }

    // Complete page
    get completeHeader() { return $('.complete-header') }
    get btnBackHome() { return $('#back-to-products') }

    async fillInformation(firstName, lastName, postalCode) {
        if (firstName) await this.inputFirstName.setValue(firstName)
        if (lastName) await this.inputLastName.setValue(lastName)
        if (postalCode) await this.inputPostalCode.setValue(postalCode)
    }

    async continue() {
        await this.btnContinue.click()
    }

    async finish() {
        await this.btnFinish.click()
    }

    async backHome() {
        await this.btnBackHome.click()
    }
}

export default new CheckoutPage()
