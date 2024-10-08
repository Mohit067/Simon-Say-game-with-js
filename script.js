document.addEventListener("DOMContentLoaded", () => {
    let btns = ["yellow", "green", "red", "purple"];
    let gameSeq = [];
    let userSeq = [];
    let level = 0;
    let heighestScore = 0;
    let gameStart = false;
    let head = document.querySelector("h3");
    

    function heighScore(){
        if (level > heighestScore) {
            heighestScore = level;  // Update highest score
        }
        head.innerHTML += `<br>Your highest score is <b>${heighestScore}</b>`; // Display highest score
    }


    function reset(){
        gameStart = false;
        gameSeq = [];
        userSeq = [];
        level = 0;

    }

    function checkAns(idx){
        if(gameSeq[idx] === userSeq[idx]){
            if(userSeq.length == gameSeq.length){
                setTimeout(levelUp, 1000);
            }
        }
        else{
            head.innerHTML = `Game over! your scroe was <b>${level}</b> <br> press any key to restart`;
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(() => {
                document.querySelector("body").style.backgroundColor = "white";
            }, 150);
            heighScore();
            reset();
        }
    }

    function userFlash(btn){
        btn.classList.add("userFlash");
        setTimeout(() => {
            btn.classList.remove("userFlash");
        }, 250);
    }
    
    function btnPress(){
        let btn = this;
        userFlash(btn);  

        userColor = btn.getAttribute("id");
        userSeq.push(userColor);

        checkAns(userSeq.length-1);
    }

    let allBtns = document.querySelectorAll(".box");
    for(btn of allBtns){
        btn.addEventListener("click", btnPress);
    }

    function gameFlash(btn){
        btn.classList.add("flash");
        setTimeout(() => {
            btn.classList.remove("flash");
        }, 250);
    }

    function levelUp(){
        userSeq = [];
        level++;
        head.innerText = `Level ${level}`; 
    
        let randomIdx = Math.floor(Math.random() * 4);
        let randomColor = btns[randomIdx];
        let randomBtn = document.querySelector(`.${randomColor}`);
        gameSeq.push(randomColor);
        console.log(gameSeq);
        gameFlash(randomBtn);
    
    }
    document.addEventListener("keypress" , () => {
        if(gameStart == false){//game start
            gameStart = true;
        }
        levelUp();
    })    
})