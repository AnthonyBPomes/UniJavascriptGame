let x;
let y;

let eX = 0;
let eY = 0;

let eX2 = 0;
let eY2 = 0;

let baseBCol = [220, 5, 5, 255];

let topLayer;
let enemyLayer;

let movementSpeed = 3;

let i = 3;
let levelRotationTimes = [3,0];
let p1 = [i];
let p2 = [i];
let coin = [i * 2];
let radarItem;
let slowerItem;

let t = 0;
let pointXdone = 0;
let pointYdone = 1;
let cP = i;

let t2 = 0;
let pointXdone2 = 1;
let pointYdone2 = 0;
let cP2 = i;

function preload() {
  // soundFormats('mp3');
  radarSound = loadSound('sfx/radar.wav');
  slowerSound = loadSound('sfx/slower.wav');
  coinSound = loadSound('sfx/coin.wav');
  deathSound = loadSound('sfx/death.wav');
  backgroundInPlaySound = loadSound('sfx/background.mp3');
  backgroundDeadSound = loadSound('sfx/deathbackground.wav');
}

function setup() {
  createCanvas(1000, 1000);
  frameRate(60);
  levelHandler();
}

let leftSideDoorEntered = false;
let rightSideDoorEntered = false;
let upSideDoorEntered = false;
let downSideDoorEntered = false;

let slowerSoundPlayed = false;

function draw() {

  if (gameState == "Pregame") {
    frameCount = 0;
    background(200);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("The Maze Escape",500,250);

    fill(255);
    rect(400,800,200,50);

    fill(0);
    textSize(50);
    text("Begin",500,825);

    textSize(25);
    text("How long can YOU survive in the maze?",250,100,500,500);
    text("This interactive web-based experience is a top-down survival strategy game that contains randomly generated levels, including TWO enemies that phase in and out of visibility to further add a twist to the gameplay experience.",100,200,800,500);
    text("The longer you survive in the maze, the more difficult it becomes as everything begins to turn against your support.",100,300,800,500);
    fill(127,0,127);
    ellipse(437,618,15,15);
    fill(0,255,0);
    ellipse(829,618,15,15);
    fill(0,0,255);
    ellipse(371,680,15,15);
    fill(0);
    text("Enemies are represented as    while the radar is represented as    and can be activated using the SPACEBAR. The enemy slowdown item is represented as     and can be activated using the C key.",100,400,800,500);
    text("Good luck in the maze of doom!",100,500,800,500);
    text("Note: You can pass through the four door openings on the border of the screen BUT you can ONLY enter and exit each entrance ONCE!!!",100,675,800,500);
  }

  if (gameState == "inPlay") {

    musicHandle(gameState);

    print(backgroundInPlaySound.isPlaying());


    if (gameTimer == 0) {
      roundsSurvived++;
      if (movementSpeed > 0.5) {
        movementSpeed = movementSpeed - 0.1;
      }
      startTime = startTime + 10;
      gameTimer = startTime;
      if (i == 9) {
      // SKIP
      } else if (levelRotationTimes[1] == levelRotationTimes[0]) {
        i = i + 2;
        levelRotationTimes[1] = 1;
      } else {
        levelRotationTimes[1]++;
      }
      t = 0;
      t2 = 0;
      pointXdone = 0;
      pointXdone2 = 1;
      pointYdone = 1;
      pointYdone2 = 0;
      cP = i;
      cP2 = i;
      leftSideDoorEntered = false;
      rightSideDoorEntered = false;
      upSideDoorEntered = false;
      downSideDoorEntered = false;
      slowerSoundPlayed = false;
      levelHandler();
    }

    // topLayer.clear();
    currentColour = midLayer.get(x, y);
    if (currentColour[1] == baseBCol[1]) {
      //  print("Hit");
      x = prevX;
      y = prevY;
    } else {
      prevX = x;
      prevY = y;
      move();
    }

    if ((x < p1[0].x && leftSideDoorEntered == true)) {
      x = prevX + 3;
    } else if ((x > p1[i].x && rightSideDoorEntered == true)) {
      x = prevX - 3;
    } else if ((y < p2[0].y && upSideDoorEntered == true)) {
      y = prevY + 3;
    } else if ((y > p2[i].y && downSideDoorEntered == true)) {
      y = prevY - 3;
    }

    if (x < p1[0].x && leftSideDoorEntered == false) {
      x = p1[i].x;
      y = p1[i].y;
      leftSideDoorEntered = true;
    }

    if (x > p1[i].x && rightSideDoorEntered == false) {
      x = p1[0].x;
      y = p1[0].y;
      rightSideDoorEntered = true;
    }

    if (y < p2[0].y && upSideDoorEntered == false) {
      y = p2[i].y;
      x = p2[i].x;
      upSideDoorEntered = true;
    }

    if (y > p2[i].y && downSideDoorEntered == false) {
      y = p2[0].y;
      x = p2[0].x;
      downSideDoorEntered = true;
    }

     enemyHit();

    /* if ((x <= ((p1[i].x + p1[i - 1].x) / 2) + 10) && (x >= ((p1[i].x + p1[i - 1].x) / 2) - 10) && (y <= p1[i].y + 20 && y >= p1[i].y - 20) && moneyTaken == false) {
       print("money");
       moneyTaken = true;
     } */

    if (slowerItem.finish != true && slowerItem.activated == true) {
      slowApply(slowerItem.activate);
      if (slowerSoundPlayed == false) {
        slowerSound.play();
        print(slowerSoundPlayed);
        slowerSoundPlayed = true;
      }
      speed = 0.0005;
      [eX, eY] = enemyMove(eX, eY, speed, 1);
      [eX2, eY2] = enemyMove(eX2, eY2, speed, 2);
    } else {
      speed = 0.001;
      [eX, eY] = enemyMove(eX, eY, speed, 1);
      [eX2, eY2] = enemyMove(eX2, eY2, speed, 2);
    } // FUNCTION TO MOVE ENEMY POINT

    topLayer.image(midLayer, 0, 0);
    //  enemyLayer.image(midLayer,0,0);

    topLayer.strokeWeight(1);

    topLayer.fill(255, 255, 255);
    topLayer.stroke(0, 0, 0);
    topLayer.ellipse(x, y, 10, 10);

    itemGen();

    coinTaken(x, y);

    topLayer.fill(0);
    topLayer.text(gameTime(), 500, 100);

    topLayer.fill(0);
    topLayer.text("Coins: " + coinCounter, 50, 950);

    if (radarItem.activated != true && radarItem.touchedItem == true) {
      topLayer.fill(0,175,0);
      topLayer.text("Radar Ready", 650, 950);
    }

    if (slowerItem.activated != true && slowerItem.touchedItem == true) {
      topLayer.fill(0,0,175);
      topLayer.text("Slowdown Ready", 600, 850);
    }

    if (radarItem.finish != true && radarItem.activated == true) {
      radarScan(radarItem.activated);
      radarDraw(x,y);
      topLayer.strokeWeight(1);
      topLayer.fill(random(255),random(255),random(255));
    } else {
      enemyPhaser();
    }

    // RADAR
    topLayer.ellipse(eX, eY, 20, 20);
    topLayer.ellipse(eX2, eY2, 20, 20);
    // print(midLayer.get(x,y));     
    // image(enemyLayer,0,0);
    image(topLayer, 0, 0);
  } // CODE BLOCK FOR PLAYING GAME

  if (gameState == "Dead") {
          musicHandle(gameState);
          gameTime();
    if (gameTimer >= getGameTime[2] - 2) {
          fill(0,255);
          ellipse(eX, eY, 20, 20);
          ellipse(eX2, eY2, 20, 20);
  //    print(gameTimer - 2);
    } else {
          deathScreenFunc();
          if (backgroundDeadMusicPlayed == false) {
            backgroundDeadSound.play();
            backgroundDeadMusicPlayed = true;
          }
    }

  }

}

