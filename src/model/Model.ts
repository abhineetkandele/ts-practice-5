import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
    set(value: T): void;
    get<K extends keyof T>(key: K): T[K];
    getAll(): T;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

export interface HasId {
    id?: number;
}


export class Model<T extends HasId> {
    constructor(private events: Events, private sync: Sync<T>, private attributes: ModelAttributes<T>) {}

    // get get() {
    //     return this.attributes.get;
    // }

    // get on() {
    //     return this.events.on;
    // }

    // get trigger() {
    //     return this.events.trigger;
    // }
    
    get = this.attributes.get;
    
    on = this.events.on;

    trigger = this.events.trigger;
    

    set = (update: T): void => {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    fetch = (): void => {
        const id = this.get('id');
        if (!id) {
            throw new Error('No Id found');  
        } 

        this.sync.fetch(id).then((response: AxiosResponse): void => this.set(response.data))
    }

    save = (): void => {
        this.sync.save(this.attributes.getAll())
            .then((_: AxiosResponse): void => this.trigger('save'))
            .catch((): void => this.trigger('error'))
    }
}