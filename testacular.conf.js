basePath = 'angular-seed/test/e2e/';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  '*.js'
];

proxies = {
  '/': 'http://localhost:5000/'
};

autoWatch = true;

browsers = ['Chrome'];

singleRun = false;

runnerPort = 9100;

reportSlowerThan = 400;