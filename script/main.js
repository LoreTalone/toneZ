//p5.disableFriendlyErrors = true;
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


// NB VOICING IS THE SAME FOR A SPECIFIC SCALE BECAUSE EVERY MODE CAN BE RESET TO THE IONIAN ONE FOR A SPECIFIC NOTE
function voicingOn(btn){
  pattern.redrawRequired = true;
  code = btn.keyCode;

//FOR EACH SCALE, we check the pressed note. NOW, FOR EACH NOTE we can highlights the relative3rd and 7th note for the voicing criteria
//for some pressed notes THERE AREN'T higlighted note !! it depends on the selected scales on musicalScales
  if (musicalScales.C) {
    switch(code){
      case 53:
      case 81:
      case 66:
      case 76: //if i press C, some specific note will be highlighted
          pattern.turnOnVoiceNote("D");
          pattern.turnOnVoiceNote("A");
      break;

      case 73:
      case 70: //C#
          pattern.turnOnVoiceNote("A#");
          pattern.turnOnVoiceNote("F#");
      break;

      case 55:
      case 69:
      case 77: //D
          pattern.getArrayElement(2).isVoice = true;
          pattern.getArrayElement(17).isVoice = true;
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
          pattern.getArrayElement(11).isVoice = true;
      break;

      case 57:
      case 84:
      case 65: //E
          pattern.getArrayElement(4).isVoice = true;
          pattern.getArrayElement(5).isVoice = true;
          pattern.getArrayElement(19).isVoice = true;
      break;

      case 52:
      case 75:
      case 86: //F
          pattern.getArrayElement(13).isVoice = true;
      break;

      case 85:
      case 68: //F#
          pattern.getArrayElement(7).isVoice = true;
      break;

      case 54:
      case 87:
      case 78: //G
          pattern.getArrayElement(1).isVoice = true;
          pattern.getArrayElement(16).isVoice = true;
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
          pattern.getArrayElement(9).isVoice = true;
          pattern.getArrayElement(10).isVoice = true;
      break;

      case 56:
      case 82: //A
          pattern.getArrayElement(3).isVoice = true;
          pattern.getArrayElement(18).isVoice = true;
      break;

      case 51:
      case 74:
      case 67: //A#
          pattern.getArrayElement(12).isVoice = true;
      break;

      case 48:
      case 89:
      case 83: //B
          pattern.getArrayElement(6).isVoice = true;
      break;
    } //[TO FIX] i have to hard code the right notes to highlight
  } else if (musicalScales.Cshrp) {

  } else if (musicalScales.D){

  } else if (musicalScales.Dshrp){

  } else if (musicalScales.E){

  } else if (musicalScales.F){

  } else if (musicalScales.Fshrp){

  } else if (musicalScales.G){

  } else if (musicalScales.Gshrp){

  } else if (musicalScales.A){

  } else if (musicalScales.Ashrp){

  } else if (musicalScales.B){

  }
}

//[TO FIX] COPY and PASTE the code above changing turnOffVoiceNote();
function voicingOff(btn){
  pattern.redrawRequired = true;
  code = btn.keyCode;

  //FOR EACH SCALE, we check the pressed note. NOW, FOR EACH NOTE we can highlights the relative "right choice" for the voicing criteria

  if (musicalModes[0] == "ionian") {
    switch(code){
      case 53:
      case 81:
      case 66:
      case 76: //if i press C, some note will be highlighted, and so on
          pattern.getArrayElement(1).isVoice = false;
          pattern.getArrayElement(16).isVoice = false;
          pattern.getArrayElement(12).isVoice = false;
      break;

      case 73:
      case 70: //C#
          pattern.getArrayElement(8).isVoice = false;
      break;

      case 55:
      case 69:
      case 77: //D
          pattern.getArrayElement(2).isVoice = false;
          pattern.getArrayElement(17).isVoice = false;
      break;

      case 50:
      case 80:
      case 72:
      case 88: //D#
          pattern.getArrayElement(11).isVoice = false;
      break;

      case 57:
      case 84:
      case 65: //E
          pattern.getArrayElement(4).isVoice = false;
          pattern.getArrayElement(5).isVoice = false;
          pattern.getArrayElement(19).isVoice = false;
      break;

      case 52:
      case 75:
      case 86: //F
          pattern.getArrayElement(13).isVoice = false;
      break;

      case 85:
      case 68: //F#
          pattern.getArrayElement(7).isVoice = false;
      break;

      case 54:
      case 87:
      case 78: //G
          pattern.getArrayElement(1).isVoice = false;
          pattern.getArrayElement(16).isVoice = false;
      break;

      case 49:
      case 79:
      case 71:
      case 90: //G#
          pattern.getArrayElement(9).isVoice = false;
          pattern.getArrayElement(10).isVoice = false;
      break;

      case 56:
      case 82: //A
          pattern.getArrayElement(3).isVoice = false;
          pattern.getArrayElement(18).isVoice = false;
      break;

      case 51:
      case 74:
      case 67: //A#
          pattern.getArrayElement(12).isVoice = false;
      break;

      case 48:
      case 89:
      case 83: //B
          pattern.getArrayElement(6).isVoice = false;
      break;
    }

  } else if (musicalModes[3] == "dorian") {

  } else {
    console.log("bye");
  }

}

document.addEventListener('keydown', voicingOn);
document.addEventListener('keyup', voicingOff);


/*        :::::::::::            GHOST FUNCTION            :::::::::::        */


//queue qrray for an highlights decay
