import {
  draw as drawSnake,
  update as updateSnake,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";

import { draw as drawFood, update as updateFood } from "./food.js";
import { outsideGrid } from "/grid.js";

export let EXPANSION_RATE;
let SNAKE_SPEED;
let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.querySelector("#game-board");
const startGameModal = document.querySelector(".modal-start-game");
const gameOverModal = document.querySelector(".modal-game-over");
const overlay = document.querySelector(".overlay");
const playAgainBtn = document.querySelector(".btn-play-again");

function main(currentTime) {
  if (gameOver) {
    openModal(gameOverModal);
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

// SCRIPT TO MAKE MODAL WORK
function openModal(modal) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal(modal) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

// Listen for click
startGameModal.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("btn")) {
    SNAKE_SPEED = parseInt(e.target.dataset.difficult);
    EXPANSION_RATE = parseInt(e.target.dataset.difficult);
    closeModal(startGameModal);
    window.requestAnimationFrame(main);
  }
});

playAgainBtn.addEventListener("click", (e) => {
  window.location.reload();
});
