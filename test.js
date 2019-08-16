/**
 *
 * Example test script for Hello OpenFin App using Mocha, CHAI and WebdriverIO (http://v4.webdriver.io)
 * ChromeDriver must be running before test.
 *
 */

"use strict";

var should = require('chai').should(),
    assert = require("assert");


describe('Hello OpenFin App testing with webdriver.io', function() {
    var notificationButton, cpuInfoButton, cpuInfoExitButton;

    /**
     * Select a Window
     * @param windowHandle handle of the window
     */
    function switchWindow(windowHandle) {
        browser.switchTab(windowHandle);
        return browser.getTitle();
    }

    /**
     * Select the window with specified title
     * @param windowTitle window title
     */
    function switchWindowByTitle(windowTitle) {
        const tabIds = browser.getTabIds();
        var title = switchWindow(tabIds[handleIndex]);
        var handleIndex = 0;
        while (handleIndex < tabIds.length && title !== windowTitle) {
            handleIndex++;
            title = switchWindow(tabIds[handleIndex]);
        }
        // the window may not be loaded yet, so call itself again if necessary
        if (title !== windowTitle)
            switchWindowByTitle(windowTitle);
    }


    /**
     *  Check if OpenFin Javascript API fin.desktop.System.getVersion exits
     *
    **/
    function checkFinGetVersion() {
        const result = browser.executeAsync(function (done) {
            if (fin && fin.desktop && fin.desktop.System && fin.desktop.System.getVersion) {
                done(true);
            } else {
                done(false);
            }
        });
        return result.value;
    }

    /**
     *  Wait for OpenFin Javascript API to be injected 
     *
    **/
    function waitForFinDesktop() {
        const ready = checkFinGetVersion();
        if (!ready) {
            browser.pause(1000);
            waitForFinDesktop();               
        }
    }

    it('Switch to Hello OpenFin Main window', () => {
        switchWindowByTitle("Hello OpenFin");
        browser.testableScreenshot('Main');
    });

    it('Wait for OpenFin API ready', () => {
        waitForFinDesktop();
    });

    it("Find notification button", () => {
        const result = browser.element("#desktop-notification");
        should.exist(result.value);
        notificationButton = result.value;
    });

    it("Click notification button", () => {
        should.exist(notificationButton);
        browser.elementIdClick(notificationButton.ELEMENT);
    });


    it("Find CPU Info button", () => {
        const result = browser.element("#cpu-info");
        should.exist(result.value);
        cpuInfoButton = result.value;
    });

    it("Click CPU Info button", () => {
        should.exist(cpuInfoButton);
        const result = browser.elementIdClick(cpuInfoButton.ELEMENT);
        browser.pause(3000); // pause just for demo purpose so we can see the window
    });


    it('Switch to CPU Info window', () => {
        switchWindowByTitle("Hello OpenFin CPU Info");
        browser.testableScreenshot('CPU');
    });


    it("Find Exit button for CPU Info window", () => {
        const result = browser.element("#close-app");
        should.exist(result.value);
        cpuInfoExitButton = result.value;
    });

    it("Click CPU Info Exit button", () => {
        should.exist(cpuInfoExitButton);
        browser.elementIdClick(cpuInfoExitButton.ELEMENT);
    });

    it('Exit OpenFin Runtime', () => {
        browser.execute(function () {
            fin.desktop.System.exit();
        });
        browser.pause(1000); // pause here to give Runtime time to exit
    });

});
