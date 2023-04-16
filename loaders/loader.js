import { Assets } from "pixi.js";
import manifest from "../config/manifest.js";
import Action from "../utils/action.js";

export async function load() {

    await Assets.init({ manifest });

    const resources = await Assets.loadBundle('game-screen')
    
    Action.run('assets_loaded', resources)
}

