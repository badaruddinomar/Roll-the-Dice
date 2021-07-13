
"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const current1El = document.getElementById("current--1");
const current0El = document.getElementById("current--0");

let currentScore,activePlayer,score,playing;

const init = function(){


  currentScore = 0;
  activePlayer = 0;
  score = [0,0]
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  btnRoll.classList.remove("hidden")


  player0El.classList.add("player--active")
  player1El.classList.remove("player--active")
  player0El.classList.remove("player--winner")
  player1El.classList.remove("player--winner")

}
init();


const switchPlayer = function(){

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;

  
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}    
btnRoll.addEventListener("click",function(){

  if(playing){
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.textContent = dice;
    diceEl.classList.remove("hidden");
  
    if(dice === 6){
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else if(dice === 1|| 2 || 3 || 4 || 5){
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      btnRoll.classList.add("hidden")
    }
    
    else{
      switchPlayer();
      btnRoll.classList.remove("hidden")
    }
  }
 
})
btnHold.addEventListener("click",function(){
  if(playing){
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer]

    if(score[activePlayer] >= 30){
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
      diceEl.classList.add('hidden')
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")
    }else{
      switchPlayer()
      btnRoll.classList.remove("hidden")
    }
  }
})
btnNew.addEventListener("click",init)
