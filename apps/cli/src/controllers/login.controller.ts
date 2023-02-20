import inquirer from 'inquirer';

import SessionService from '../services/session.service';

import MainController from './main.controller';

export default class LoginController {
  constructor() {
    this.main();
  }

  private login_cli() {
    const questions = [
      {
        type: 'input',
        name: 'username',
        message: 'Enter your username:',
      },
    ]

    return inquirer.prompt(questions);
  }

  public main() {
    Promise.resolve()
      .then(this.login_cli)
      .then(async (answers) => {
        const session = await SessionService.patchSession(answers.username);

        console.log(`Success Login as ${session.username}!`)

        new MainController();
      }
    );
  }
}