import Car from "./car"
import { Rectangle, Sprite } from "pixi.js";
import options from "../config/options.js";
import { clamp } from "../utils/math.js"

const moves = { up: false, left: false, right: false, down: false }

export default class CarPlayer extends Car {

    constructor() {
        super()
        this.$listen({ assets: ['loaded'], game: ['start'] })
    }

    assets_loaded(assets) {
        const asset = assets.carPlayer;
        const carPlayer = new Sprite(asset);
        carPlayer.scale.set(0.12);
        carPlayer.anchor.set(0.5, 0.5);
        carPlayer.rotation = -Math.PI * 0.5;
        carPlayer.position.set(400, 500);
        this.carPlayer.addChild(carPlayer);
        this.model = carPlayer;
        this.road = new Rectangle(this.app.screen.width / 4, 0, this.app.screen.width / 2, this.app.screen.height);
    }

    game_start() {
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    onKeyDown(event) {
        if (event.key === "ArrowLeft") {
            moves.left = true;
        } else if (event.key === "ArrowRight") {
            moves.right = true;
        } else if (event.key === "ArrowUp") {
            moves.up = true;
        } else if (event.key === "ArrowDown") {
            moves.down = true;
        }
        console.log('pressed');
    }

    onKeyUp(event) {
        if (event.key === "ArrowLeft") {
            moves.left = false;
        } else if (event.key === "ArrowRight") {
            moves.right = false;
        } else if (event.key === "ArrowUp") {
            moves.up = false;
        } else if (event.key === "ArrowDown") {
            moves.down = false;
        }
    }

    update() {
        let newX = null, newY = null;

        const car = this.model;
        const { road } = this;

        if (moves.up) {
            newY = car.position.y - options.carSpeed;
        }
        if (moves.left) {
            newX = car.position.x - options.carSpeed;
        }
        if (moves.right) {
            newX = car.position.x += options.carSpeed;
        }
        if (moves.down) {
            newY = car.position.y += options.carSpeed;
        }

        if (newX !== null) {
            car.position.x = clamp(newX, road.x - 5, road.x + road.width);
        };
        if (newY !== null) {
            car.position.y = clamp(newY, road.y, road.y + road.height);
        };
    }

}


