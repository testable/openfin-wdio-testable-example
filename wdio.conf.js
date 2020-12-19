const spawnSync = require('child_process').spawnSync;

const isWinOS = process.platform === 'win32';
const launchTarget = isWinOS ? 'RunOpenFin.bat' : `${process.cwd()}/RunOpenFin.sh`;
const CONFIG_URL = process.env.CONFIG_URL || (isWinOS ? `${process.cwd()}\\app_sample.json` : `${process.cwd()}/app_sample.json`);

/* 
  Before OpenFin v13/Chromedriver v76, we set an alternate "Chrome" binary for Chromedriver
  to use (RunOpenFin.[bat|sh]). This launches OpenFin using the debugging port that Chromedriver 
  normally passes to Chrome as an argument (--remote-debugging-port).

  From Chromedriver v76 on, it no longer chooses a remote debugging port for Chrome and instead Chrome chooses
  one itself. So intercepting this argument passed from Chromedriver to Chrome no longer works as a part of launching
  OpenFin. Instead we launch OpenFin BEFORE our test starts on a preset debugging port and then we pass that to 
  Chromedriver via the debuggerAddress option. This tells Chromedriver to connect to our already running OpenFin instance.

  When running on Testable, we automatically detect that your application configuration is v13+ and allocate a port
  for you. This is accessible as the CHROME_PORT environment variable. So you can be confident that if this environment
  variable exists, you need to launch OpenFin as a before step.

  For testing locally you can set a boolean flag here or potentially read the app config yourself to detect.
  */

// for local runs, set manually
const LaunchOpenFinBefore = true;
// for Testable runs, rely on the auto-detect based on the CHROME_PORT env var existing
const ShouldLaunchBefore = process.env.CONFIG_URL ? typeof process.env.CHROME_PORT !== 'undefined' : LaunchOpenFinBefore;
const DefaultDebuggingPort = 12565; // also specified in app_sample.json

exports.config = {
  specs : [
    'test.js'
  ],
  capabilities : [
    {
      browserName   : 'chrome',
      chromeOptions : ShouldLaunchBefore ? {
        extensions      : [],
        debuggerAddress : `localhost:${process.env.CHROME_PORT}`
      } : {
        extensions : [],
        binary     : launchTarget,
        args       : [
          `--config=${CONFIG_URL}`
        ]
      }
    }
  ],
  host           : 'localhost',
  port           : 9515,
  reporters      : ['dot', 'concise'],
  path           : '/',
  logLevel       : 'error',
  coloredLogs    : true,
  framework      : 'mocha',
  waitforTimeout : 20000,
  mochaOpts      : {
    ui        : 'bdd',
    timeout   : 500000
  },
  before: function() {
    console.log('here');
    require('testable-utils');

    if (ShouldLaunchBefore) {
      spawnSync(launchTarget, [`--config=${CONFIG_URL}`, `--remote-debugging-port=${process.env.CHROME_PORT || DefaultDebuggingPort}`]);
    }
  }
};
