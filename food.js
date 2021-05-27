import { onSnake, expandSnake } from "./snake.js";
import { getRandomGridPostion } from "./grid.js";
import { EXPANSION_RATE } from "./game.js";

let food = getRandomFoodPosition();

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;

  while (newFoodPosition === undefined || onSnake(newFoodPosition)) {
    newFoodPosition = getRandomGridPostion();
  }

  return newFoodPosition;
}
