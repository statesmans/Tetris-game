let tetroBottle = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let previewNextTetro = [
  [0, 0, 0, 0,],
  [0, 0, 0, 0,],
  [0, 0, 0, 0,],
  [0, 0, 0, 0,]
]



let tetrominos = {
  I: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],

  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],

  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],

  O: [
    [1, 1],
    [1, 1],
  ],

  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],

  T: [
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, 1],
  ],

  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

let figures = ["I", "J", "L", "O", "S", "T", "Z"];

let inputName = document.getElementById("input-name")
let userName = inputName.value;
    score = document.getElementById("score-count");

inputName.addEventListener("keydown", (e) => {
  if (inputName.value.length > 10) {
    let alert = document.getElementById('input-name__alert')
    alert.innerText = 'Nickname must be less than 10 characters'
    alert.style.background = 'white'
  }
  if (e.keyCode == 13 && inputName.value.length < 10) {
    
    let enterWindow = (document.getElementById("write-name").style.display = "none");
    let userNameScore = (document.getElementById("score__user-name").innerText = `${inputName.value}`);
    document.body.addEventListener("keydown", controlEvents)
    renderTetroBottle();
    setTimeout(startGame, 1000)
    setNextTetro()

  }
});

let activeTetro = {
  Y: -1,
  X: 3,
  tetromino: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
};




var ctx = document.getElementById("tetro-block").getContext("2d");

function renderTetroBottle() {
  document.getElementById("tetris-main").style.display = "flex";
  document.body.style.alignItems = "center";

  for (Y = 0; Y < tetroBottle.length; Y++) {
    for (X = 0; X < tetroBottle[Y].length; X++) {
      xAsix = X * 50;
      yAsix = Y * 50;
      ctx.beginPath();
      ctx.rect(xAsix, yAsix, 50, 50);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.strokeStyle = "black";
      ctx.fill();
      ctx.stroke();

      if (tetroBottle[Y][X] == 0) {
        ctx.clearRect(xAsix, yAsix, 50, 50);
        ctx.rect(xAsix, yAsix, 50, 50);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();
      }

      if (tetroBottle[Y][X] == 1) {
        ctx.fillStyle = "rgba(255, 0, 0, 1)";
        ctx.fill();
      }

      if (tetroBottle[Y][X] == 2) {
        ctx.fillStyle = "rgba(0, 255, 0, 1)";
        ctx.fill();
      }
    }
  }
}


let randomFigureLetter = figures[Math.floor(Math.random() * figures.length)]

function setNextTetro () {

  randomFigureLetter = figures[Math.floor(Math.random() * figures.length)]

  let nextTetroField = document.getElementById("teris-preview"),
      nextTetroCtx = document.getElementById("teris-preview").getContext('2d'),
      nextTetro = tetrominos[randomFigureLetter].slice()

  for (Y = 0; Y < 5; Y++) {
    for (X = 0; X < 4; X++) {
      xAsix = X * 50;
      yAsix = Y * 50;
      nextTetroCtx.clearRect(xAsix, yAsix, 50, 50)
      nextTetroCtx.beginPath();
      nextTetroCtx.rect(xAsix, yAsix, 50, 50);
      nextTetroCtx.closePath();
      nextTetroCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
      nextTetroCtx.strokeStyle = "black";
      nextTetroCtx.fill();
      nextTetroCtx.stroke();



      if (nextTetro[Y] && nextTetro[Y][X] == 1) {
        nextTetroCtx.fillStyle = "rgba(255, 0, 0, 1)";
        nextTetroCtx.fill();
      }

    }
  }
}



function canSetRandomFigure() {
  var canSetRandomFigure = true;
  for (Y = tetroBottle.length - 1; Y >= 3; Y--) {
    for (X = 0; X < tetroBottle[Y].length; X++) {
      if (tetroBottle[Y][X] == 1) {
        canSetRandomFigure = false;
      }
    }
  }
  if (canSetRandomFigure) {
    activeTetro.tetromino = tetrominos[randomFigureLetter].slice();
  }
}

// Fixed tetro

function fixTetro() {
  for (Y = tetroBottle.length - 1; Y >= 0; Y--) {
    for (X = 0; X < tetroBottle[Y].length; X++) {
      if (tetroBottle[Y][X] == 1) {
        tetroBottle[Y][X] = 2;
      }
    }
  }

}

function removePrevTetro() {
  for (Y = 0; Y < tetroBottle.length; Y++) {
    for (X = 0; X < tetroBottle[Y].length; X++) {
      if (tetroBottle[Y][X] == 1) {
        tetroBottle[Y][X] = 0;
      }
    }
  }
}

function renderActiveTetro() {
  removePrevTetro();
 

  for (Y = activeTetro.tetromino.length - 1; Y >= 0; Y--) {
    for (X = 0; X < activeTetro.tetromino.length; X++) {
      if (activeTetro.tetromino[Y][X] === 1) {
          tetroBottle[activeTetro.Y + Y][activeTetro.X + X] = activeTetro.tetromino[Y][X];
      }
    }
  }
}


let scoreRemovedLine = 0;

// Check full rows

