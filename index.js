const core = require('@actions/core');
const cp = require('child_process');

const run = async () => {
  try {
    const placeholders = JSON.parse(core.getInput('placeholders'));
    const filenamePattern = core.getInput('filename-pattern') || core.getInput('filename_pattern'); // setting process.env['INPUT_FILENAME-PATTERN'] in tests doesn't work, so we have to support both dash-cased and snake_cased input names for now.
    const searchDirectory = core.getInput('search-directory') || core.getInput('search_directory'); //
    const commands = Object.keys(placeholders).map((placeholder) => {
      return `find ${searchDirectory} -name "${filenamePattern}" | xargs sed -i --follow-symlinks "s|${placeholder}|${placeholders[placeholder]}|g"`
    });

    cp.execSync(commands.join("\n"), {encoding: 'utf-8'});
    const result = cp.execSync(`find ${searchDirectory} -name "${filenamePattern}" | xargs cat`).toString();
    console.log(result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
