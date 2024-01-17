function openPlayerConfig(e) {
  editedPlayer = +e.target.dataset.playerid;
  playerConfigOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
};
 
function closePlayerConfig() {
  playerConfigOverlayElement.style.display = 'none';
  backdropElement.style.display = 'none';
  formElement.firstElementChild.classList.remove('error');
  errorsOutputElement.textContent = '';
  formElement.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const enteredPlayername = formData.get('playername').trim(); // '      ' => ''

  if (!enteredPlayername) { // enteredPlayername === ''
    e.target.firstElementChild.classList.add('error');
    errorsOutputElement.textContent = '이름을 입력해주세요!';
    return; // return 반환 시 호출된 함수(여기서 savePlayerConfig)의 실행이 중단됨
  }

  const updatedPlayerDataElement = document.getElementById(`player-${editedPlayer}-data`)
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;

  players[editedPlayer - 1].name = enteredPlayername;

  closePlayerConfig();
}