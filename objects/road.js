import Object from "./object";
import { TilingSprite } from "pixi.js";
import options from "../config/options";

export default class Road extends Object {

    constructor() {
        super();
        this.$listen({ assets: ['loaded'] })
    }

    assets_loaded(assets) {
        const { app } = this;
        const asset = assets.road;
        const road = new TilingSprite(asset, asset.width, asset.height);
        road.scale.set(options.backgroundScale);
        road.anchor.set(0.5, 0);
        road.position.x = app.screen.width / 2;
        road.height = 1600;
        this.road.addChild(road);
        this.model = road;
    }
}