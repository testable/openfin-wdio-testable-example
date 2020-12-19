## OpenFin testing with Webdriver.io

An example project for testing an OpenFin application with [Webdriver.io v5+](https://webdriver.io) using the test runner configuration approach that should work across Windows, Mac, and Linx and is also compatible with execution on [Testable](https://testable.io).

### Prerequisites to run locally

1. Install the latest Node.js and npm
2. `git clone` this repository and change into the directory
3. Run `npm install` to install all dependencies.
4. For Windows, install the [Hello OpenFin app](https://install.openfin.co/download/?config=https%3A%2F%2Fcdn.openfin.co%2Fdemos%2Fhello%2Fapp.json&fileName=HelloOpenFin&supportEmail=support%40openfin.co)
5. For Mac/Linux, install the Testable fork of openfin-cli that makes sure the devtools port works correctly: `npm install -g testable-openfin-cli`.
6. Download and install [chromedriver v2.37](https://chromedriver.storage.googleapis.com/index.html?path=2.37/) (for compatibility with OpenFin 12.x).

### Running locally

1. Start chromedriver on the default port (9515)
2. From the project directory run wdio to execute the test: `./node_modules/.bin/wdio wdio.conf.js`

And that's it. The test will launch openfin as the chromium instance to drive via the webdriver protocol and run all tests found in the `test.js` spec.

### Running on Testable

There are a few key differences from [hello-openfin-selenium-example](https://github.com/openfin/hello-openfin-selenium-example) to get this test running on Testable.

**RunOpenFin.bat**

The location of the OpenFin binary is hard-coded to the location on our test runner:

```
SET openfinLocation=C:\Users\Administrator\AppData\Local\OpenFin
```

**wdio.conf.js**

The config url is set to ``process.env.CONFIG_URL``. This path refers to a modified version of the application config json that will successfully launch multiple times on the same test runner for simulating multiple virtual users per instance.

To run this on Testable simply upload all the files, zip up the directory and upload into a Testable scenario, or connect it via a VCS link. Check out the [OpenFin getting started guide](https://docs.testable.io/getting-started/openfin.html) for more details.

