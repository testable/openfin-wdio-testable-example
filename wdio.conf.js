const spawn = require('child_process').spawn;
const fs = require('fs');

const isWinOS = process.platform === 'win32';
const launchTarget = isWinOS ? `${process.cwd()}\\RunOpenFin.bat` : `${process.cwd()}/RunOpenFin.sh`;
const CONFIG_URL = process.env.CONFIG_URL || (isWinOS ? `${process.cwd()}\\app_sample.json` : `${process.cwd()}/app_sample.json`);

// for Testable runs, rely on the version auto-detect (if CHROME_PORT exists its v13+)
// for local runs just read it from the app_sample.json file
const ShouldLaunchBefore = process.env.CONFIG_URL ?
  typeof process.env.CHROME_PORT !== 'undefined' :
  localShouldLaunchBefore();
const DefaultDebuggingPort = 12565; // also specified in app_sample.json

function localShouldLaunchBefore() {
  const version = JSON.parse(fs.readFileSync('app_sample.json')).runtime.version;
  if (version) {
    let index = version.indexOf('.');
    return index === -1 ? true : Number(version.substring(0, index)) >= 13;
  }
  return true;
}

exports.config = {
  specs: [
    'test.js'
  ],
  capabilities: [
    {
      browserName: 'chrome',
      chromeOptions: ShouldLaunchBefore ? {
        w3c: false,
        extensions: [],
        debuggerAddress: `localhost:${process.env.CHROME_PORT}`
      } : {
          w3c: false,
          extensions: [],
          binary: launchTarget,
          args: [
            `--config=${CONFIG_URL}`
          ]
        }
    }
  ],
  host: 'localhost',
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
    if (ShouldLaunchBefore) {
      const proc = spawn(launchTarget, [`--config=${CONFIG_URL}`, `--remote-debugging-port=${process.env.CHROME_PORT || DefaultDebuggingPort}`]);
      proc.stdout.on('data', (data) => {
        console.log(data);
      });
      proc.stderr.on('data', (data) => {
        console.log(data);
      });
    }
  }
};
