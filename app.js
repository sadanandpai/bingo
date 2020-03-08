navigator.serviceWorker.register("./sw.js");

var count = 1;
var boxLength = 5;
var gameInProgress = false;
document.getElementById("start").disabled = true;

function reset() {
  gameInProgress = false;
  count = 1;
  document.getElementById("start").disabled = true;
  document.getElementById("randomize").disabled = false;

  for (let i = 0; i < boxLength; i++) {
    for (let j = 0; j < boxLength; j++) {
      document.getElementById("square" + i + j).textContent = "";
      document.getElementById("square" + i + j).classList.remove("cross");
    }
  }

  document.getElementById("bingoLabel1").classList.remove("cross");
  document.getElementById("bingoLabel2").classList.remove("cross");
  document.getElementById("bingoLabel3").classList.remove("cross");
  document.getElementById("bingoLabel4").classList.remove("cross");
  document.getElementById("bingoLabel5").classList.remove("cross");

  document.getElementById("winner").innerHTML = "";
}

window.addEventListener("click", evt => {
  if (evt.srcElement.className.includes("box") && evt.srcElement.textContent == "" && !gameInProgress) {
    evt.srcElement.textContent = count++;
  }

  if (evt.srcElement.className.includes("box") && gameInProgress) {
    if (socket) {
      socket.emit("send", { box: evt.srcElement.textContent });
    } 

    evt.srcElement.classList.add("cross");
    checkBingoAlgorithm();
  }

  if ((count == boxLength * boxLength + 1) & !gameInProgress) {
    document.getElementById("start").disabled = false;
  }
});

function start() {
  gameInProgress = true;
  document.getElementById("start").disabled = true;
}

function checkBingoAlgorithm() {
  var winCount = 0;

  for (let i = 0; i < boxLength; i++) {
    let count = 0;
    for (let j = 0; j < boxLength; j++) {
      if(document.getElementById("square" + i + j).classList.contains("cross"))
        count++;
    }

    if(count === boxLength){
      winCount++;
    }
  }

  for (let i = 0; i < boxLength; i++) {
    let count = 0;
    for (let j = 0; j < boxLength; j++) {
      if(document.getElementById("square" + j + i).classList.contains("cross"))
        count++;
    }

    if(count === boxLength){
      winCount++;
    }
  }

  let count = 0;
  for (let i = 0; i < boxLength; i++) {
    if(document.getElementById("square" + i + i).classList.contains("cross"))
        count++;
  }

  if(count == boxLength){
    winCount++;
  }

  count = 0;
  for (let i = 0; i < boxLength; i++) {
    if(document.getElementById("square" + i + (boxLength - i - 1)).classList.contains("cross"))
        count++;
  }

  if(count == boxLength){
    winCount++;
  }

  bingoMarker(winCount);
}

function bingoMarker(count){
  if (count == 1) {
    document.getElementById("bingoLabel1").classList.add("cross");
  }
  if (count == 2) {
    document.getElementById("bingoLabel1").classList.add("cross");
    document.getElementById("bingoLabel2").classList.add("cross");
  }
  if (count == 3) {
    document.getElementById("bingoLabel1").classList.add("cross");
    document.getElementById("bingoLabel2").classList.add("cross");
    document.getElementById("bingoLabel3").classList.add("cross");
  }
  if (count == 4) {
    document.getElementById("bingoLabel1").classList.add("cross");
    document.getElementById("bingoLabel2").classList.add("cross");
    document.getElementById("bingoLabel3").classList.add("cross");
    document.getElementById("bingoLabel4").classList.add("cross");
  }
  if (count >= 5) {
    document.getElementById("bingoLabel1").classList.add("cross");
    document.getElementById("bingoLabel2").classList.add("cross");
    document.getElementById("bingoLabel3").classList.add("cross");
    document.getElementById("bingoLabel4").classList.add("cross");
    document.getElementById("bingoLabel5").classList.add("cross");

    if(socket)
      socket.emit("send", { winner: true });
  }
}


function randomize() {
  document.getElementById("randomize").disabled = true;

  for (let index = count; index <= boxLength * boxLength; index++) {
    let i, j;

    while (true) {
      i = Math.floor(Math.random() * boxLength);
      j = Math.floor(Math.random() * boxLength);
      if (document.getElementById("square" + i + j).textContent === "" && i >= 0 && i < boxLength && j >= 0 && j < boxLength) {
        document.getElementById("square" + i + j).textContent = index;
        break;
      }
    }
  }
  document.getElementById("start").disabled = false;
  document.getElementById("randomize").disabled = true;
}

var socket;
var socketId = "";

function goOnline() {
  if (socketId != "") return;

  socket = io.connect("https://paichat.herokuapp.com/");

  socket.emit("ferret", "id", function(data) {
    socketId = data;
  });

  socket.on("message", function(data) {
    if (data.box) {
      for (let i = 0; i < boxLength; i++) {
        for (let j = 0; j < boxLength; j++) {
          if (document.getElementById("square" + i + j).textContent == data.box) {
            document.getElementById("square" + i + j).classList.add("cross");
            document.getElementById("square" + i + j).classList.add("yellow");
            setTimeout(()=>{ document.getElementById("square" + i + j).remove('yellow'); }, 1000);
            checkBingoAlgorithm();
            break;
          }
        }
      }
    } else if (data.winner) {
      document.getElementById("winner").innerHTML = "Game over";
    }
  });

  socket.on("counter", function(data) {
    document.getElementById("users").innerHTML = data - 1 + " online";
  });
}
