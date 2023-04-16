import Object from "./object";
import { TilingSprite } from "pixi.js";
import options from "../config/options";

export default class Environment extends Object {

    constructor() {
        super();
        this.$listen({ assets: ['loaded'] })
    }

    assets_loaded(assets) {
        const asset = assets.environment;
        const environment = new TilingSprite(asset, asset.width, asset.height);
        environment.scale.set(options.backgroundScale);
        environment.height = 1600;
        this.environment.addChild(environment);
        this.model = environment;
    }
}