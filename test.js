/**
 *
 * Example test script for Hello OpenFin App using Mocha, CHAI and WebdriverIO (http://v4.webdriver.io)
 * ChromeDriver must be running before test.
 *
 */

"use strict";

const should = require('chai').should(),
      assert = require("assert");


describe('Hello OpenFin App testing with webdriver.io', function() {
    let notificationButton, cpuInfoButton, cpuInfoExitButton;

    /**
     * Select the window with specified title
     * @param windowTitle window title
     */
    async function switchWindowByTitle(windowTitle) {
        await browser.switchWindow(windowTitle);
    }

    it("Find notification button", async () => {
        const result = await $("#desktop-notification");
        should.exist(result);
        notificationButton = result;
    });

    it("Click notification button", async () => {
        should.exist(notificationButton);
        await notificationButton.click();
    });


    it("Find CPU Info button", async () => {
        const result = await $("#cpu-info");
        should.exist(result);
        cpuInfoButton = result;
        await result.waitForClickable();
    });

    it("Click CPU Info button", async () => {
        should.exist(cpuInfoButton);
        const result = await cpuInfoButton.click();
        await browser.pause(3000); // pause just for demo purpose so we can see the window
    });


    it('Switch to CPU Info window', async () => {
        await switchWindowByTitle("Hello OpenFin CPU Info");
        await browser.saveScreenshot('CPU.png');
    });


    it("Find Exit button for CPU Info window", async () => {
        const result = await $("#close-app");
        should.exist(result);
        cpuInfoExitButton = result;
    });

    it("Click CPU Info Exit button", async () => {
        should.exist(cpuInfoExitButton);
        await cpuInfoExitButton.click();
    });

    it('Exit OpenFin Runtime', async () => {
        await browser.execute(function () {
            fin.desktop.System.exit();
        });
        await browser.pause(1000); // pause here to give Runtime time to exit
    });

});

