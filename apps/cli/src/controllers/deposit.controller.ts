import inquirer from 'inquirer';
import chalk from 'chalk';

import TransactionService from '../services/transaction.service';

import MainController from './main.controller';

export default class DepositController {
  constructor() {
    this.main();
  }

  private deposit_cli() {
    const questions = [
      {
        type: 'input',
        name: 'amount',
        message: 'How many money do you want to deposit?',
      },
    ]

    return inquirer.prompt(questions);
  }

  public main() {
    Promise.resolve()
      .then(this.deposit_cli)
      .then(async (answers) => {
        // store transaction
        const transaction = await TransactionService.createTransaction(Number(answers.amount), 'deposit');
        console.log(
          chalk.green(`Success deposit ${transaction.amount}!`)
        );

        new MainController();
      }
    );
  }
}