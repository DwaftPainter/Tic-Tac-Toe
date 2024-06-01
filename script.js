const boardElement = document.querySelector('.board');
const subText = document.querySelector('.results');
const playAgain = document.querySelector('.reset');
const XScore = document.querySelector('.x-side [data-result]')
const OScore = document.querySelector('.o-side [data-result]')
const tieScore = document.querySelector('.tie [data-result]')
const board = createBoard();
const gameState = Array(3).fill().map(() => Array(3).fill(0)) ;
let player = 1; 
let tie = 0; 
let X = 0;
let O = 0;


board.forEach(row => {
  row.forEach(cell => {
    cell.element.addEventListener("click", () => {
      if (gameState[cell.x][cell.y] !== 0) {
        return;
      }
      if(player === 1) {
        cell.element.innerHTML = '<img src="assets/letter-o.png"></img>'
        gameState[cell.x][cell.y] = player;
      }
      else {
        cell.element.innerHTML = '<img src="assets/close.png"></img>'
        gameState[cell.x][cell.y] = player;
      }

      if (checkGameEnd()) {
        subText.textContent = `Player ${player} has won!`;
        playAgain.style.display = "block";
        if (player === 1) {
          O += 1;
          displayScore();
        } else {
          X += 1;
          displayScore();
        }
      } else if (checkTie()) {
        // subText.textContent = 'Game Tie'
        tie += 1;
        displayScore();
        playAgain.style.display = "block";
      }
      player = 3 - player;
    })
  })
})

function createBoard() {
  const board = [];
  
  for (let x = 0; x < 3; x++) {
    const row = []
    for (let y = 0; y < 3; y++){
      const element = document.createElement("div");
      element.classList.add("cell")

      const cell = {
        x,
        y,
        element
      }
      row.push(cell);
    }
    board.push(row)
  }

  board.forEach(row => {
    row.forEach(cell => {
    boardElement.append(cell.element); 
    })
  })

  return board
}

function checkGameEnd() {
  for(let i = 0; i < 3; i++) {
    if(gameState[i][0] !== 0 && gameState[i][0] == gameState[i][1] && gameState[i][1] == gameState[i][2]) {
      boardElement.addEventListener('click', stopPro, {capture: true});
      return true;
    }
    if(gameState[0][i] !== 0 && gameState[0][i] == gameState[1][i] && gameState[1][i] == gameState[2][i]) {
      boardElement.addEventListener('click', stopPro, {capture: true});
      return true;
    }
  }

  if(gameState[0][0] !== 0 && gameState[0][0] == gameState[1][1] && gameState[1][1] == gameState[2][2]) {
    boardElement.addEventListener('click', stopPro, {capture: true});
    return true;
  }
  if(gameState[2][0] !== 0 && gameState[2][0] == gameState[1][1] && gameState[1][1] == gameState[0][2]) {
    boardElement.addEventListener('click', stopPro, {capture: true});
    return true;
  }

  return false;
}

function checkTie() {
  return gameState.flat().every(cell => cell !== 0);
}

function stopPro(e) {
  e.stopImmediatePropagation()
}

playAgain.addEventListener('click', () => {
  setTimeout(() => {
    playAgain.style.display = "none";
  }, 100);
  gameState.forEach(cell => cell.fill(0));
  board.forEach(row => {
    row.forEach(cell => {
      cell.element.innerHTML = '';
    })
  })
  player = 1;
  boardElement.removeEventListener('click', stopPro, {capture: true});
}) 

function displayScore() {
  setTimeout ( () => {
    subText.innerHTML= `<div class="o-side case">
    <img src="assets/letter-o.png" alt="#">
    <p class="sub-text"><span data-result>${O}</span> WINS</p>
  </div>
  <div class="x-side case">
    <img src="assets/close.png" alt="#">
    <p class="sub-text"><span data-result>${X}</span> WINS</p>
  </div>
  <div class="tie case">
    <img src="assets/scales.png" alt="#">
    <p class="sub-text"><span data-result>${tie}</span> TIES</p>
  </div>`;
}, 1000)
}