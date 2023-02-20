import inquirer from 'inquirer';
import clear from 'clear';
import chalk from 'chalk';

import LoginController from './login.controller';
import DepositController from './deposit.controller';
import TransferController from './transfer.controller';
import WithdrawController from './withdraw.controller';

import SessionService from '../services/session.service';
import UserService from '../services/user.service';

export default class MainController {
  constructor() {
    this.index();
  }

  main_cli() {
    const questions = [
      {
        type: 'list',
        name: 'menu_type',
        message: 'What do you want to do?',
        choices: [
          'Deposit',
          'Withdraw',
          'Transfer',
          'Check Balance',
          'Logout',
        ],
      },
    ]

    return inquirer.prompt(questions);
  }

  private async index() {
    // check if logged_session is not null
    const session = await SessionService.getSession();

    if (session.id === 0 && session.username === '') {
      return new LoginController();
    }

    console.log(
      chalk.blue('Welcome back ' + session.username + '!')
    );

    return Promise.resolve()
      .then(this.main_cli)
      .then(async (answers) => {
        switch (answers.menu_type) {
          case 'Deposit':
            new DepositController();
            break;
          case 'Withdraw':
            new WithdrawController();
            break;
          case 'Transfer':
            new TransferController();
            break;
          case 'Check Balance':
            const balance = await UserService.getBalance();
            console.log(chalk.green(`Your current balance is ${balance}.`));
            new MainController();
            break;
          case 'Logout':
            await SessionService.patchSession('');
            clear();
            console.log(
              chalk.red('You have been logged out.')
            );
            break;
          default:
            break;
        }
      }
    );
  }
}
