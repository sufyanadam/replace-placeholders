const wait = require('./wait');
const process = require('process');
const cp = require('child_process');
const path = require('path');
const fs = require('fs');

test('Replaces placeholders in all files in the given directory matching the given filename pattern', () => {
  process.env['INPUT_PLACEHOLDERS'] = JSON.stringify({
    '<APP_NAME>': 'my-app',
    '<NAMESPACE>': 'my-namespace'
  });
  // process.env['INPUT_FILENAME-PATTERN'] = '*.yml'; This doesn't work in GitHub Actions CI. ENV dash-cased env variables don't seem to get set.
  // process.env['INPUT_SEARCH-DIRECTORY'] = 'test';
  process.env['INPUT_FILENAME_PATTERN'] = '*.yml';
  process.env['INPUT_SEARCH_DIRECTORY'] = 'test';

  const action = path.join(__dirname, 'index.js');
  const result = cp.execSync(
      `node ${action}`, {env: process.env}
  ).toString();
  console.log(result);
  const file = fs.readFileSync('test/example-file.yml', { encoding: 'utf8' });
  expect(file).not.toContain('<APP_NAME>');
  expect(file).not.toContain('<NAMESPACE>');
  expect(file).toContain('my-app');
  expect(file).toContain('my-namespace');
});
