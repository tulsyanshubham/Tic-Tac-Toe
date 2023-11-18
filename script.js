// ❌⭕🙈🐼
let turnaudio = new Audio("./audio/ting trim.mp3");
let gamemover = new Audio("./audio/gameover.mp3");
let winaudio = new Audio("./audio/win.mp3");

let turn = "❌";

let turnhtml = document.querySelector(".turn");
// console.log(turnhtml.innerText)
let over = false;
let count = 0;

const size = window.matchMedia("(max-width: 820px)");

const changeturn = () => {
  return turn == "❌" ? "⭕" : "❌";
};

let x = 0,
  o = 0,
  turns = 0;

let spanbox = document.querySelectorAll(".sbox");

let line = document.querySelector(".line");

let boxes = document.querySelectorAll(".box");

let round = document.querySelector(".round").querySelector("span");
let xp = document.querySelector(".xp").querySelector("span");
let op = document.querySelector(".op").querySelector("span");
console.log(round.innerText, xp.innerText, op.innerText);

const checkwin = () => {
  // console.log(spanbox.innerText);

  let wins = [
    [0, 1, 2, 31, 0, 0, 0, 65, 2.5, 5.9],
    [3, 4, 5, 31, 0, 12.5, 0, 65, 2.5, 30.9],
    [6, 7, 8, 31, 0, 24.6, 0, 65, 2.5, 56.2],
    [0, 3, 6, 31, -12.2, 12.5, 90, 65, -22.5, 31.6],
    [1, 4, 7, 31, 0, 12.5, 90, 65, 2.5555, 31.6],
    [2, 5, 8, 31, 12.2, 12.5, 90, 65, 27.8, 31.6],
    [0, 4, 8, 40, -4.4, 12.3, 45, 84, -6.8, 31],
    [2, 4, 6, 40, -4.7, 12.4, -45, 84, -7.8, 31],
  ];
  wins.forEach((e) => {});
  wins.forEach((e) => {
    if (
      spanbox[e[0]].innerText === spanbox[e[1]].innerText &&
      spanbox[e[1]].innerText === spanbox[e[2]].innerText &&
      spanbox[e[0]].innerText !== "" &&
      spanbox[e[0]].innerText !== "🐼"
    ) {
      turnhtml.innerText = spanbox[e[0]].innerText + " Wins";
      winaudio.play();
      // turns+=1;
      // round.innerText = turns;
      spanbox.forEach((e) => {
        if (!e.innerText) {
          e.innerText = "🐼";
          count = count + 1;
        }
      });
      spanbox[e[0]].innerText === "❌" ? (x += 1) : (o += 1);
      xp.innerText = x;
      op.innerText = o;

      over = true;
      if (size.matches) {
        document.querySelector(".imgbox").querySelector("img").style.width =
          "30vw";
        line.style.width = `${e[7]}vw`;
        line.style.transform = `translate(${e[8]}vw, ${e[9]}vw) rotate(${e[6]}deg)`;
      } else {
        document.querySelector(".imgbox").querySelector("img").style.width =
          "17vw";
        line.style.width = `${e[3]}vw`;
        line.style.transform = `translate(${e[4]}vw, ${e[5]}vw) rotate(${e[6]}deg)`;
      }
    }
  });
};

//Game Logic

// console.log(boxes)
boxes.forEach((e) => {
  // console.log(e)
  let sbox = e.querySelector(".sbox");
  e.addEventListener("click", () => {
    count = count + 1;
    if (sbox.innerText === "") {
      sbox.innerText = turn;
      turnaudio.play();
      turn = changeturn();
      // console.log(turn)
      checkwin();
      if (!over) {
        turnhtml.innerText = "Turn for " + turn;
      }
      if (count === 9) {
        if (!over) {
          turnhtml.innerText = "Draw 😶";
          gamemover.play();
        }
        turns += 1;
        round.innerText = turns;
        count = 0;
      }
    }
  });
});

// reset
let reset = document.querySelector(".replay");
reset.addEventListener("click", () => {
  // spanbox.forEach.innerText = '';
  spanbox.forEach((e) => {
    e.innerText = "";
  });
  turnhtml.innerText = "Turn for " + turn;
  over = false;
  document.querySelector(".imgbox").querySelector("img").style.width = "0";
  line.style.width = 0;
  count = 0;
});
