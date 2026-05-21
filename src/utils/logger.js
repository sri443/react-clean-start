const chalk = require("chalk");

function success(msg) {
  console.log(
    chalk.green(`✔ ${msg}`)
  );
}

function error(msg) {
  console.log(
    chalk.red(`✖ ${msg}`)
  );
}

function info(msg) {
  console.log(
    chalk.cyan(`ℹ ${msg}`)
  );
}

module.exports = {
  success,
  error,
  info,
};