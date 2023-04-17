import { Sprite } from "pixi.js";
import Container from "../container";
import options from "../config/options";
import { rand } from "../utils/math";
import Matrix from "../utils/matrix";

export default class Cars extends Container {

    constructor() {

        super();
        this.$listen({ assets: ['loaded'], game: ['start'] });
        this.cars = [];
        this.matrix = new Matrix({
            rows: 3,
            columns: 3,
            width: 600,
            height: 600,
            offset: { x: 200, y: 5 }
        })
    }

    assets_loaded(assets) {

        const slots = [];
        this.matrix.eachSlot(slot => {
            if (slot.available) {
                slots.push(slot)
            }
        })

        for (let name in assets) {

            if (name.startsWith('randomCar')) {

                const index = rand(0, slots.length);
                const slot = slots[index];
                const car = new Sprite(assets[name]);
                car.position.set(slot.ax, slot.ay);
                this.randomCars.addChild(car);
                car.rotation = - Math.PI / 2;
                car.anchor.set(0.5, 0.5);
                car.width = options.carWidth;
                car.height = options.carHight;
                slot.available = false;
                slots.splice(index, 1);
            }
        }
    }
}