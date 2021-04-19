let coinCounter = 0;

class coinClass {
  
  constructor(x,y,t) {
    this.x = x;
    this.y = y;
    this.collected = t;
  }
  
}

function coinTaken (posx,posy) {
  
 // print(coin[0].collected);  
  
  c = 0;
  while (c<i*2) {
    if ((posx <= coin[c].x + 10 && posx >= coin[c].x - 10) && (posy <= coin[c].y + 10 && posy >= coin[c].y - 10)) {
      if (coin[c].collected == false) {
        coinCounter++;
        coinSound.play();
      }
      coin[c].collected = true;
    //  print(coin[c].collected);
    }
    c++;
  }
  
  topLayer.fill(212, 175, 55);
  topLayer.noStroke();
  coinGen(i,coin);
  
}