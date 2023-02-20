import axios, { AxiosResponse } from "axios";

export default class AxiosClient {
    static url: string = "http://localhost:4800";

    public static async get(path: string): Promise<AxiosResponse<any>> {
        const res = await axios.get(`${this.url}${path}`);
        return res;
    }

    public static post(path: string, data: object): Promise<AxiosResponse<any>> {
        return axios.post(`${this.url}${path}`, data);
    }

    public static delete(path: string): Promise<AxiosResponse<any>> {
        return axios.delete(`${this.url}${path}`);
    }

    public static patch(path: string, data: object): Promise<AxiosResponse<any>> {
        return axios.patch(`${this.url}${path}`, data);
    }
}