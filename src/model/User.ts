import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";
import { Eventing } from "./Eventing";
import { Model } from "./Model";

export interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}

const BASE_URL = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(new Eventing(), new ApiSync<UserProps>(BASE_URL), new Attributes<UserProps>(attrs))
    }

    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(BASE_URL, User.buildUser);
    }
}   