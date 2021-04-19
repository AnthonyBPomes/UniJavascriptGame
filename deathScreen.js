/* let x,y,t;

function setup() {
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
  textAlign(CENTER,CENTER);
  frameRate(60);
}

function draw() {

  background(200,44,366);
  
 // print(frameCount);
  
  if (frameCount >= 120 && frameCount < 240) {
    t = map(frameCount,120,240,0,2);
    y = 20*(-(t*t)) + height/2;
  } else if (frameCount >= 240 && frameCount <= 360) {
    t = map(frameCount,240,360,2,4);
    y = -20*(-(t - 4)*(t - 4) + 8) + height/2;
  }
  
     // print(t);
  
  textSize(30);
  text("You Died",x,y);
  
} */

/* let x,y,t;

function setup() {
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
  textAlign(CENTER,CENTER);
  frameRate(60);
}

function draw() {

  background(200,44,366);
  
 // print(frameCount);
  
  if (frameCount >= 120 && frameCount < 180) {
    t = map(frameCount,120,180,0,10*sqrt(5));
    y = -0.1*(t*t) + height/2;
  } else if (frameCount >= 180 && frameCount <= 240) {
    t = map(frameCount,180,240,10*sqrt(5),20*sqrt(5));
    y = 0.1*(t-20*sqrt(5))*(t-20*sqrt(5)) + 100;
  }
  
  textSize(30);
  text("You Died",x,y);
  
} */

let xD, yD, tD;
let s;
let o = 0;

let animDone = [1];

function deathScreenSetup() {
  xD = width / 2;
  yD = height / 2;
  frameCount = 0;
  textAlign(CENTER, CENTER);
  for (i = 0; i < 2; i++) {
    animDone[i] = false;
  }
  
}

let setupDone = false;

function deathScreenFunc() {
  
  if (setupDone == false) {
    deathScreenSetup();
    setupDone = true;
  }

  background(200, 44, 366, 25);
  
  // print(frameCount);
  if (animDone[0] == false) {
    if (frameCount >= 120 && frameCount < 180) {
      tD = map(frameCount, 120, 180, 0, 10 * sqrt(5));
      yD = -0.1 * (tD * tD) + height / 2;
    } else if (frameCount >= 180 && frameCount <= 240) {
      tD = map(frameCount, 180, 240, 10 * sqrt(5), 20 * sqrt(5));
      yD = 0.1 * (tD - 20 * sqrt(5)) * (tD - 20 * sqrt(5)) + 400;
    } else if (frameCount > 240) {
      animDone[0] = true;
      frameCount = 0;
    }

  }
  
  textSize(100);
  fill(0,255);
  text("You Died", xD, yD);

  if (animDone[0] == true && animDone[1] == false) {
    if (frameCount >= 0 && frameCount < 60) {
      tD = map(frameCount, 0, 60, 0, 10 * sqrt(5));
      s = -0.1 * (tD * tD) + 200;
      o = map(s,200,150,0,255);
    } else if (frameCount > 120) {
      animDone[1] = true;
      frameCount = 0;
    }
  }
  
  textSize(30);
  fill(0,o);
  text("Total Coins Collected: " + coinCounter,350,600);
  text("Rounds Survived: " + roundsSurvived,350,650);
  text("Total Score: " + (roundsSurvived + coinCounter),350,700);


} 