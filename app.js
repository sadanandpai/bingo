navigator.serviceWorker.register("./sw.js");

var count = 1;
var gameInProgress = false;
document.getElementById("start").disabled = true;

function reset() {
  gameInProgress = false;
  count = 1;
  document.getElementById("start").disabled = true;
  document.getElementById("randomize").disabled = false;

  for (let index = 1; index < 26; index++) {
    document.getElementById("square" + index).textContent = "";
    document.getElementById("square" + index).classList.remove("cross");
  }

  document.getElementById("bingoLabel1").classList.remove("cross");
  document.getElementById("bingoLabel2").classList.remove("cross");
  document.getElementById("bingoLabel3").classList.remove("cross");
  document.getElementById("bingoLabel4").classList.remove("cross");
  document.getElementById("bingoLabel5").classList.remove("cross");

}

window.addEventListener("click", evt => {
  if (
    evt.srcElement.className.includes("box") &&
    evt.srcElement.textContent == "" &&
    !gameInProgress
  ) {
    evt.srcElement.textContent = count++;
  }

  if (evt.srcElement.className.includes("box") && gameInProgress) {
    evt.srcElement.classList.add("cross");
    checkBingoAlgorithm();
  }

  if ((count == 26) & !gameInProgress) {
    document.getElementById("start").disabled = false;
  }
});

function start() {
  gameInProgress = true;
  document.getElementById("start").disabled = true;

}

function checkBingoAlgorithm() {
  var count = 0;

  for (let i = 1; i < 26; i = i + 5) {
    if (
      document.getElementById("square" + i).classList.contains("cross") &&
      document.getElementById("square" + (i + 1)).classList.contains("cross") &&
      document.getElementById("square" + (i + 2)).classList.contains("cross") &&
      document.getElementById("square" + (i + 3)).classList.contains("cross") &&
      document.getElementById("square" + (i + 4)).classList.contains("cross")
    ) {
      count++;
    }
  }

  for (let i = 1; i < 6; i++) {
    if (
      document.getElementById("square" + i).classList.contains("cross") &&
      document.getElementById("square" + (i + 5)).classList.contains("cross") &&
      document
        .getElementById("square" + (i + 10))
        .classList.contains("cross") &&
      document
        .getElementById("square" + (i + 15))
        .classList.contains("cross") &&
      document.getElementById("square" + (i + 20)).classList.contains("cross")
    ) {
      count++;
    }
  }

  if (
    document.getElementById("square1").classList.contains("cross") &&
    document.getElementById("square7").classList.contains("cross") &&
    document.getElementById("square13").classList.contains("cross") &&
    document.getElementById("square19").classList.contains("cross") &&
    document.getElementById("square25").classList.contains("cross")
  ) {
    count++;
  }

  if (
    document.getElementById("square5").classList.contains("cross") &&
    document.getElementById("square9").classList.contains("cross") &&
    document.getElementById("square13").classList.contains("cross") &&
    document.getElementById("square17").classList.contains("cross") &&
    document.getElementById("square21").classList.contains("cross")
  ) {
    count++;
  }

  if(count == 1){
    document.getElementById("bingoLabel1").classList.add("cross");
  }
  if(count == 2){
    document.getElementById("bingoLabel1").classList.add("cross");
    document.getElementById("bingoLabel2").classList.add("cross");
  }
  if(count == 3){
    document.getElementById("bingoLabel1").classList.add("cross");
    document.getElementById("bingoLabel2").classList.add("cross");
    document.getElementById("bingoLabel3").classList.add("cross");
  }
  if(count == 4){
    document.getElementById("bingoLabel1").classList.add("cross");
    document.getElementById("bingoLabel2").classList.add("cross");
    document.getElementById("bingoLabel3").classList.add("cross");
    document.getElementById("bingoLabel4").classList.add("cross");
  }
  if(count >= 5){
    document.getElementById("bingoLabel1").classList.add("cross");
    document.getElementById("bingoLabel2").classList.add("cross");
    document.getElementById("bingoLabel3").classList.add("cross");
    document.getElementById("bingoLabel4").classList.add("cross");
    document.getElementById("bingoLabel5").classList.add("cross");
  }
}

function randomize(){
  document.getElementById("randomize").disabled = true;

  for (let index = count; index <= 25; index++) {
    let square;

    while(true){
      square = Math.ceil(Math.random() *25);
      if(document.getElementById("square" + square).textContent === '' && square > 0 && square < 26){
        document.getElementById("square" + square).textContent = index;
        break;
      }
    }
  }
  document.getElementById("start").disabled = false;
  document.getElementById("randomize").disabled = true;

}