function removeFullLine() {
  let canRemoveLine = true;
  for (Y = 0; Y < tetroBottle.length; Y++) {
    for (X = 0; X < tetroBottle[Y].length; X++) {
      if (tetroBottle[Y][X] !== 2) {
        canRemoveLine = false;
        break;
      }
    }
    if (canRemoveLine === true) {
      tetroBottle[Y] = [0, 0, 0, 0, 0, 0, 0, 0];
      removeFixedTetro();
      scoreRemovedLine += 100;
      score.innerText = scoreRemovedLine;
    }
    canRemoveLine = true;
  }
}

function removeFixedTetro() {
  for (Y = tetroBottle.length - 1; Y > 0; Y--) {
    for (X = 0; X < 8; X++) {
      if (tetroBottle[Y][X] === 2 && tetroBottle[Y + 1] && tetroBottle[Y + 1][X] == 0) {
        tetroBottle[Y][X] = 0;

        tetroBottle[Y + 1][X] = 2;
      }
    }
  }
}

function outOfLimit() {
  for (Y = 0; Y < activeTetro.tetromino.length; Y++) {
    for (X = 0; X < activeTetro.tetromino[Y].length; X++) {
      if (
        activeTetro.tetromino[Y][X] == 1&&
        (tetroBottle[activeTetro.Y + Y + 1] === undefined ||
         tetroBottle[activeTetro.Y + Y][activeTetro.X + X] === undefined ||
         tetroBottle[activeTetro.Y + Y + 1][activeTetro.X + X] === 2 || tetroBottle[activeTetro.Y + Y][activeTetro.X + X + 1] === 2)
      ) {
        return true;
      }
    }
  }
  return false;
}

function forwardTetro() {
  const prevTetroState = activeTetro.tetromino;
  
  activeTetro.tetromino = activeTetro.tetromino[0].map((val, index) =>
    activeTetro.tetromino.map((row) => row[index]).reverse()
  );
  if (outOfLimit()) {
    activeTetro.tetromino = prevTetroState;
  }
  renderActiveTetro()
  renderTetroBottle()
}

function moveTetroDown() {

  activeTetro.Y += 1;
  renderActiveTetro()
  renderTetroBottle()

  if (outOfLimit()) {
    fixTetro();
    removeFullLine();
    canSetRandomFigure();
    setNextTetro()
    activeTetro.X = 3;
    activeTetro.Y = 0;
    renderActiveTetro()
    renderTetroBottle()
  }

}

// Keyboard events
let controlEvents = (e) => {
  
  // Move tetro to left
  if (e.keyCode == 65 || e.keyCode == 37) {
    activeTetro.X -= 1;
    if (outOfLimit()) {
      activeTetro.X += 1;
    }
    renderActiveTetro()
    renderTetroBottle()
  } else 

  // Move tetro to right
  if (e.keyCode == 68 || e.keyCode == 39) {
    activeTetro.X += 1;
    if (outOfLimit()) {
      activeTetro.X -= 1;
    }
    renderActiveTetro()
    renderTetroBottle()
  } else 

  // Move tetro to down
  if (e.keyCode == 83 || e.keyCode == 40) {
      window.requestAnimationFrame(moveTetroDown)
  } else 
  
  // Forward tetro
  if (e.keyCode == 87 || e.keyCode == 38) {
    forwardTetro();
  }
}


// Game end check
function endGame () {
  for (Y = 0; Y <= 2; Y++) {
    for (X = 0; X < tetroBottle[Y].length; X++) {
      if (tetroBottle[Y][X] === 2) {
        return true
      }
    }
  }
  return false
}


function getResult() {
  try {
    const result = JSON.parse(localStorage.getItem('Users'));

    if (!result) {
      return [];
    }

    return result;
  } catch (e) {
    return [];
  }
}

function addUserToResults(name, score) {
  const result = getResult();

  result.push({ name, score });

  const sortedResult = result.sort((a, b) => a.score > b.score ? 1 : -1).slice(0, 10);

  localStorage.setItem('Users', JSON.stringify(sortedResult));
  displayResult()
}

function displayResult() {
  let tableScore = document.getElementById('score-table').style.display = 'block'

  const result = getResult();
  result.forEach(element => {
    let user = document.getElementById('score-table').appendChild(document.createElement('div'))
    user.classList.add('user')
    user.appendChild(document.createElement('div')).innerText = element.name
    user.appendChild(document.createElement('div')).innerText = element.score
  });
}



var framesToSkip = 60,
    counter = 0;

function startGame() {
  if (endGame()) {
    document.body.removeEventListener("keydown", controlEvents)
    addUserToResults(inputName.value, scoreRemovedLine)
    return cancelAnimationFrame(startGame)
  }

  // Set speed of game

  switch(scoreRemovedLine) {
    case 700: framesToSkip = 50
    break;

    case 1400: framesToSkip = 40
    break;

    case 1800: framesToSkip = 35
    break;

    case 2100: framesToSkip = 30
    break;

    case 2700: framesToSkip = 25
    break;
  }


  if (counter < framesToSkip) {
      counter++;
      return requestAnimationFrame(startGame); 
  }

  moveTetroDown();
  counter = 0;
  requestAnimationFrame(startGame);
}





