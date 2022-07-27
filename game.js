// all the variables used to define the browser game
let game = document.getElementById("game");
let character = document.getElementById("character");
let both = 0;
let counter = 0;
let charMove;
counterArray = [];
var button = document.createElement("button");
var characterTop;
var characterLeft;

var audio = document.getElementById("audio");
var button = document.getElementById("button");

button.addEventListener("click", (event) => {
  audio.play();
});
// Button for game
button.innerHTML = "Start Game";

// Button appended to screen
var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

// event handler/invoker to start game...NOTE: game speed increases everytime you hit the start or space button
button.addEventListener("click", function () {
  startGame();
  sounds.play();
});
//start game function
function startGame() {
  function moveLeft() {
    let characterXpos = parseInt(
      window.getComputedStyle(character).getPropertyValue("left")
    );
    if (characterXpos > 0) {
      character.style.left = characterXpos - 2 + "px";
    }
  }

  function moveRight() {
    let characterXpos = parseInt(
      window.getComputedStyle(character).getPropertyValue("left")
    );
    if (characterXpos < 380) {
      character.style.left = characterXpos + 2 + "px";
    }
  }

  document.addEventListener("keydown", function (e) {
    if (both == 0) {
      both++;
      if (e.key == "ArrowLeft") {
        charMove = setInterval(moveLeft, 1);
      }
      if (e.key == "ArrowRight") {
        charMove = setInterval(moveRight, 1);
      }
    }
  });
  document.addEventListener("keyup", function (e) {
    clearInterval(charMove);
    both = 0;
  });
  var blocks = setInterval(function () {
    blockTop = 0;
    holeTop = 0;
    let previousBlock = document.getElementById("block" + (counter - 1));
    let previousHole = document.getElementById("hole" + (counter - 1));

    if (counter > 0) {
      blockTop = parseInt(
        window.getComputedStyle(previousBlock).getPropertyValue("top")
      );
      holeTop = parseInt(
        window.getComputedStyle(previousHole).getPropertyValue("top")
      );
    }
    if (blockTop < 400 || counter == 0) {
      block = document.createElement("div");
      block.setAttribute("class", "block");
      block.setAttribute("id", "block" + counter);
      block.style.top = blockTop + 100 + "px";
      hole = document.createElement("div");
      hole.setAttribute("class", "hole");
      hole.setAttribute("id", "hole" + counter);
      randomPos = Math.floor(Math.random() * 360);
      hole.style.left = randomPos + "px";
      hole.style.top = holeTop + 100 + "px";
      game.appendChild(block);
      game.appendChild(hole);
      counterArray.push(counter);
      counter++;
    }

    characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    characterLeft = parseInt(
      window.getComputedStyle(character).getPropertyValue("left")
    );
    drop = 0;

    //this 'if' statement is to prompt the game over screen once the ball hits the top of the game container(stop the interval)
    if (characterTop <= 0) {
      alert("Care to play again? Score: " + (counter - 9));
      clearInterval(blocks);
      location.reload();
    }

    for (i = 0; i < counterArray.length; i++) {
      relative = counterArray[i];
      rBlock = document.getElementById("block" + relative);
      rHole = document.getElementById("hole" + relative);
      relativeBlock = parseFloat(
        window.getComputedStyle(rBlock).getPropertyValue("top")
      );
      relativeHole = parseFloat(
        window.getComputedStyle(rHole).getPropertyValue("left")
      );
      rBlock.style.top = relativeBlock - 0.5 + "px";
      rHole.style.top = relativeBlock - 0.5 + "px";

      // this if statement is just to clean up the additional div blocks once they've already passed by so there isn't too much code shown that's no longer needed
      if (relativeBlock < -20) {
        counterArray.shift();
        rBlock.remove();
        rHole.remove();
      }
      // if ball
      if (relativeBlock - 20 < characterTop && relativeBlock > characterTop) {
        drop++;
        // if current hole and ball are in the same position, drop ball
        if (
          relativeHole <= characterLeft &&
          relativeHole + 20 >= characterLeft
        ) {
          drop = 0;
        }
      }
    }

    if (drop == 0) {
      if (characterTop < 400) {
        character.style.top = characterTop + 2 + "px";
      }
    } else {
      character.style.top = characterTop - 2 + "px";
    }
  }, 2);
}
