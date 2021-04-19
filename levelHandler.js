let gameState = "Pregame";
let roundsSurvived = 0;

const BUFFERMIN = 50;
const BUFFERMAX = 950;

function levelHandler() {  

topLayer = createGraphics(1000,1000);
  midLayer = createGraphics(1000,1000);
 // enemyLayer = createGraphics(1000,1000);
  midLayer.strokeWeight(25);
  midLayer.stroke(255);
  topLayer.textSize(50);
  midLayer.background(baseBCol);
  
  let c = 0; // POINT FOR LINES GENERATE
  while (c<=i) {
    if (c == 0) {
      p1[c] = new pointClass(0,random(BUFFERMIN,BUFFERMAX));
      p2[c] = new pointClass(random(BUFFERMIN,BUFFERMAX),0);
    } else if (c == i) {
      p1[c] = new pointClass(1000,p1[c-1].y);
      p2[c] = new pointClass(p2[c-1].x,1000);
    } else if (c % 2 == 0) {
      p1[c] = new pointClass(p1[c-1].x,random(BUFFERMIN,BUFFERMAX));
      p2[c] = new pointClass(random(BUFFERMIN,BUFFERMAX),p2[c-1].y);
    } else {
      p1[c] = new pointClass(random(BUFFERMIN,BUFFERMAX),p1[c-1].y);
      p2[c] = new pointClass(p2[c-1].x,random(BUFFERMIN,BUFFERMAX));
    }
    c++;
  }
  
  c = 0; // LEFT TO RIGHT COINS
  
  while (c<i) {
    if (c == 0 || c == i-1 || c % 2 == 0) {
      coin[c] = new coinClass((p1[c].x + p1[c+1].x)/2,p1[c].y,false);
    } else {
      coin[c] = new coinClass(p1[c].x,(p1[c].y + p1[c+1].y)/2,false);
    }
    c++;
  }
  
  c = 0; // TOP TO BOTTOM COINS
  
  while (c<i) {
    if (c == 0 || c == i-1 || c % 2 == 0) {
      coin[c+i] = new coinClass(p2[c].x,(p2[c].y + p2[c+1].y)/2,false);
    } else {
      coin[c+i] = new coinClass((p2[c].x + p2[c+1].x)/2,p2[c].y,false);
    }
    c++;
  }
  
  // ITEMS
  
  radarItem = new radar(p1[i-1].x,p1[i-1].y,false);
  slowerItem = new slower(p2[1].x,p2[1].y,false);
 // radarItem.taken() = false;
 // slowerItem.taken() = false;
  
  lineGen(i);

 // ** LEGACY CODE ** // 
 // rand();
  
 /* midLayer.line(0,x1,x2,x1);
  midLayer.line(x2,x1,x2,y1);
  midLayer.line(x2,y1,x3,y1);
  midLayer.line(x3,y1,x3,y2);
  midLayer.line(x3,y2,1000,y2); */
  
  x = 25;
  y = p1[0].y;
  
  eX = 1000;
  eY = p1[i].y;
  
  eX2 = p2[i].x;
  eY2 = 0;
  
/*  rand();
  
  midLayer.line(x1,0,x1,x2);
  midLayer.line(x1,x2,y1,x2);
  midLayer.line(y1,x2,y1,x3);
  midLayer.line(y1,x3,y2,x3);
  midLayer.line(y2,x3,y2,1000); */
  
}