let backgroundMusicPlayed = false;
let backgroundDeadMusicPlayed = false;

function musicHandle(state) {

  if (backgroundInPlaySound.isPlaying() == false) {
      backgroundMusicPlayed = false;
  }

    if (state == "inPlay" && backgroundMusicPlayed == false){
      backgroundInPlaySound.play();
      backgroundMusicPlayed = true;
    } else if (state == "Dead" && backgroundDeadMusicPlayed == false) {
      backgroundInPlaySound.stop();
      radarSound.stop();
      slowerSound.stop();
    }

}

let mouseClickedStart = false;

function mouseClicked() {
  if (mouseClickedStart == false) {
    setup();
    gameState = "inPlay";
    mouseClickedStart = true;
  }

}

let gotTime = true;
let startTime = 30;
let gameTimer = startTime;
let getGameTime = [0, 0, 0];

function gameTime() {

  if (frameCount % 60 == 0) {
    gameTimer--;
  }
  
  if (gotTime == false) {
    getGameTime[2] = gameTimer;
    gotTime = true;
  }

  return gameTimer;

}

function enemyPhaser() {

  if (frameCount <= 100) {
    topLayer.stroke(0, 0, 0, map(frameCount, 0, 100, 255, 0));
    topLayer.fill(128, 0, 128, map(frameCount, 0, 100, 255, 0));
  } else if (frameCount > 100 && frameCount <= 500) {
    topLayer.stroke(0, 0);
    topLayer.fill(0, 0);
  } else if (frameCount > 500 && frameCount <= 600) {
    topLayer.stroke(0, 0, 0, map(frameCount, 500, 600, 0, 255));
    topLayer.fill(128, 0, 128, map(frameCount, 500, 600, 0, 255));
  } else if (frameCount > 600) {
    frameCount = 0;
  }


}

function lineGen(numberOfLines) {

  let c = 0;
  while (c < numberOfLines) {
    midLayer.line(p1[c].x, p1[c].y, p1[c + 1].x, p1[c + 1].y);
    midLayer.line(p2[c].x, p2[c].y, p2[c + 1].x, p2[c + 1].y);
    c++;
  }

}

function coinGen(numberOfLines, coinTook) {

  let c = 0;
  while (c < numberOfLines * 2) {
    if (coinTook[c].collected == false) {
      topLayer.ellipse(coin[c].x, coin[c].y, 10, 10);
    }
    c++;
  }
}

function itemGen() {

  if (radarItem.taken(x, y) == false) {
    topLayer.fill(0, 255, 0);
    topLayer.ellipse(radarItem.x, radarItem.y, 15, 15);
  }

  if (slowerItem.taken(x, y) == false) {
    topLayer.fill(0, 0, 255);
    topLayer.ellipse(slowerItem.x, slowerItem.y, 15, 15);
  }

}

function move() {

  if (keyIsDown(LEFT_ARROW)) {
    x -= movementSpeed;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += movementSpeed;
  }

  if (keyIsDown(UP_ARROW)) {
    y -= movementSpeed;
  }

  if (keyIsDown(DOWN_ARROW)) {
    y += movementSpeed;
  }

}



let buffer = 1.25;


/* if (eX > p[i-1].x) {
   eX--;
 } */