const spawn = require('child_process').spawn;
const path = require('path');

const IsTestable = process.env.IS_TESTABLE === 'true';
const IsWin = process.platform === 'win32';
const LaunchTarget = path.join(process.cwd(), IsWin ? 'RunOpenFin.bat' : 'RunOpenFin.sh');
const DebuggingPort = 12565;

exports.config = {
  specs: [
    './test.js'
  ],
  capabilities: [
    {
      browserName: 'chrome',
      'testable:options': {
        openfinConfigUrl: 'app_sample.json'
      },
      'goog:chromeOptions': IsTestable ? {} : {
        w3c: false,
        extensions: [],
        debuggerAddress: `127.0.0.1:${DebuggingPort}`
      }
    }
  ],
  maxInstances: 1,
  host: '127.0.0.1',
  port: 9515,
  reporters: ['dot', 'concise'],
  path: '/',
  logLevel: 'error',
  coloredLogs: true,
  framework: 'mocha',
  waitforTimeout: 20000,
  mochaOpts: {
    ui: 'bdd',
    timeout: 500000
  },
  onWorkerStart: function () {
    if (!IsTestable) {
      spawn(LaunchTarget, ['--config=app_sample.json', `--remote-debugging-port=${DebuggingPort}`]);
    }
  }
};
