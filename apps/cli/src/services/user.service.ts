import UserDataSource from '../datasources/user.datasource';

import SessionService from './session.service';
import TransactionService from './transaction.service';

export default class UserService {
    public static async getUserByUsername(username: string) {
        const userData = await UserDataSource.getUserByUsername(username);
        return userData;
    }

    public static async createUser(username: string) {
        const userData = await UserDataSource.createUser(username);
        return userData;
    }

    public static async getBalance() {
        const session = await SessionService.getSession();

        const trx = await TransactionService.getAllTransactionByUserId(session.id);

        const trxTo = await TransactionService.getAllTransactionByToId(session.id);

        let balance = 0;

        trx.forEach((trx: any) => {
            if (trx.type === "deposit") {
                balance += trx.amount;
            } else if (trx.type === "withdraw") {
                balance -= trx.amount;
            } else if (trx.type === "transfer") {
                balance -= trx.amount;
            }
        });

        trxTo.forEach((trx: any) => {
            if (trx.type === "transfer") {
                balance += trx.amount;
            }
        });

        return balance;
    }
}