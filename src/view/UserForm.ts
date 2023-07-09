import { User, UserProps } from "../model/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {

    setNameHandler = (): void => {
        const newName = (this.parent.querySelector('input') as HTMLInputElement).value;
        this.model.set({ name: newName });
    }

    randomAgeHandler() {
        console.log('set age clicked')
    }

    saveUser = (): void => {
        this.model.save();
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-name': this.setNameHandler,
            'click:.random-age': this.randomAgeHandler,
            'click:.save-model': this.saveUser
        };
    }

    template = (): string => {
        return `
            <div>
                <input value="${this.model.get('name')}" />
                <button class="set-name">Set Name</button>
                <button class="random-age">Set random age</button>
                <button class="save-model">Save User</button>
            </div>
        `;
    }
}