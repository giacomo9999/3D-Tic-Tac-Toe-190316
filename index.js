let boardSize;
const boardState = [];
let playerID = "X";
let playerMessage = document.querySelector(".intro");
// playerMessage.innerText = `player ${playerID} - make a move`;

function startTheGame() {
  let startDivsBox = document.createElement("div");
  startDivsBox.className = "box";

  let startDiv = document.createElement("div");
  startDiv.classList.add("dimScreen");
  let startMessage = document.createElement("h2");
  startMessage.innerText = `n-Tac-Toe`;
  startDivsBox.appendChild(startMessage);
  startDiv.appendChild(startDivsBox);

  // Get board size from user-- I don't understand this at all.
  // apply attributes to boardSizeForm
  const getBoardSizeForm = document.createElement("form");
  const input = document.createElement("input");
  getBoardSizeForm.appendChild(input);
  getBoardSizeForm.class = "board-size";
  getBoardSizeForm.name = name = "text_val";
  getBoardSizeForm.type = "text";
  const inputLabel = document.createElement("h4");
  inputLabel.innerText = "size of the grid (number of cells)?";

  getBoardSizeForm.onsubmit = submit;

  function submit(e) {
    e.preventDefault();
    e.stopPropagation();
    const val = input.value;
    console.log(val);
    boardSize = Number(val);
    buildBoard(boardSize);

    startDiv.style.display = "none";
  }
  getBoardSizeForm.submit = submit;
  // ------
  startDivsBox.appendChild(inputLabel);
  startDivsBox.appendChild(getBoardSizeForm);

  document.querySelector("body").appendChild(startDiv);
}

function endTheGame(playerID) {
  let endDivsBox = document.createElement("div");
  endDivsBox.className = "box";

  let darkDiv = document.createElement("div");
  darkDiv.classList.add("dimScreen");
  let winnerMessage = document.createElement("h2");
  winnerMessage.innerText = `player ${playerID} wins`;
  // darkDiv.appendChild(winnerMessage);

  endDivsBox.appendChild(winnerMessage);
  darkDiv.appendChild(endDivsBox);

  document.querySelector("body").appendChild(darkDiv);
}

// draw board based on boardSize; create array to monitor board state
function buildBoard() {
  // const boardSize = 3;
  // create HTML 'board' element and append to 'body'.
  playerMessage.innerText = `player ${playerID} - make a move`;
  let board = document.createElement("div");
  board.className = "board";
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(board);

  // build empty board in div; create checking array
  for (
    let boardLayerCount = 0;
    boardLayerCount <= boardSize - 1;
    boardLayerCount += 1
  ) {
    let boardLayer = document.createElement("table");
    boardState.push([]);

    for (
      let boardRowCount = 0;
      boardRowCount <= boardSize - 1;
      boardRowCount += 1
    ) {
      let boardRow = document.createElement("tr");
      boardState[boardLayerCount].push([]);

      for (
        let rowCellCount = 0;
        rowCellCount <= boardSize - 1;
        rowCellCount += 1
      ) {
        let rowCell = document.createElement("td");
        boardState[boardLayerCount][boardRowCount].push("-");
        rowCell.className =
          "cell-" +
          String(boardLayerCount) +
          String(boardRowCount) +
          String(rowCellCount);

        boardRow.appendChild(rowCell);
      }
      boardLayer.appendChild(boardRow);
    }
    board.appendChild(boardLayer);
  }

  // add event listener to board
  document.querySelector(".board").addEventListener("click", makeMove);

  function isValidMove(cellID) {
    if (
      boardState[Number(cellID[5])][Number(cellID[6])][Number(cellID[7])] ===
      "-"
    ) {
      return true;
    }
    return false;
  }

  function makeMove(e) {
    let cellID = e.target.className;
    if (!isValidMove(cellID)) {
      playerMessage.innerText = `not a valid move`;
    }

    if (playerID === "X" && isValidMove(cellID)) {
      e.target.style.backgroundColor = "red";
      // console.log(e.target.className);
      changeBoard(e.target.className, playerID);
      gameOver = isGameOver(boardState);
      // console.log("Game over?", gameOver);
      if (gameOver) {
        console.log("Game over.");
        endTheGame(playerID);
      }
      playerID = "O";
      playerMessage.innerText = `player ${playerID} - make a move`;
    } else if (playerID === "O" && isValidMove(cellID)) {
      e.target.style.backgroundColor = "blue";
      // console.log(e.target.className);
      changeBoard(e.target.className, playerID);
      gameOver = isGameOver(boardState);
      // console.log("Game over?", gameOver);
      if (gameOver) {
        console.log("Game over.");
        endTheGame(playerID);
      }
      playerID = "X";
      playerMessage.innerText = `player ${playerID} - make a move`;
    }
  }
}

