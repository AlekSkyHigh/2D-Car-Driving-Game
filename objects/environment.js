import Object from "./object";
import { TilingSprite } from "pixi.js";
import options from "../config/options";

export default class Environment extends Object {

    constructor() {
        super();
        this.$listen({ assets: ['loaded'], car: ['out', 'in'] });
        this.speed = options.environmentSpeed;
    }

    assets_loaded(assets) {
        const asset = assets.environment;
        const environment = new TilingSprite(asset, asset.width, asset.height);
        environment.scale.set(options.backgroundScale);
        environment.height = 1600;
        this.environment.addChild(environment);
        this.model = environment;
    }

    car_out() {
        this.speed = options.environmentOutSpeed;
    }

    car_in() {
        this.speed = options.environmentSpeed;
    }

    update(delta) {
        this.model.tilePosition.y += this.speed * delta;

    }
}