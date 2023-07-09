import axios, { AxiosPromise } from "axios";

interface HasId {
    id?: number;
}

export class ApiSync<T extends HasId> {
    constructor(private baseurl: string) {}

    fetch = (id: number): AxiosPromise => {
        return axios.get(`${this.baseurl}/${id}`);
    }

    save = (data: T): AxiosPromise => {
        const { id } = data;
        if (id) {
            return axios.put(`${this.baseurl}/${id}`, data)
        }
        return axios.post(this.baseurl, data)
    }
}