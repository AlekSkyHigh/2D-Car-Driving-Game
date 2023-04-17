import Car from "./car"
import { Rectangle, Sprite } from "pixi.js";
import options from "../config/options.js";
import { clamp } from "../utils/math.js"

const moves = { up: false, left: false, right: false, down: false }

export default class CarPlayer extends Car {

    constructor() {
        super()
        this.$listen({ assets: ['loaded'], game: ['start'] })
        this.speed = options.carSpeed
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
        this.body = {x: carPlayer.position.x, y: carPlayer.position.y, width: carPlayer.width, height: carPlayer.height};
        this.road = new Rectangle(this.app.screen.width / 4, 0, this.app.screen.width / 2, this.app.screen.height);
        // console.log(this.model.width); 160
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
            newY = car.position.y - this.speed;
        }
        if (moves.left) {
            newX = car.position.x - this.speed;
        }
        if (moves.right) {
            newX = car.position.x += this.speed;
        }
        if (moves.down) {
            newY = car.position.y += this.speed;
        }

        if (newX !== null) {
            this.body.x = car.position.x = clamp(newX, road.x - 5, road.x + road.width);
        };
        if (newY !== null) {
            this.body.y = car.position.y = clamp(newY, road.y, road.y + road.height);
        };

        const direction = this.app.screen.width / 2 > this.body.x ? 1 : - 1;
        
        if (!road.contains(this.body.x - (this.body.width / 4) * direction, this.body.y, this.body.width, this.body.height)) {
            this.speed = options.carOutSpeed;
            this.$emit('car_out');
        } else {
            this.speed = options.carSpeed;
            this.$emit('car_in');
        }
    }

}


