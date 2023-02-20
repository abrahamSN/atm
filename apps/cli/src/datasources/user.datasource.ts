import AxiosClient from "../core/axios_client";

export default class UserDataSource {
    public static async getUserById(user_id: number) {
        const res = await AxiosClient.get(`/users/${user_id}`);
        return res.data;
    }

    public static async getUserByUsername(username: string) {
        const res = await await AxiosClient.get(`/users?username=${username}`);
        return res.data[0];
    }

    public static async createUser(username: string) {
        const data = {
            "username": username,
        };

        const res = await AxiosClient.post("/users", data);
        console.log(res);
        return res.data;
    }
}