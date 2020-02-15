navigator.serviceWorker.register("./sw.js");

var count = 1;
var gameInProgress = false;
document.getElementById("start").disabled = true;

function reset() {
  gameInProgress = false;
  count = 1;
  document.getElementById("start").disabled = true;

  for (let index = 1; index < 26; index++) {
    document.getElementById("square" + index).textContent = "";
    document.getElementById("square" + index).classList.remove("cross");
  }
}

window.addEventListener("click", evt => {
  if (
    evt.srcElement.className.includes("box") &&
    evt.srcElement.textContent == "" && !gameInProgress
  ) {
    evt.srcElement.textContent = count++;
  }

  if (
    evt.srcElement.className.includes("box") && gameInProgress
  ) {
    evt.srcElement.classList.add("cross");
  }

  if(count == 26 & !gameInProgress){
    document.getElementById("start").disabled = false;
  }
});

function start(){
  gameInProgress = true;
  document.getElementById("start").disabled = true;
}
