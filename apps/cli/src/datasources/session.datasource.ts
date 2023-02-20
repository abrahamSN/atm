import AxiosClient from "../core/axios_client";

export default class SessionDataSource {
    public static async getUserSession() {
        const res = await AxiosClient.get("/logged_session");
        return res.data;
    }
    
    public static async patchUserSession(id: number, username: string) {
        const data = {
            "id": id,
            "username": username,
        };

        const res = await AxiosClient.patch("/logged_session", data);
        return res.data;
    }   
}