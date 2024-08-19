let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let newLevel = 0;

let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");

h4.addEventListener("click", function(){
    if(started == false){
        console.log("Game started");
        started = true;

        levelUp();
    }    
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() { 
        btn.classList.remove("flash");
    }, 200);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    if(newLevel < level) {
        newLevel = level;
    }
    h2.innerText = `Level ${level}`;

    //random btn choose
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);   
}

function highScore(level) {
    if(newLevel > level) {
        document.querySelector("h3").innerText = `High Score: ${newLevel}`;
    } else {
        document.querySelector("h3").innerText = `High Score: ${level}`;
    }
}

function checkAns(idx) {
    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 700);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}<b> <br> Press Start to play`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "rgba(0, 255, 255, 0.262)";
        },200)
        highScore(level);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1)
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}