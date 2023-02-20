import inquirer from 'inquirer';

import UserService from '../services/user.service';
import TransactionService from '../services/transaction.service';

import MainController from './main.controller';
import chalk from 'chalk';

export default class WithdrawController {
  constructor() {
    this.main();
  }

  private withdraw_cli() {
    const questions = [
      {
        type: 'input',
        name: 'amount',
        message: 'How many money do you want to withdraw?',
      },
    ]

    return inquirer.prompt(questions);
  }

  public main() {
    Promise.resolve()
      .then(this.withdraw_cli)
      .then(async (answers: any) => {
        // check balance more than amount
        const balance = await UserService.getBalance();
        if (balance < Number(answers.amount)) {
            console.log(
              chalk.red('Your balance is not enough!')
            );
        } else {
            // store transaction
            const transaction = await TransactionService.createTransaction(Number(answers.amount), 'withdraw');
            console.log(
              chalk.green(`Success Withdraw ${transaction.amount}!`)
            );
        }

        new MainController();
      }
    );
  }
}