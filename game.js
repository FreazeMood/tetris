const play_btn = document.getElementById('startGame'),
launcher = document.getElementById('launcher'),
gameSection = document.getElementById('game');

play_btn.addEventListener('click', () => {
    launcher.classList.add('hidden'); 
    gameSection.classList.remove('hidden');
    let board = new Board(GRID_SETTINGS);
    board.createNewBoard();
    console.log(board.board);
})
