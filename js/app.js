let snakeTable = document.querySelector(".snakeTable");
let boxes = document.getElementsByClassName("box");
let modul = document.querySelector(".modul");
let start = document.querySelector(".start");


let table = {
  rowsCols: 21,
  boxes: 21 * 21,
};

let snake = {
  direction: "right",
  position: [
    [6, 10],
    [7, 10],
    [8, 10],
    [9, 10],
    [10, 10],
  ],
  interval: 200,
  score: 0,
  init: function SnakeFunction() {
    snake.direction = "right";
    snake.position = [
      [6, 10],
      [7, 10],
      [8, 10],
      [9, 10],
      [10, 10],
    ];
    snake.interval = 200;

    snake.score = 0;
    snakeTable.innerHTML = "";
    tableCreation();
  },
};
// init game
snake.init();

start.addEventListener("click", startSnake);

// start game
function startSnake() {
  modul.classList.add("hidden");

  renderSnake();
  randomFood();
  // interval, heart of the game
  setInt = setInterval(function moveMent() {
    move();
  }, snake.interval);
}

// end of game
function stopp() {
  clearInterval(setInt);

  start.querySelector("span").innerHTML = snake.score + " Points !";
  setTimeout(function menuStart() {
    start.querySelector("span").innerHTML = "Play Snake";
  }, 1500);
  snake.init();
  modul.classList.remove("hidden");
}

// move the snake function
function move() {
  hitFood();
  hitBorder();
  hitSnake();

  updatePositions();
  renderSnake();
  document.addEventListener("keydown", turn);

// Arrow key function

document.getElementById("leftArrow").addEventListener("click", leftTurn);

document.getElementById("upArrow").addEventListener("click", upTurn);

document.getElementById("downArrow").addEventListener("click", downTurn);

document.getElementById("rightArrow").addEventListener("click", rightTurn);

}

function updatePositions() {
  boxes[
    snake.position[0][0] + snake.position[0][1] * table.rowsCols
  ].classList.remove("snake");
  snake.position.shift();

  let head = snake.position[snake.position.length - 1];
  switch (snake.direction) {
    case "left":
      snake.position.push([head[0] - 1, head[1]]);
      break;
    case "up":
      snake.position.push([head[0], head[1] - 1]);
      break;
    case "right":
      snake.position.push([head[0] + 1, head[1]]);
      break;
    case "down":
      snake.position.push([head[0], head[1] + 1]);
      break;
  }
}

// checks border contact
function hitBorder() {
  let headPos = snake.position.length - 1;

  if (
    (snake.position[headPos][0] === table.rowsCols - 1 &&
      snake.direction === "right") ||
    (snake.position[headPos][0] === 0 && snake.direction === "left") ||
    (snake.position[headPos][1] === table.rowsCols - 1 &&
      snake.direction === "down") ||
    (snake.position[headPos][1] === 0 && snake.direction === "up")
  ) {
    stopp();
  }
}

// checks self contact
function hitSnake() {
  let headPos = snake.position.length - 1;
  for (let i = 0; i < headPos; i++) {
    if (snake.position[headPos].toString() === snake.position[i].toString()) {
      stopp();
    }
  }
}

// checks food contact
function hitFood() {
  let head = snake.position[snake.position.length - 1];
  let tail = snake.position[0];
  if (head.toString() === foodPos.toString()) {
    boxes[random].classList.remove("food");

    snake.position.unshift(tail);

    randomFood();

    snake.score++;

    clearInterval(setInt);
    snake.interval = snake.interval - snake.interval / 5;
    setInt = setInterval(function () {
      move();
    }, snake.interval);
  }
}

// random 'food'
function randomFood() {
  let randomX = Math.floor(Math.random() * table.rowsCols);
  let randomY = Math.floor(Math.random() * table.rowsCols);
  random = randomX + randomY * table.rowsCols;

  if (boxes[random].classList.contains("snake")) {
    randomX = Math.floor(Math.random() * table.rowsCols);
    randomY = Math.floor(Math.random() * table.rowsCols);
    random = randomX + randomY * table.rowsCols;
  }
  boxes[random].classList.add("food");
  foodPos = [randomX, randomY];
}

// render the snake
function renderSnake() {
  for (let i = 0; i < snake.position.length; i++) {
    boxes[
      snake.position[i][0] + snake.position[i][1] * table.rowsCols
    ].classList.add("snake");
  }
}

// keypress  turn
function turn(e) {
  switch (e.keyCode) {
    case 37: // left
      if (snake.direction === "right") return;
      snake.direction = "left";
      break;
    case 38: // up
      if (snake.direction === "down") return;
      snake.direction = "up";
      break;
    case 39: // right
      if (snake.direction === "left") return;
      snake.direction = "right";
      break;
    case 40: // down
      if (snake.direction === "up") return;
      snake.direction = "down";
      break;
  }
}

// table cretion
function tableCreation() {
  if (snakeTable.innerHTML === "") {
    for (let i = 0; i < table.boxes; i++) {
      let divElt = document.createElement("div");
      divElt.classList.add("box");
      snakeTable.appendChild(divElt);
      console.log(boxes);
    }
  }
 
}

function leftTurn() {
  // Handle up movement logic in your game
  if (snake.direction === "right") return;
      snake.direction = "left";
};


function upTurn() {
  // Handle left movement logic in your game
  if (snake.direction === "down") return;
      snake.direction = "up";
};


function downTurn() {
  // Handle right movement logic in your game
  if (snake.direction === "up") return;
      snake.direction = "down";
};

function rightTurn() {
  // Handle down movement logic in your game
  if (snake.direction === "left") return;
      snake.direction = "right";
};