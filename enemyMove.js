function enemyMove(posX, posY, enemySpeed, number) {

  if (number == 1) {
    if (p1[cP].x != p1[cP - 1].x && (round(posX) >= round(p1[cP - 1].x) + buffer || round(posX) <= round(p1[cP - 1].x) - buffer)) {
      let Rx = abs((p1[cP - 1].x - p1[cP].x) / 1000);
      posX = lerp(p1[cP].x, p1[cP - 1].x, t);
      t = t + (enemySpeed / Rx);
    } else if (pointXdone == 0 && pointYdone == 1) {
      pointXdone = 1;
      pointYdone = 0;
      cP--;
      t = 0;
    }

    if (cP == 0) {
      posX = 1000;
      posY = p1[i].y;
      pointXdone = 0;
      pointYdone = 1;
      cP = i;
    }

    if (p1[cP].y != p1[cP - 1].y && (round(posY) >= round(p1[cP - 1].y) + buffer || round(posY) <= round(p1[cP - 1].y) - buffer)) {
      let Ry = abs((p1[cP - 1].y - p1[cP].y) / 1000);
      posY = lerp(p1[cP].y, p1[cP - 1].y, t);
      t = t + (enemySpeed / Ry);
    } else if (pointYdone == 0 && pointXdone == 1) {
      pointXdone = 0;
      pointYdone = 1;
      cP--;
      t = 0;
    }

    return [posX, posY];

  }

  if (number == 2) {

    if (p2[cP2].y != p2[cP2 - 1].y && (round(posY) >= round(p2[cP2 - 1].y) + buffer || round(posY) <= round(p2[cP2 - 1].y) - buffer)) {
      let Ry2 = abs((p2[cP2 - 1].y - p2[cP2].y) / 1000);
      posY = lerp(p2[cP2].y, p2[cP2 - 1].y, t2);
      t2 = t2 + (enemySpeed / Ry2);
    } else if (pointYdone2 == 0 && pointXdone2 == 1) {
      pointXdone2 = 0;
      pointYdone2 = 1;
      cP2--;
      t2 = 0;
    }

    if (cP2 == 0) {
      posX = p2[i].x;
      posY = 1000;
      pointXdone2 = 1;
      pointYdone2 = 0;
      cP2 = i;
    }

    if (p2[cP2].x != p2[cP2 - 1].x && (round(posX) >= round(p2[cP2 - 1].x) + buffer || round(posX) <= round(p2[cP2 - 1].x) - buffer)) {
      let Rx2 = abs((p2[cP2 - 1].x - p2[cP2].x) / 1000);
      posX = lerp(p2[cP2].x, p2[cP2 - 1].x, t2);
      t2 = t2 + (enemySpeed / Rx2);
    } else if (pointXdone2 == 0 && pointYdone2 == 1) {
      pointXdone2 = 1;
      pointYdone2 = 0;
      cP2--;
      t2 = 0;
    }

    return [posX, posY];

  }

}

function enemyHit() {
  
  
  if (((x <= eX + 15 && x >= eX - 15) && (y <= eY + 20 && y >= eY - 15)) || ((x <= eX2 + 15 && x >= eX2 - 15) && (y <= eY2 + 15 && y >= eY2 - 15))) {
    gameState = "Dead";
    gotTime = false;
    deathSound.play();
    print("Hit");
  }
  
  
}