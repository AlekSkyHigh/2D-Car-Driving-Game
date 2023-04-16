import './style.css';
import * as PIXI from 'pixi.js';
import roadImage from './images/road-image-min.jpg';

//Create a Pixi Application
const app = new PIXI.Application({ width: 800, height: 600 });

//Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById('app').appendChild(app.view);

PIXI.Assets.load(roadImage).then(loadBackground)
PIXI.Assets.load('./images/lamborghini-min.png').then(loadCar)

const backgroundLayer = new PIXI.Container;
app.stage.addChild(backgroundLayer);

const carLayer = new PIXI.Container;
app.stage.addChild(carLayer);

let background = null;
let car = null;
let carSpeed = 2.8;
let backgroundSpeed = 5.5;

const road = new PIXI.Rectangle(app.screen.width / 4, 0, app.screen.width / 2, app.screen.height)
const carBody = new PIXI.Rectangle(0, 0, 0, 0)
console.log(road);
function loadBackground(asset) {
  //This code will run when the loader has finished loading the image
  background = new PIXI.TilingSprite(asset, asset.width, asset.height);
  background.scale.set(0.48);
  background.height = 1600;
  backgroundLayer.addChild(background);
  app.ticker.add(gameLoop);
}

function loadCar(asset) {
  car = new PIXI.Sprite(asset);
  car.scale.set(0.12);
  carLayer.addChild(car);
  car.anchor.set(0.5, 0.5);
  car.rotation = -Math.PI * 0.5;
  car.position.set(400, 500);
  carBody.x = car.position.x;
  carBody.y = car.position.y;
  carBody.width = car.width;
  carBody.height = car.height;
}

function gameLoop(delta) {
  if (car && background) {
    // car.rotation += 0.1 * delta;
    // car.position.y -= 0.1 * delta;
    background.tilePosition.y += backgroundSpeed * delta;

    let newX = null, newY = null;

    if (moves.up) {
      newY = car.position.y - carSpeed;
    }
    if (moves.left) {
      newX = car.position.x - carSpeed;
    }
    if (moves.right) {
      newX = car.position.x += carSpeed;
    }
    if (moves.down) {
      newY = car.position.y += carSpeed;
    }

    if (newX !== null) {
      carBody.x = car.position.x = clamp(newX, road.x -5, road.x + road.width);
    };
    if (newY !== null) {
      carBody.y = car.position.y = clamp(newY, road.y, road.y + road.height);
    };
    
    if (!road.contains(carBody.x, carBody.y, carBody.width, carBody.height)) {
      carSpeed = 0.9;
      backgroundSpeed = 0.9;
    } else {
      carSpeed = 2.8;
      backgroundSpeed = 5.5
    }

  }

}

window.addEventListener('keydown', (event) => {

  if (event.key === "ArrowLeft") {
    moves.left = true;
  } else if (event.key === "ArrowRight") {
    moves.right = true;
  } else if (event.key === "ArrowUp") {
    moves.up = true;
  } else if (event.key === "ArrowDown") {
    moves.down = true;
  }

})

const moves = { up: false, left: false, right: false, down: false }

window.addEventListener('keyup', (event) => {

  if (event.key === "ArrowLeft") {
    moves.left = false;
  } else if (event.key === "ArrowRight") {
    moves.right = false;
  } else if (event.key === "ArrowUp") {
    moves.up = false;
  } else if (event.key === "ArrowDown") {
    moves.down = false;
  }

})

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}