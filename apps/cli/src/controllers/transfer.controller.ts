import inquirer from 'inquirer';
import chalk from 'chalk';

import MainController from './main.controller';

import TransactionService from '../services/transaction.service';

export default class TransferController {
    constructor() {
        this.main();
    }

    private transfer_cli() {
        const questions = [
            {
                type: 'input',
                name: 'amount',
                message: 'How many money do you want to transfer?',
            },
            {
                type: 'input',
                name: 'to_account',
                message: 'To which account?',
            },
        ]

        return inquirer.prompt(questions);
    }

    public main() {
        Promise.resolve()
            .then(this.transfer_cli)
            .then(async (answers: any) => {
                // store transaction
                const transaction = await TransactionService.createTransaction(Number(answers.amount), 'transfer', answers.to_account);

                if (transaction === "Insufficient balance") {
                    console.log(
                        chalk.red(`Insufficient balance!`)
                    );
                } else if (transaction === "account is not found") {
                    console.log(
                        chalk.red(`Account is not found!`)
                    );
                } else {
                    console.log(
                        chalk.green(`Success Withdraw ${transaction.amount}!`)
                    );
                }

                new MainController();
            }
        );
    }
}