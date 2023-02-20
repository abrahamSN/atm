import AxiosClient from "../core/axios_client";

export default class TransactionDataSource {
    public static async getAllTransactionByUserId(user_id: number) {
        const res = await AxiosClient.get(`/transactions?user_id=${user_id}`);
        return res.data;
    }

    public static async getAllTransactionByToId(to_id: number) {
        const res = await AxiosClient.get(`/transactions?to_id=${to_id}`);
        return res.data;
    }
    
    public static async createTransaction(user_id: number, amount: number, type: string, to_id?: number) {
        const data = {
            "user_id": user_id,
            "amount": amount,
            "type": type,
            "to_id": to_id,
        };

        const res = await AxiosClient.post("/transactions", data);
        return res.data;
    }   
}