// used by markCell - gets last 3 digits of cellID (x,y,z) and updates boardState(x,y,z) with playerID ('X' or 'O')
function changeBoard(cellID, playerID) {
  boardState[Number(cellID[5])][Number(cellID[6])][
    Number(cellID[7])
  ] = playerID;
  // console.log(boardState);
}

// logArray is only used for debugging
function logArray(arrIn) {
  for (let layer = 0; layer <= boardSize; layer++) {
    for (let row = boardSize; row >= 0; row--) {
      console.log(arrIn[layer][row]);
    }
    console.log("----");
  }
}

function isGameOver(array) {
  function allTheSame(arrayIn) {
    // console.log('array: ', arrayIn);
    let testVal = arrayIn[0];
    if (testVal === "-") return false;
    let yesTheSame = true;
    for (let i = 1; i < arrayIn.length; i++) {
      if (arrayIn[i] !== testVal) yesTheSame = false;
    }
    return yesTheSame;
  }

  function checkRows(arrIn) {
    for (let layer = 0; layer <= boardSize - 1; layer++) {
      for (let row = 0; row <= boardSize - 1; row++) {
        let tempArr = arrIn[layer][row];
        // console.log(layer, row, tempArr);
        if (allTheSame(tempArr)) {
          return true;
        }
      }
    }
    return false;
  }

  function checkColumns(arrIn) {
    for (let layer = 0; layer <= boardSize - 1; layer++) {
      for (let column = 0; column <= boardSize - 1; column++) {
        let tempArr = [];
        for (let row = 0; row <= boardSize - 1; row++) {
          tempArr.push(arrIn[layer][row][column]);
        }
        if (allTheSame(tempArr)) {
          return true;
        }
      }
    }
    return false;
  }

  function checkStacks(arrIn) {
    for (let row = 0; row <= boardSize - 1; row++) {
      for (let column = 0; column <= boardSize - 1; column++) {
        let tempArr = [];
        for (let layer = 0; layer <= boardSize - 1; layer++) {
          tempArr.push(arrIn[layer][row][column]);
        }
        if (allTheSame(tempArr)) {
          return true;
        }
      }
    }
    return false;
  }

  function checkDiags(arrIn) {
    const tempArrDiag = [];
    for (let fixedVar = 0; fixedVar <= boardSize - 1; fixedVar++) {
      for (let i = 1; i <= 10; i++) {
        tempArrDiag[i] = [];
      }
      // 9 and 10 are out of order because they represent two diagonals that I initially forgot: I'll rename/reorder all of them at some point to make everything clearer.
      for (let mobileVar = 0; mobileVar <= boardSize - 1; mobileVar++) {
        // check "short" diagonals
        tempArrDiag[1].push(arrIn[mobileVar][fixedVar][mobileVar]);
        tempArrDiag[2].push(
          arrIn[boardSize - 1 - mobileVar][fixedVar][mobileVar]
        );
        tempArrDiag[3].push(arrIn[mobileVar][mobileVar][fixedVar]);
        tempArrDiag[4].push(
          arrIn[boardSize - 1 - mobileVar][mobileVar][fixedVar]
        );
        tempArrDiag[9].push(
          arrIn[fixedVar][boardSize - 1 - mobileVar][mobileVar]
        );
        tempArrDiag[10].push(arrIn[fixedVar][mobileVar][mobileVar]);
        // checks long diagonals repeatedly, rather than create a separate loop
        tempArrDiag[5].push(
          arrIn[boardSize - 1 - mobileVar][mobileVar][mobileVar]
        );
        tempArrDiag[6].push(arrIn[mobileVar][mobileVar][mobileVar]);
        tempArrDiag[7].push(
          arrIn[boardSize - 1 - mobileVar][boardSize - 1 - mobileVar][mobileVar]
        );
        tempArrDiag[8].push(
          arrIn[boardSize - 1 - mobileVar][mobileVar][boardSize - 1 - mobileVar]
        );
      }

      for (let i = 1; i <= 10; i++) {
        if (allTheSame(tempArrDiag[i])) {
          return true;
        }
      }
    }
    return false;
  }

  if (
    checkRows(array) ||
    checkColumns(array) ||
    checkStacks(array) ||
    checkDiags(array)
  )
    return true;
  return false;
}

// testArray only used for testing functions
const testArray = [
  [["X", "O", "-"], ["-", "O", "-"], ["-", "-", "X"]],
  [["-", "O", "-"], ["-", "-", "-"], ["-", "-", "X"]],
  [["-", "-", "-"], ["X", "-", "-"], ["-", "-", "X"]]
];

startTheGame();
