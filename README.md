## OpenFin testing with Webdriver.io

An example project for testing an OpenFin application with [Webdriver.io v8+](https://webdriver.io) using the test runner configuration approach that should work across Windows, Mac, and Linx and is also compatible with execution on [Testable](https://testable.io).

### Prerequisites to run locally

1. Install Node.js v18+
2. `git clone` this repository and change into the directory
3. Run `npm install` to install all dependencies.
4. For Windows, install the OpenFin RVM. See their website for more details.
5. For Mac/Linux: `npm install -g openfin-cli`.
6. Download and install [chromedriver v112](https://chromedriver.storage.googleapis.com/index.html?path=112.0.5615.49/) (for compatibility with OpenFin 31.x).

### Running locally

1. Start chromedriver on the default port (9515). You may need to use `chromedriver --allowed-origins=* --allowed-ips=0.0.0.0` args for it to work locally.
2. From the project directory run wdio to execute the test: `./node_modules/.bin/wdio wdio.conf.js`

And that's it. The test will launch Openfin and run all tests found in the `test.js` spec.

### Running on Testable

To run this on Testable simply zip up the directory and upload into a Testable scenario, or connect it via a VCS link. Check out the [OpenFin getting started guide](https://docs.testable.io/getting-started/openfin.html) for more details.
