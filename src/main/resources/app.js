/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores,roundScore,activePlayer,gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        //1.Random number
        var dice = Math.floor(Math.random()*6)+1;

        //2.display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display='block';
        diceDOM.src='dice-'+dice+'.png';

        //3.update the round score id the rolled number was not a 1
        if(dice !== 1){
            //add score
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }else{
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click',function (){
    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the ui
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if(scores[activePlayer]>=100){
            document.querySelector('#name-'+activePlayer).textContent='Winner!';
            document.querySelector('.dice').style.display='none';
            //css가 많다면 이런 식의 코드는 부적합하다
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('winner');
            gamePlaying=false;
        }else{
            nextPlayer();
        }
    }

});

function nextPlayer(){
    //next player
    activePlayer === 0?activePlayer =1:activePlayer=0;
    roundScore =0;

    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');

    //    document.querySelector('.player-0-panel').classList.toggle('active');
    //    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display='none';

}

    document.querySelector('.btn-new').addEventListener('click',init);
//init()대신 init을 작성하는 이유 init함수를 무조건 실행하고 싶지 않기 때문
function init(){
    scores = [0, 0];
    activePlayer=0;
    roundScore=0;
    gamePlaying = true;

    document.querySelector('.dice').style.display='none';
    document.getElementById('score-0').textContent ='0';
    document.getElementById('score-1').textContent ='0';
    document.getElementById('current-0').textContent ='0';
    document.getElementById('current-1').textContent ='0';
    document.querySelector('#name-0').textContent='Player 1';
    document.querySelector('#name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// document.querySelector('#current-'+activePlayer).textContent = dice;
// querySelector : 찾으려는 String의 가장 첫번째 값을 가져온다
//document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'</em>';

//var x = document.querySelector('#score-0').textContent;
