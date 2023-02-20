import SessionService from './session.service';
import TransactionDataSource from '../datasources/transaction.datasource';
import UserService from './user.service';

export default class TransactionService {
    public static async getAllTransactionByUserId(user_id: number) {
        const trx = await TransactionDataSource.getAllTransactionByUserId(user_id);
        return trx;
    }

    public static async getAllTransactionByToId(to_id: number) {
        const trx = await TransactionDataSource.getAllTransactionByToId(to_id);
        return trx;
    }

    public static async createTransaction(amount: number, type: string, to_account?: string) {
        let to_id: number | undefined;

        const session = await SessionService.getSession();

        const balance = await UserService.getBalance();

        if (type !== "deposit" && balance < amount) {
            return "Insufficient balance";
        }

        if (type === "transfer" && to_account !== undefined) {
            const dataUser = await UserService.getUserByUsername(to_account);
            
            if (dataUser === undefined) {
                return "account is not found";
            }
            to_id = dataUser.id;
        }

        const res = await TransactionDataSource.createTransaction(session.id, amount, type, to_id);
        return res;
    }
}