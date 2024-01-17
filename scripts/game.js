function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    '<span id="winner-name">PLAYER NAME</span>님의 승리!';
  gameOverElement.style.display = 'none';

  // reset game data
  gameData.forEach((v, i) => {
    gameData[i] = v.map(() => 0);
  });

  // reset game board
  for (const e of gameBoardElement.children) {
    if (e.classList.length > 0) {
      e.classList.remove('disabled');
      e.textContent = '';
    }
  }
}

function startNewGame() {
  resetGameStatus();

  if (players[0].name === '' || players[1].name === '') {
    alert('두 플레이어의 이름을 모두 설정해주세요!');
    return;
  }

  activePlayer += Math.round(Math.random()); // 플레이어 1과 2 중 시작 선수 랜덤뽑기
  activePlayerNameElement.textContent = players[activePlayer].name;
  
  gameBoardAreaElement.style.display = 'block';
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(e) {
  if (e.target.tagName !== 'LI' || gameIsOver) {
    return;
  }

  const selectedField = e.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert('비어있는 곳을 클릭해주세요 🙄');
    return;
  }
  
  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add('disabled');

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  
  if (winnerId !== 0) {
    endGame(winnerId);
  }
  
  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  // 행 검사
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // 열 검사
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // 대각선 검사
  // 좌상단에서 우하단
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
		return gameData[0][0];
  }
  // 우상단에서 좌하단
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  // 무승부
  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = 'block';

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = `무승부입니다!`
  }
}