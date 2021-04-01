let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid black";

// load all images
//let bg = document.createElement('img')
let bg = new Image();
bg.src = "./images/bg.png";

let fg = new Image();
fg.src = "./images/fg.png";

let bird = new Image();
bird.src = "./images/bird.png";

let pipeNorth = new Image();
pipeNorth.src = "./images/pipeNorth.png";

let pipeSouth = new Image();
pipeSouth.src = "./images/pipeSouth.png";

let intervalId = 0;
let isGameOver = false;
let score = 0;
let pipeX = 200;
let birdX = 30,
  birdY = 30,
  birdIncr = 2;

// event listeners for the bird movements
document.addEventListener("mousedown", () => {
  birdIncr = -5;
});

document.addEventListener("mouseup", () => {
  birdIncr = 2;
});

// number of pipes you need
let pipes = [
  { x: 200, y: 0 },
  { x: 400, y: -100 },
];

function draw() {
  // adding background image
  ctx.drawImage(bg, 0, 0);

  //adding bird image
  ctx.drawImage(bird, birdX, birdY);
  let distanceBetweenPipes = 100;
  let constant = pipeNorth.height + distanceBetweenPipes;

  // making the pipes moves
  for (let i = 0; i < pipes.length; i++) {
    // this section draws both parts of the pipe
    ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y); // draws top pipe
    ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + constant); // draws bottom pipe

    // movevement of the pipes
    pipes[i].x = pipes[i].x - 1;

    // checking if pipe arrives to the edge of the screen. If so. increase score.
    if (pipes[i].x == 20) {
      score++;
    }

    // making an infinite loop for the pipes
    // when the pipe reaches the edge. It will change the new x and y values. Putting it at the back of the pipes.
    if (pipes[i].x + pipeNorth.width < 0) {
      pipes[i] = {
        x: 400,
        y: -Math.floor(Math.random() * pipeNorth.height),
      };
    }
    //collision needs to happend for every pipe/enemy

    if (
      birdX + bird.width > pipes[i].x &&
      birdX + bird.width < pipes[i].x + pipeNorth.width &&
      birdY > pipes[i].y &&
      birdY < pipes[i].y + pipeNorth.height
    ) {
      isGameOver = true;
      console.log("The upper part");
      console.log(
        `bird x:${birdX} & bird y:${birdY}  bird width:${bird.width} & bird height:${bird.height}`
      );
      console.log(`pipe x:${pipes[i].x} & pipe y:${pipes[i].y} `);
      console.log(
        `pipeNorth width:${pipeNorth.width} & pipeNorth height:${pipeNorth.height}`
      );
    }
    if (
      birdX + bird.width > pipes[i].x &&
      birdX + bird.width < pipes[i].x + pipeNorth.width &&
      birdY + bird.height > pipes[i].y + constant &&
      birdY < pipes[i].y + constant + pipeSouth.height
    ) {
      isGameOver = true;
      console.log("The lower part");
      console.log(
        `bird x:${birdX} & bird y:${birdY}  bird width:${bird.width} & bird height:${bird.height}`
      );
      console.log(`pipe x:${pipes[i].x} & pipe y:${pipes[i].y} `);
      console.log(
        `pipeSouth width:${pipeSouth.width} & pipeSouth height:${pipeSouth.height}`
      );
      console.log(`The constant is ${constant}`);
    }
  }
  ctx.drawImage(fg, 0, canvas.height - fg.height);

  ctx.font = "22px Verdana";
  ctx.fillText(`Score is: ${score}`, 20, canvas.height - 50);

  if (birdY + bird.height > canvas.height - fg.height) {
    isGameOver = true;
  } else {
    //bird animation
    birdY = birdY + birdIncr;
  }

  //animation conditions
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
  } else {
    intervalId = requestAnimationFrame(draw);
  }
}

let audio = new Audio(
  "https://res.cloudinary.com/manishp/video/upload/v1615874740/aom/home_bhfqfk.mp3"
);
window.addEventListener("load", () => {
  //audio.play()
  // audio.pause()
  draw();
});
