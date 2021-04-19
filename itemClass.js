class radar {
  
  constructor(x,y,a) {
    this.x = x;
    this.y = y;
    this.activated = a;
    this.finish = false;
    this.touchedItem = false;
  }
  
  taken(posx,posy) {
    if (this.touchedItem || (posx <= this.x + 15 && posx >= this.x - 15) && (posy <= this.y + 15 && posy >= this.y - 15)) {
      this.touchedItem = true;
      return true;
    }
    return false;
  }
  
  activate() {
    if (this.activated == false && this.touchedItem == true) {
      getGameTime[0] = gameTimer;
      this.activated = true;
    }
  }
  
}


let radarTimer = 5;

function radarScan(activation) {
  
  if (activation == true && radarTimer >= (getGameTime[0] - gameTimer)) {
    
  } else if (radarTimer < (getGameTime[0] - gameTimer)) {
    radarItem.finish = true;
  }
  
}

let getPosition = false;
let getGameTimeRadarDraw;
let radarSize = 5;

function radarDraw(posx,posy) {

  if (getPosition == false) {
    posxRadar = posx;
    posyRadar = posy;
    getPosition = true;
    radarSize = 5;
    getGameTimeRadarDraw = (getGameTime[0] - gameTimer) + 1;
    radarSound.play();
  }
  
  if (getGameTime[0] - gameTimer == getGameTimeRadarDraw) {
    getPosition = false;
  }

  radarSize = radarSize + 50;
  topLayer.stroke(0);
  topLayer.strokeWeight(5);
  topLayer.fill(255,0);
  topLayer.ellipse(posxRadar,posyRadar,radarSize,radarSize);
  topLayer.ellipse(posxRadar,posyRadar,radarSize-150,radarSize-150);
  topLayer.ellipse(posxRadar,posyRadar,radarSize-300,radarSize-300);

  
}

class slower {
  
  constructor(x,y,a) {
    this.x = x;
    this.y = y;
    this.activated = a;
    this.finished = false;
    this.touchedItem = false;
  }
  
  taken(posx,posy) {
    if (this.touchedItem || (posx <= this.x + 15 && posx >= this.x - 15) && (posy <= this.y + 15 && posy >= this.y - 15)) {
      this.touchedItem = true;
      return true;     
    }
    return false;
  }
  
  activate() {
    if (this.activated == false && this.touchedItem == true) {
      getGameTime[1] = gameTimer;
      this.activated = true;
    }
  }
  
}

let slowerTimer = 5;

function slowApply(activation) {
  
  if (activation == true && slowerTimer >= (getGameTime[1] - gameTimer)) {
    
  } else if (slowerTimer < (getGameTime[1] - gameTimer)) {
    slowerItem.finish = true;
  }
  
}

function keyPressed() {
  if (keyCode == 32) {
    radarItem.activate();
  } else if (keyCode == 67) {
    slowerItem.activate();
  }
}



