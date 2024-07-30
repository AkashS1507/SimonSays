let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "blue", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let button = document.querySelector("button");

document.addEventListener("keypress", () => {
    if (!started) {
        console.log("Game Started");
        started = true;
        button.style.display = "none";
        levelup();
    }
});

document.querySelector("button").addEventListener("click", () => {
    if (!started) {
        console.log("Game Started");
        started = true;
        button.style.display = "none";
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(() => {
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `<span style="color:red;">Game Over! Your Score: ${level} </span><br>(Press any key to start)`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
            reset();
        }, 200);
        
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach(btn => btn.addEventListener("click", btnPress));

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    document.querySelector("body").style.backgroundColor = "white";
    button.style.display = "block";
    button.style.margin = "0 auto";
    button.innerText = "Restart";
}
