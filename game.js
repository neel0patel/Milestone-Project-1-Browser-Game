var interval;
var both = 0;
var game = document.getElementsByClassName("game");

window.addEventListener("load", () => {
  var character = document.getElementById("character");
  character.style.position = "absolute";
  character.style.left = 0;
  character.style.top = 0;
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      character.style.left = parseInt(character.style.left) - 25 + "px";
      break;

    case "ArrowRight":
      character.style.left = parseInt(character.style.left) + 25 + "px";
      break;
  }
});
