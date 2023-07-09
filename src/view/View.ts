import { HasId, Model } from "../model/Model";

export abstract class View<T extends Model<K>, K extends HasId> {
    constructor(public parent: Element, public model: T) {
        this.model.on('change', this.render);
    }

    eventsMap(): { [key: string]: () => void } { return {}; }
    
    regionMap(): { [key: string]: string } { return {}; }

    regions: { [key: string]: Element } = {};
    
    abstract template: () => string;

    bindEvents(fragment: DocumentFragment): void {
        const map = this.eventsMap();
        for (let eventKey in map) {
            const [eventName, selector] = eventKey.split(":");
            fragment.querySelectorAll(selector)?.forEach(element => element.addEventListener(eventName, map[eventKey]))
        }
    }

    mapRegions(fragment: DocumentFragment): void {
        const regionMap = this.regionMap();
        for (let region in regionMap) {
            const selector = regionMap[region];
            const element = fragment.querySelector(selector);

            if (element) {
                this.regions[region] = element;
            }
        }
    }

    onRender(): void {}

    render = (): void => {
        this.parent.innerHTML = "";
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);

        this.onRender();

        this.parent.append(templateElement.content);
    }
}