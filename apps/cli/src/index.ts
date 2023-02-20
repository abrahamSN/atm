import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";

import MainController from "./controllers/main.controller";

function run() {
  clear();
  console.log(chalk.green(figlet.textSync("ATM CLI", { horizontalLayout: "full" })));
  new MainController();
}

run();