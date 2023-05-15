const play_btn = document.getElementById('startGame'),
launcher = document.getElementById('launcher'),
gameSection = document.getElementById('game');

play_btn.addEventListener('click', () => {
    launcher.classList.add('hidden'); 
    gameSection.classList.remove('hidden');
    new Board(GRID_SETTINGS);
});

window.onload = () => {
    const highest_score = localStorage.getItem('max-score');
    [...document.getElementsByClassName('max-score')].map(e => highest_score ? e.innerHTML = highest_score : e.innerHTML = 0);
}