var currentScale;
var currentMode = "ionian";
var showVoicings = "false";

/*        :::::::::::            GRAPHICS SETUP            :::::::::::        */
function setup (){
    createCanvas (windowWidth, windowHeight);
    frameRate(30);
    pattern = new basicPattern(0,0);
}

function draw(){
//redraw the entire grid only when we have changes in the off screen canvas. CPU friendly :)
  if (pattern.redrawRequired) redrawAll();
}

function redrawAll(){
  background(colorBackground);
  translate(0,-150);
  pattern.drawPattern();

/*        :::::::::::            GRID GENERATOR            :::::::::::        */
  let shift = 0;

  adj_row = 1;
  adj_col = 2;
  off_x = -2400;
  off_y = -300;

  for (row = 0; row <= floor(windowHeight/pattern.getArrayElement(15).yvalue() + adj_row); row++){
    shift = row*1.5*pattern.getArrayElement(1).xvalue();
    for(col = 0; col <= floor(windowWidth/(3*pattern.getArrayElement(4).xvalue())+ adj_col); col++){
      push();
      translate(pattern.getArrayElement(0).xvalue() + col*3*pattern.getArrayElement(4).xvalue() + shift + off_x, pattern.getArrayElement(0).yvalue() + row*pattern.getArrayElement(15).yvalue() + off_y);
      image(pattern.offScr,0,0);
      pop();
      push();
      translate(pattern.getArrayElement(14).xvalue() + col*3*pattern.getArrayElement(4).xvalue() + shift + off_x, pattern.getArrayElement(14).yvalue() + row*pattern.getArrayElement(15).yvalue() + off_y);
      image(pattern.offScr,0,0);
      pop();
      push();
      translate(pattern.getArrayElement(9).xvalue() + pattern.getArrayElement(4).xvalue() + col*3*pattern.getArrayElement(4).xvalue() + shift + off_x, pattern.getArrayElement(9).yvalue() + row*pattern.getArrayElement(15).yvalue() + off_y);
      image(pattern.offScr,0,0);
      pop();
    }
  }

  pattern.redrawRequired = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pattern.redrawRequired = true;
}

/*        :::::::::::            KEY EVENT            :::::::::::        */
function pressedKey(btn){
  code = btn.keyCode;

  switch(code){
      case 53:
      case 81:
      case 66:
      case 76: //C
        pattern.turnOnNote([0, 14, 15]);
      break;

      case 73:
      case 70: //C#
        pattern.turnOnNote([8]);
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOnNote([2, 17]);
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOnNote([11]);
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOnNote([4, 5, 19]);
      break;

      case 52:
      case 75:
      case 86: //F
        pattern.turnOnNote([13]);
      break;

      case 85:
      case 68: //F#
        pattern.turnOnNote([7]);
      break;

      case 54:
      case 87:
      case 78: //G
        pattern.turnOnNote([1, 16]);
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOnNote([9, 10]);
      break;

      case 56:
      case 82: //A
        pattern.turnOnNote([3, 18]);
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOnNote([12]);
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOnNote([6]);
      break;
    }
    document.addEventListener('keydown', keyVoicingOn);
}

function releasedKey(btn){
    code = btn.keyCode;

    switch(code){
      case 53:
      case 81:
      case 66:
      case 76: //C
        pattern.turnOffNote([0, 14, 15]);
      break;

      case 73:
      case 70: //C#
        pattern.turnOffNote([8]);
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOffNote([2, 17]);
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOffNote([11]);
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOffNote([4, 5, 19]);
      break;

      case 52:
      case 75:
      case 86: //F
        pattern.turnOffNote([13]);
      break;

      case 85:
      case 68: //F#
        pattern.turnOffNote([7]);
      break;

      case 54:
      case 87:
      case 78: //G
        pattern.turnOffNote([1, 16]);
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOffNote([9, 10]);
      break;

      case 56:
      case 82: //A
        pattern.turnOffNote([3, 18]);
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOffNote([12]);
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOffNote([6]);
      break;
    }
    document.addEventListener('keyup', keyVoicingOff);
}

document.addEventListener('keydown', pressedKey);
document.addEventListener('keyup', releasedKey);


