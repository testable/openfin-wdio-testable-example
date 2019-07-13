const isWinOS = process.platform === 'win32';
const launchTarget = isWinOS ? 'RunOpenFin.bat' : `${process.cwd()}/RunOpenFin.sh`;

const CONFIG_URL = isWinOS ? `${process.cwd()}\\app_sample.json` : `${process.cwd()}/app_sample.json`;

exports.config = {
  specs : [
    'test.js'
  ],
  capabilities : [
    {
      browserName   : 'chrome',
      chromeOptions : {
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
  }
};
