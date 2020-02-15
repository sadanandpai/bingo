navigator.serviceWorker.register("../../sw.js");

userTurn = "X";
var winner = "";

window.addEventListener("click", evt => {
  if (
    evt.srcElement.className.includes("box") &&
    evt.srcElement.textContent == "" &&
    winner === ""
  ) {
    evt.srcElement.textContent = userTurn;
    userTurn = userTurn == "X" ? "O" : "X";

    checkWinnerAlgorithm();
  }
});

function checkWinnerAlgorithm() {
  let code = "";
  for (let i = 0; i < 9; i = i + 3) {
    code = document.getElementById("square" + i).textContent;
    if (
      code !== '' && code === document.getElementById("square" + (i + 1)).textContent &&
      code === document.getElementById("square" + (i + 2)).textContent
    ) {
      winner = code;
    }
  }

  for (let i = 0; i < 3; i++) {
    code = document.getElementById("square" + i).textContent;
    if (
      code !== '' && code === document.getElementById("square" + (i + 3)).textContent &&
      code === document.getElementById("square" + (i + 6)).textContent
    ) {
      winner = code;
    }
  }

  code = document.getElementById("square0").textContent;
  if (
    code !== '' && code === document.getElementById("square4").textContent &&
    code === document.getElementById("square8").textContent
  ) {
    winner = code;
  }

  code = document.getElementById("square2").textContent;
  if (
    code !== '' && code === document.getElementById("square4").textContent &&
    code === document.getElementById("square6").textContent
  ) {
    winner = code;
  }
}