/*        :::::::::::            VOICING REPRESENTATION           :::::::::::        */
function keyVoicingOn(btn){
  code = btn.keyCode;
  if(showVoicings == true){
    voicingOn(code);
  }
}

function keyVoicingOff(btn){
  code = btn.keyCode;
  voicingOff(code);
}

function voicingOn(code){
  if (currentScale == "C") {
    switch(code){
      case 53:
      case 81:
      case 66:
      case 76: //C
        pattern.turnOnVoiceNote("E");
        pattern.turnOnVoiceNote("B");
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOnVoiceNote("F");
        pattern.turnOnVoiceNote("C");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOnVoiceNote("G");
        pattern.turnOnVoiceNote("D");
      break;

      case 52:
      case 75:
      case 86: //F
        pattern.turnOnVoiceNote("A");
        pattern.turnOnVoiceNote("E");
      break;

      case 54:
      case 87:
      case 78: //G
        pattern.turnOnVoiceNote("B");
        pattern.turnOnVoiceNote("F");
      break;

      case 56:
      case 82: //A
        pattern.turnOnVoiceNote("C");
        pattern.turnOnVoiceNote("G");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOnVoiceNote("D");
        pattern.turnOnVoiceNote("A");
      break;
    }
  } else if (currentScale == "Cshrp") {
    switch(code){
      case 73:
      case 70: //C#
        pattern.turnOnVoiceNote("E#");
        pattern.turnOnVoiceNote("B#");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOnVoiceNote("F#");
        pattern.turnOnVoiceNote("C#");
      break;

      case 52:
      case 75:
      case 86: //F (E#)
        pattern.turnOnVoiceNote("G#");
        pattern.turnOnVoiceNote("D#");
      break;

      case 85:
      case 68: //F#
        pattern.turnOnVoiceNote("A#");
        pattern.turnOnVoiceNote("E#");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOnVoiceNote("B#");
        pattern.turnOnVoiceNote("F#");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOnVoiceNote("C#");
        pattern.turnOnVoiceNote("G#");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C (B#)
        pattern.turnOnVoiceNote("D#");
        pattern.turnOnVoiceNote("A#");
      break;
    }
  } else if (currentScale == "D"){
    switch(code){
      case 55:
      case 69:
      case 77: //D
        pattern.turnOnVoiceNote("F#");
        pattern.turnOnVoiceNote("C#");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOnVoiceNote("G");
        pattern.turnOnVoiceNote("D");
      break;

      case 85:
      case 68: //F#
        pattern.turnOnVoiceNote("A");
        pattern.turnOnVoiceNote("E");
      break;

      case 54:
      case 87:
      case 78: //G
        pattern.turnOnVoiceNote("B");
        pattern.turnOnVoiceNote("F#");
      break;

      case 56:
      case 82: //A
        pattern.turnOnVoiceNote("C#");
        pattern.turnOnVoiceNote("G");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOnVoiceNote("D");
        pattern.turnOnVoiceNote("A");
      break;

      case 73:
      case 70: //C#
        pattern.turnOnVoiceNote("E");
        pattern.turnOnVoiceNote("B");
      break;
    }
  } else if (currentScale == "Dshrp"){
    switch(code){
      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOnVoiceNote("F##");
        pattern.turnOnVoiceNote("C##");
      break;

      case 52:
      case 75:
      case 86: //F (E#)
        pattern.turnOnVoiceNote("G#");
        pattern.turnOnVoiceNote("D#");
      break;

      case 54:
      case 87:
      case 78: //G (F##)
        pattern.turnOnVoiceNote("A#");
        pattern.turnOnVoiceNote("E#");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOnVoiceNote("B#");
        pattern.turnOnVoiceNote("F##");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOnVoiceNote("C##");
        pattern.turnOnVoiceNote("G#");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C (B#)
        pattern.turnOnVoiceNote("D#");
        pattern.turnOnVoiceNote("A#");
      break;

      case 55:
      case 69:
      case 77: //D (C##)
        pattern.turnOnVoiceNote("E#");
        pattern.turnOnVoiceNote("B#");
      break;
    }
  } else if (currentScale == "E"){
    switch(code){
      case 57:
      case 84:
      case 65: //E
        pattern.turnOnVoiceNote("G#");
        pattern.turnOnVoiceNote("D#");
      break;

      case 85:
      case 68: //F#
        pattern.turnOnVoiceNote("A");
        pattern.turnOnVoiceNote("E");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOnVoiceNote("B");
        pattern.turnOnVoiceNote("F#");
      break;

      case 56:
      case 82: //A
        pattern.turnOnVoiceNote("C#");
        pattern.turnOnVoiceNote("G#");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOnVoiceNote("D#");
        pattern.turnOnVoiceNote("A");
      break;

      case 73:
      case 70: //C#
        pattern.turnOnVoiceNote("E");
        pattern.turnOnVoiceNote("B");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOnVoiceNote("F#");
        pattern.turnOnVoiceNote("C#");
      break;
    }
  } else if (currentScale == "F"){
    switch(code){
      case 52:
      case 75:
      case 86: //F
        pattern.turnOnVoiceNote("A");
        pattern.turnOnVoiceNote("E");
      break;

      case 54:
      case 87:
      case 78: //G
        pattern.turnOnVoiceNote("Bb");
        pattern.turnOnVoiceNote("F");
      break;

      case 56:
      case 82: //A
        pattern.turnOnVoiceNote("C");
        pattern.turnOnVoiceNote("G");
      break;

      case 51:
      case 74:
      case 67: //A# (Bb)
        pattern.turnOnVoiceNote("D");
        pattern.turnOnVoiceNote("A");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C
        pattern.turnOnVoiceNote("E");
        pattern.turnOnVoiceNote("Bb");
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOnVoiceNote("F");
        pattern.turnOnVoiceNote("C");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOnVoiceNote("G");
        pattern.turnOnVoiceNote("D");
      break;
    }
  } else if (currentScale == "Fshrp"){
    switch(code){
      case 85:
      case 68: //F#
        pattern.turnOnVoiceNote("A#");
        pattern.turnOnVoiceNote("E#");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOnVoiceNote("B");
        pattern.turnOnVoiceNote("F#");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOnVoiceNote("C#");
        pattern.turnOnVoiceNote("G#");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOnVoiceNote("D#");
        pattern.turnOnVoiceNote("A#");
      break;

      case 73:
      case 70: //C#
        pattern.turnOnVoiceNote("E#");
        pattern.turnOnVoiceNote("B");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOnVoiceNote("F#");
        pattern.turnOnVoiceNote("C#");
      break;

      case 52:
      case 75:
      case 86: //F (E#)
        pattern.turnOnVoiceNote("G#");
        pattern.turnOnVoiceNote("D#");
      break;
    }
  } else if (currentScale == "G"){
    switch(code){
      case 54:
      case 87:
      case 78: //G
        pattern.turnOnVoiceNote("B");
        pattern.turnOnVoiceNote("F#");
      break;

      case 56:
      case 82: //A
        pattern.turnOnVoiceNote("C");
        pattern.turnOnVoiceNote("G");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOnVoiceNote("D");
        pattern.turnOnVoiceNote("A");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C
        pattern.turnOnVoiceNote("E");
        pattern.turnOnVoiceNote("B");
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOnVoiceNote("F#");
        pattern.turnOnVoiceNote("C");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOnVoiceNote("G");
        pattern.turnOnVoiceNote("D");
      break;

      case 85:
      case 68: //F#
        pattern.turnOnVoiceNote("A");
        pattern.turnOnVoiceNote("E");
      break;
    }
  } else if (currentScale == "Gshrp"){
    switch(code){
      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOnVoiceNote("B#");
        pattern.turnOnVoiceNote("F##");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOnVoiceNote("C#");
        pattern.turnOnVoiceNote("G#");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C (B#)
        pattern.turnOnVoiceNote("D#");
        pattern.turnOnVoiceNote("A#");
      break;

      case 73:
      case 70: //C#
        pattern.turnOnVoiceNote("E#");
        pattern.turnOnVoiceNote("B#");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOnVoiceNote("F##");
        pattern.turnOnVoiceNote("C#");
      break;

      case 52:
      case 75:
      case 86: //F (E#)
        pattern.turnOnVoiceNote("G#");
        pattern.turnOnVoiceNote("D#");
      break;

      case 54:
      case 87:
      case 78: //G (F##)
        pattern.turnOnVoiceNote("A#");
        pattern.turnOnVoiceNote("E#");
      break;
    }
  } else if (currentScale == "A"){
    switch(code){
      case 56:
      case 82: //A
        pattern.turnOnVoiceNote("C#");
        pattern.turnOnVoiceNote("G#");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOnVoiceNote("D");
        pattern.turnOnVoiceNote("A");
      break;

      case 73:
      case 70: //C#
        pattern.turnOnVoiceNote("E");
        pattern.turnOnVoiceNote("B");
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOnVoiceNote("F#");
        pattern.turnOnVoiceNote("C#");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOnVoiceNote("G#");
        pattern.turnOnVoiceNote("D");
      break;

      case 85:
      case 68: //F#
        pattern.turnOnVoiceNote("A");
        pattern.turnOnVoiceNote("E");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOnVoiceNote("B");
        pattern.turnOnVoiceNote("F#");
      break;
    }
  } else if (currentScale == "Ashrp"){
    switch(code){
      case 51:
      case 74:
      case 67: //A#
        pattern.turnOnVoiceNote("C##");
        pattern.turnOnVoiceNote("G##");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C (B#)
        pattern.turnOnVoiceNote("D#");
        pattern.turnOnVoiceNote("A#");
      break;

      case 55:
      case 69:
      case 77: //D (C##)
        pattern.turnOnVoiceNote("E#");
        pattern.turnOnVoiceNote("B#");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOnVoiceNote("F##");
        pattern.turnOnVoiceNote("C##");
      break;

      case 52:
      case 75:
      case 86: //F (E#)
        pattern.turnOnVoiceNote("G##");
        pattern.turnOnVoiceNote("D#");
      break;

      case 54:
      case 87:
      case 78: //G (F##)
        pattern.turnOnVoiceNote("A#");
        pattern.turnOnVoiceNote("E#");
      break;

      case 56:
      case 82: //A (G##)
        pattern.turnOnVoiceNote("B#");
        pattern.turnOnVoiceNote("F##");
      break;
    }
  } else if (currentScale == "B"){
    switch(code){
      case 48:
      case 89:
      case 83: //B
        pattern.turnOnVoiceNote("D#");
        pattern.turnOnVoiceNote("A#");
      break;

      case 73:
      case 70: //C#
        pattern.turnOnVoiceNote("E");
        pattern.turnOnVoiceNote("B");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOnVoiceNote("F#");
        pattern.turnOnVoiceNote("C#");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOnVoiceNote("G#");
        pattern.turnOnVoiceNote("D#");
      break;

      case 85:
      case 68: //F#
        pattern.turnOnVoiceNote("A#");
        pattern.turnOnVoiceNote("E");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOnVoiceNote("B");
        pattern.turnOnVoiceNote("F#");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOnVoiceNote("C#");
        pattern.turnOnVoiceNote("G#");
      break;
    }
  }
}

function voicingOff(code){
  if (currentScale == "C") {
    switch(code){
      case 53:
      case 81:
      case 66:
      case 76: //C
        pattern.turnOffVoiceNote("E");
        pattern.turnOffVoiceNote("B");
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOffVoiceNote("F");
        pattern.turnOffVoiceNote("C");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOffVoiceNote("G");
        pattern.turnOffVoiceNote("D");
      break;

      case 52:
      case 75:
      case 86: //F
        pattern.turnOffVoiceNote("A");
        pattern.turnOffVoiceNote("E");
      break;

      case 54:
      case 87:
      case 78: //G
        pattern.turnOffVoiceNote("B");
        pattern.turnOffVoiceNote("F");
      break;

      case 56:
      case 82: //A
        pattern.turnOffVoiceNote("C");
        pattern.turnOffVoiceNote("G");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOffVoiceNote("D");
        pattern.turnOffVoiceNote("A");
      break;
    }
  } else if (currentScale == "Cshrp") {
    switch(code){
      case 73:
      case 70: //C#
        pattern.turnOffVoiceNote("E#");
        pattern.turnOffVoiceNote("B#");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOffVoiceNote("F#");
        pattern.turnOffVoiceNote("C#");
      break;

      case 52:
      case 75:
      case 86: //F (E#)
        pattern.turnOffVoiceNote("G#");
        pattern.turnOffVoiceNote("D#");
      break;

      case 85:
      case 68: //F#
        pattern.turnOffVoiceNote("A#");
        pattern.turnOffVoiceNote("E#");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOffVoiceNote("B#");
        pattern.turnOffVoiceNote("F#");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOffVoiceNote("C#");
        pattern.turnOffVoiceNote("G#");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C (B#)
        pattern.turnOffVoiceNote("D#");
        pattern.turnOffVoiceNote("A#");
      break;
    }
  } else if (currentScale == "D"){
    switch(code){
      case 55:
      case 69:
      case 77: //D
        pattern.turnOffVoiceNote("F#");
        pattern.turnOffVoiceNote("C#");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOffVoiceNote("G");
        pattern.turnOffVoiceNote("D");
      break;

      case 85:
      case 68: //F#
        pattern.turnOffVoiceNote("A");
        pattern.turnOffVoiceNote("E");
      break;

      case 54:
      case 87:
      case 78: //G
        pattern.turnOffVoiceNote("B");
        pattern.turnOffVoiceNote("F#");
      break;

      case 56:
      case 82: //A
        pattern.turnOffVoiceNote("C#");
        pattern.turnOffVoiceNote("G");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOffVoiceNote("D");
        pattern.turnOffVoiceNote("A");
      break;

      case 73:
      case 70: //C#
        pattern.turnOffVoiceNote("E");
        pattern.turnOffVoiceNote("B");
      break;
    }
  } else if (currentScale == "Dshrp"){
    switch(code){
      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOffVoiceNote("F##");
        pattern.turnOffVoiceNote("C##");
      break;

      case 52:
      case 75:
      case 86: //F (E#)
        pattern.turnOffVoiceNote("G#");
        pattern.turnOffVoiceNote("D#");
      break;

      case 54:
      case 87:
      case 78: //G (F##)
        pattern.turnOffVoiceNote("A#");
        pattern.turnOffVoiceNote("E#");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOffVoiceNote("B#");
        pattern.turnOffVoiceNote("F##");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOffVoiceNote("C##");
        pattern.turnOffVoiceNote("G#");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C (B#)
        pattern.turnOffVoiceNote("D#");
        pattern.turnOffVoiceNote("A#");
      break;

      case 55:
      case 69:
      case 77: //D (C##)
        pattern.turnOffVoiceNote("E#");
        pattern.turnOffVoiceNote("B#");
      break;
    }
  } else if (currentScale == "E"){
    switch(code){
      case 57:
      case 84:
      case 65: //E
        pattern.turnOffVoiceNote("G#");
        pattern.turnOffVoiceNote("D#");
      break;

      case 85:
      case 68: //F#
        pattern.turnOffVoiceNote("A");
        pattern.turnOffVoiceNote("E");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOffVoiceNote("B");
        pattern.turnOffVoiceNote("F#");
      break;

      case 56:
      case 82: //A
        pattern.turnOffVoiceNote("C#");
        pattern.turnOffVoiceNote("G#");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOffVoiceNote("D#");
        pattern.turnOffVoiceNote("A");
      break;

      case 73:
      case 70: //C#
        pattern.turnOffVoiceNote("E");
        pattern.turnOffVoiceNote("B");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOffVoiceNote("F#");
        pattern.turnOffVoiceNote("C#");
      break;
    }
  } else if (currentScale == "F"){
    switch(code){
      case 52:
      case 75:
      case 86: //F
        pattern.turnOffVoiceNote("A");
        pattern.turnOffVoiceNote("E");
      break;

      case 54:
      case 87:
      case 78: //G
        pattern.turnOffVoiceNote("Bb");
        pattern.turnOffVoiceNote("F");
      break;

      case 56:
      case 82: //A
        pattern.turnOffVoiceNote("C");
        pattern.turnOffVoiceNote("G");
      break;

      case 51:
      case 74:
      case 67: //A# (Bb)
        pattern.turnOffVoiceNote("D");
        pattern.turnOffVoiceNote("A");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C
        pattern.turnOffVoiceNote("E");
        pattern.turnOffVoiceNote("Bb");
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOffVoiceNote("F");
        pattern.turnOffVoiceNote("C");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOffVoiceNote("G");
        pattern.turnOffVoiceNote("D");
      break;
    }
  } else if (currentScale == "Fshrp"){
    switch(code){
      case 85:
      case 68: //F#
        pattern.turnOffVoiceNote("A#");
        pattern.turnOffVoiceNote("E#");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOffVoiceNote("B");
        pattern.turnOffVoiceNote("F#");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOffVoiceNote("C#");
        pattern.turnOffVoiceNote("G#");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOffVoiceNote("D#");
        pattern.turnOffVoiceNote("A#");
      break;

      case 73:
      case 70: //C#
        pattern.turnOffVoiceNote("E#");
        pattern.turnOffVoiceNote("B");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOffVoiceNote("F#");
        pattern.turnOffVoiceNote("C#");
      break;

      case 52:
      case 75:
      case 86: //F (E#)
        pattern.turnOffVoiceNote("G#");
        pattern.turnOffVoiceNote("D#");
      break;
    }
  } else if (currentScale == "G"){
    switch(code){
      case 54:
      case 87:
      case 78: //G
        pattern.turnOffVoiceNote("B");
        pattern.turnOffVoiceNote("F#");
      break;

      case 56:
      case 82: //A
        pattern.turnOffVoiceNote("C");
        pattern.turnOffVoiceNote("G");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOffVoiceNote("D");
        pattern.turnOffVoiceNote("A");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C
        pattern.turnOffVoiceNote("E");
        pattern.turnOffVoiceNote("B");
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOffVoiceNote("F#");
        pattern.turnOffVoiceNote("C");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOffVoiceNote("G");
        pattern.turnOffVoiceNote("D");
      break;

      case 85:
      case 68: //F#
        pattern.turnOffVoiceNote("A");
        pattern.turnOffVoiceNote("E");
      break;
    }
  } else if (currentScale == "Gshrp"){
    switch(code){
      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOffVoiceNote("B#");
        pattern.turnOffVoiceNote("F##");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOffVoiceNote("C#");
        pattern.turnOffVoiceNote("G#");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C (B#)
        pattern.turnOffVoiceNote("D#");
        pattern.turnOffVoiceNote("A#");
      break;

      case 73:
      case 70: //C#
        pattern.turnOffVoiceNote("E#");
        pattern.turnOffVoiceNote("B#");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOffVoiceNote("F##");
        pattern.turnOffVoiceNote("C#");
      break;

      case 52:
      case 75:
      case 86: //F (E#)
        pattern.turnOffVoiceNote("G#");
        pattern.turnOffVoiceNote("D#");
      break;

      case 54:
      case 87:
      case 78: //G (F##)
        pattern.turnOffVoiceNote("A#");
        pattern.turnOffVoiceNote("E#");
      break;
    }
  } else if (currentScale == "A"){
    switch(code){
      case 56:
      case 82: //A
        pattern.turnOffVoiceNote("C#");
        pattern.turnOffVoiceNote("G#");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOffVoiceNote("D");
        pattern.turnOffVoiceNote("A");
      break;

      case 73:
      case 70: //C#
        pattern.turnOffVoiceNote("E");
        pattern.turnOffVoiceNote("B");
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOffVoiceNote("F#");
        pattern.turnOffVoiceNote("C#");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOffVoiceNote("G#");
        pattern.turnOffVoiceNote("D");
      break;

      case 85:
      case 68: //F#
        pattern.turnOffVoiceNote("A");
        pattern.turnOffVoiceNote("E");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOffVoiceNote("B");
        pattern.turnOffVoiceNote("F#");
      break;
    }
  } else if (currentScale == "Ashrp"){
    switch(code){
      case 51:
      case 74:
      case 67: //A#
        pattern.turnOffVoiceNote("C##");
        pattern.turnOffVoiceNote("G##");
      break;

      case 53:
      case 81:
      case 66:
      case 76: //C (B#)
        pattern.turnOffVoiceNote("D#");
        pattern.turnOffVoiceNote("A#");
      break;

      case 55:
      case 69:
      case 77: //D (C##)
        pattern.turnOffVoiceNote("E#");
        pattern.turnOffVoiceNote("B#");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOffVoiceNote("F##");
        pattern.turnOffVoiceNote("C##");
      break;

      case 52:
      case 75:
      case 86: //F (E#)
        pattern.turnOffVoiceNote("G##");
        pattern.turnOffVoiceNote("D#");
      break;

      case 54:
      case 87:
      case 78: //G (F##)
        pattern.turnOffVoiceNote("A#");
        pattern.turnOffVoiceNote("E#");
      break;

      case 56:
      case 82: //A (G##)
        pattern.turnOffVoiceNote("B#");
        pattern.turnOffVoiceNote("F##");
      break;
    }
  } else if (currentScale == "B"){
    switch(code){
      case 48:
      case 89:
      case 83: //B
        pattern.turnOffVoiceNote("D#");
        pattern.turnOffVoiceNote("A#");
      break;

      case 73:
      case 70: //C#
        pattern.turnOffVoiceNote("E");
        pattern.turnOffVoiceNote("B");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOffVoiceNote("F#");
        pattern.turnOffVoiceNote("C#");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOffVoiceNote("G#");
        pattern.turnOffVoiceNote("D#");
      break;

      case 85:
      case 68: //F#
        pattern.turnOffVoiceNote("A#");
        pattern.turnOffVoiceNote("E");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOffVoiceNote("B");
        pattern.turnOffVoiceNote("F#");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOffVoiceNote("C#");
        pattern.turnOffVoiceNote("G#");
      break;
    }
  }
}


/*        :::::::::::            SCALE CHANGE FUNCTION            :::::::::::        */
const basicNotes = ["C", "Cshrp", "D", "Dshrp", "E", "F", "Fshrp", "G", "Gshrp", "A", "Ashrp", "B"];

function activateScaleNotes(rootNote){
  pattern.redrawRequired = true;

  let offset;
  let equivalentIonian;
  let notePosition = basicNotes.indexOf(rootNote);

  switch(currentMode){
    case "ionian":
      offset = 0;
      break;
    case "dorian":
      if(notePosition-2 < 0)
        offset = -10;
      else offset = 2;
      break;
    case "phrygian":
      if(notePosition-4 < 0)
        offset = -8;
      else offset = 4;
      break;
    case "lydian":
      if(notePosition-5 < 0)
        offset = -7;
      else offset = 5;
      break;
    case "mixolydian":
      if(notePosition-7 < 0)
        offset = -5;
      else offset = 7;
      break;
    case "aeolian":
      if(notePosition-9 < 0)
        offset = -3;
      else offset = 9;
      break;
    case "locrian":
      if(notePosition-11 < 0)
        offset = -1;
      else offset = 11;
      break;
  }

  var equivalentIonianIndex = notePosition - offset;
  equivalentIonian = basicNotes[equivalentIonianIndex];
  var array = scaleMap.get(equivalentIonian);
  pattern.changeNoteId(array);
  pattern.turnOnRootNote(currentScale);
  pattern.turnOnScaleNotes(scaleNotes.get(equivalentIonian));
}

//DOM interaction
window.triggerScaleChange = function(e){
  pattern.resetNoteStatus();
  currentScale = e.value;
  //console.log("Scala da visualizzare: " + currentScale + " " + currentMode);
  if(currentScale != "none") {
    activateScaleNotes(currentScale);
  }
  else {
    activateScaleNotes("C");
    pattern.resetNoteStatus();
    //This is to show the "simplest" note names if no scale is selected
  }
};

window.triggerModeChange = function(e){
  pattern.resetNoteStatus();
  currentMode = e.value;
  //console.log("Scala da visualizzare: " + currentScale + " " + currentMode);
  if(currentScale != "none") {
    activateScaleNotes(currentScale);
  }
}

window.triggerVoicingChange = function(e){
  //console.log("Valore checkbox voicing: " + e.checked);
  showVoicings = e.checked;
  //console.log("Valore showVoicings: " + showVoicings);
}
