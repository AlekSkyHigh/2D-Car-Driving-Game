import './style.css';
import * as PIXI from 'pixi.js';
import { load } from './loaders/loader.js';
import Road from './objects/road.js';
import Container from './container.js';
import Environment from './objects/environment.js';
import CarPlayer from './objects/carPlayer';
import Action from './utils/action';
// import Cars from './objects/cars';

const app = new PIXI.Application({ width: 800, height: 600 });
Container.prototype.app = app;
document.getElementById('app').appendChild(app.view);

function createLayer(name) {

  const layer = new PIXI.Container;
  Container.prototype[name] = layer;
  app.stage.addChild(layer);
}
createLayer('environment');
createLayer('road');
createLayer('carPlayer');
// createLayer('randomCars');

const road = new Road;
const environment = new Environment;
const carPlayer = new CarPlayer;
// const cars = new Cars;

load().then(() => {Action.run('game_start'), app.ticker.add(gameLoop)});


function gameLoop(delta) {
  // road.model.tilePosition.y += options.roadSpeed * delta;
  road.update(delta);
  // environment.model.tilePosition.y += options.environmentSpeed * delta;
  environment.update(delta);
  
  carPlayer.update();
}



