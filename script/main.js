//p5.disableFriendlyErrors = true;
var actualScale;

/*        :::::::::::            GRAPHICS SETUP            :::::::::::        */
function setup (){
    createCanvas (windowWidth, windowHeight);
    frameRate(30);
    //pixelDensity(1);
    pattern = new basicPattern(0,0);
}

function draw(){
  //cyclic call
  //when we have changes we have to redraw the grid
  if (pattern.redrawRequired) redrawAll();
}

/*        :::::::::::            GRID GENERATOR            :::::::::::        */
function redrawAll(){
  background(colorBackground);
  translate(0,-150); //in order to avoid the blank part of the repeated grid
  pattern.drawPattern(pattern.offScr); //draw the basic pattern into a graphic buffer

  //we generate the entire grid, placing each graphic buffer image next to each other
  let shift = 0;
  //adjust variables for the full screen view
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
  //once we have redrawed all, we can set the redrawRequired to false, to prevent the looping draw behaviour, so less cpu consuption
  pattern.redrawRequired = false;
}

function windowResized() {
  //resize/redraw the sketch every time we resize the window
  resizeCanvas(windowWidth, windowHeight);
  pattern.redrawRequired = true;
}

/*        :::::::::::            KEY EVENT            :::::::::::        */


function pressedKey(btn){
  pattern.redrawRequired = true;
  code = btn.keyCode;

  switch(code){
      case 53:
      case 81:
      case 66:
      case 76: //C
        pattern.turnOnNote("C");
      break;

      case 73:
      case 70: //C#
        pattern.turnOnNote("C#");
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOnNote("D");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOnNote("D#");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOnNote("E");
      break;

      case 52:
      case 75:
      case 86: //F
        pattern.turnOnNote("F");
      break;

      case 85:
      case 68: //F#
        pattern.turnOnNote("F#");
      break;

      case 54:
      case 87:
      case 78: //G
        pattern.turnOnNote("G");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOnNote("G#");
      break;

      case 56:
      case 82: //A
        pattern.turnOnNote("A");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOnNote("A#");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOnNote("B");
      break;
    }
}

function releasedKey(btn){
    pattern.redrawRequired = true;
    code = btn.keyCode;

    switch(code){
      case 53:
      case 81:
      case 66:
      case 76: //C
        pattern.turnOffNote("C");
      break;

      case 73:
      case 70: //C#
        pattern.turnOffNote("C#");
      break;

      case 55:
      case 69:
      case 77: //D
        pattern.turnOffNote("D");
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
        pattern.turnOffNote("D#");
      break;

      case 57:
      case 84:
      case 65: //E
        pattern.turnOffNote("E");
      break;

      case 52:
      case 75:
      case 86: //F
        pattern.turnOffNote("F");
      break;

      case 85:
      case 68: //F#
        pattern.turnOffNote("F#");
      break;

      case 54:
      case 87:
      case 78: //G
        pattern.turnOffNote("G");
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
        pattern.turnOffNote("G#");
      break;

      case 56:
      case 82: //A
        pattern.turnOffNote("A");
      break;

      case 51:
      case 74:
      case 67: //A#
        pattern.turnOffNote("A#");
      break;

      case 48:
      case 89:
      case 83: //B
        pattern.turnOffNote("B");
      break;
    }
}

document.addEventListener('keydown', pressedKey);
document.addEventListener('keyup', releasedKey);


/*        :::::::::::            VOICING REPRESENTATION           :::::::::::        */

function voicingOn(btn){
  pattern.redrawRequired = true;
  code = btn.keyCode;

//FOR EACH SCALE, we check the pressed note. NOW, FOR EACH NOTE we can highlights the relative3rd and 7th note for the voicing criteria
//for some pressed notes THERE AREN'T higlighted note !! it depends on the selected scales on musicalScales
  if (actualScale == "C") {
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
  } else if (actualScale == "Cshrp") {
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
  } else if (actualScale == "D"){
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
  } else if (actualScale == "Dshrp"){
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
  } else if (actualScale == "E"){
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
  } else if (actualScale == "F"){
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
  } else if (actualScale == "Fshrp"){
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
  } else if (actualScale == "G"){
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
  } else if (actualScale == "Gshrp"){
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
  } else if (actualScale == "A"){
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
  } else if (actualScale == "Ashrp"){
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
  } else if (actualScale == "B"){
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

function voicingOff(btn){
  pattern.redrawRequired = true;
  code = btn.keyCode;

  if (actualScale == "C") {
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
  } else if (actualScale == "Cshrp") {
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
  } else if (actualScale == "D"){
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
  } else if (actualScale == "Dshrp"){
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
  } else if (actualScale == "E"){
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
  } else if (actualScale == "F"){
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
  } else if (actualScale == "Fshrp"){
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
  } else if (actualScale == "G"){
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
  } else if (actualScale == "Gshrp"){
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
  } else if (actualScale == "A"){
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
  } else if (actualScale == "Ashrp"){
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
  } else if (actualScale == "B"){
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

document.addEventListener('keydown', voicingOn);
document.addEventListener('keyup', voicingOff);


/*        :::::::::::            GHOST FUNCTION            :::::::::::        */


//queue qrray for an highlights decay


/*        :::::::::::            SCALE CHANGE BEHAVIOUR            :::::::::::        */

window.triggerScaleChange = function(e){
  pattern.resetNoteStatus();
  actualScale = e.value;
  console.log("Scala da visualizzare: " + e.value);
  var array = scaleMap.get(actualScale);
  console.log("Note della scala: " + array);
  pattern.changeNoteId(array);

//graphical representation of the selected ROOT and SCALE
  pattern.turnOnRootNote(actualScale);
  pattern.turnOnScaleNotes(scaleNotes.get(actualScale));
};
