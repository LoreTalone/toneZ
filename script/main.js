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
  pattern.drawPattern(pattern.offScr); //draw the basic pattern into a grafic buffer

  //we generate the entire grid, placing each graphic buffer image next to each other
  let shift = 0;
  //adjust variables for the full screen view
  adj_row = 0;
  adj_col = 1;
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


function activateNoteOnGridBuiltInKey(code){
    pattern.redrawRequired = true;
    val = code.keyCode;

    switch(val){
        case 81:
        case 66:
        case 76: //C
            pattern.getArrayElement(0).isActive = true;
            pattern.getArrayElement(14).isActive = true;
            pattern.getArrayElement(15).isActive = true;
        break;

        case 73:
        case 70: //C#
            pattern.getArrayElement(8).isActive = true;
        break;

        case 69:
        case 77: //D
            pattern.getArrayElement(2).isActive = true;
            pattern.getArrayElement(17).isActive = true;
        break;

        case 80:
        case 72:
        case 88: //D#
            pattern.getArrayElement(11).isActive = true;
        break;

        case 84:
        case 65: //E
            pattern.getArrayElement(4).isActive = true;
            pattern.getArrayElement(5).isActive = true;
            pattern.getArrayElement(19).isActive = true;
        break;

        case 75:
        case 86: //F
            pattern.getArrayElement(13).isActive = true;
        break;

        case 85:
        case 68: //F#
            pattern.getArrayElement(7).isActive = true;
        break;

        case 87:
        case 78: //G
            pattern.getArrayElement(1).isActive = true;
            pattern.getArrayElement(16).isActive = true;
        break;

        case 79:
        case 71:
        case 90: //G#
            pattern.getArrayElement(9).isActive = true;
            pattern.getArrayElement(10).isActive = true;
        break;

        case 82: //A
            pattern.getArrayElement(3).isActive = true;
            pattern.getArrayElement(18).isActive = true;
        break;

        case 74:
        case 67: //A#
            pattern.getArrayElement(12).isActive = true;
        break;

        case 89:
        case 83: //B
            pattern.getArrayElement(6).isActive = true;
        break;
    }
}

function deactivateNoteOnGridBuiltInKey(code){
    pattern.redrawRequired = true;
    val = code.keyCode;

    switch(val){
        case 81:
        case 66:
        case 76: //C
            pattern.getArrayElement(0).isActive = false;
            pattern.getArrayElement(14).isActive = false;
            pattern.getArrayElement(15).isActive = false;
        break;

        case 73:
        case 70: //C#
            pattern.getArrayElement(8).isActive = false;
        break;

        case 69:
        case 77: //D
            pattern.getArrayElement(2).isActive = false;
            pattern.getArrayElement(17).isActive = false;
        break;

        case 80:
        case 72:
        case 88: //D#
            pattern.getArrayElement(11).isActive = false;
        break;

        case 84:
        case 65: //E
            pattern.getArrayElement(4).isActive = false;
            pattern.getArrayElement(5).isActive = false;
            pattern.getArrayElement(19).isActive = false;
        break;

        case 75:
        case 86: //F
            pattern.getArrayElement(13).isActive = false;
        break;

        case 85:
        case 68: //F#
            pattern.getArrayElement(7).isActive = false;
        break;

        case 87:
        case 78: //G
            pattern.getArrayElement(1).isActive = false;
            pattern.getArrayElement(16).isActive = false;
        break;

        case 79:
        case 71:
        case 90: //G#
            pattern.getArrayElement(9).isActive = false;
            pattern.getArrayElement(10).isActive = false;
        break;

        case 82: //A
            pattern.getArrayElement(3).isActive = false;
            pattern.getArrayElement(18).isActive = false;
        break;

        case 74:
        case 67: //A#
            pattern.getArrayElement(12).isActive = false;
        break;

        case 89:
        case 83: //B
            pattern.getArrayElement(6).isActive = false;
        break;
    }
}

document.addEventListener('keydown', activateNoteOnGridBuiltInKey);
document.addEventListener('keyup', deactivateNoteOnGridBuiltInKey);


/*        :::::::::::            MIDI FUNCTIONALITIES            :::::::::::        */


if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
    console.log('Could not access any MIDI device.');
}

function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values()){
        input.onmidimessage = getMIDIMessage;
    }
}

function getMIDIMessage(message){
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

    console.log("Command: " + command + "; Note: " + note + "; Velocity: " + velocity);

    switch (command) {
        case 144: // noteOn
            if (velocity > 0) {
                noteOn(note, velocity);
            } else {
                noteOff(note);
            }
            break;
        case 128: // noteOff
            noteOff(note);
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
}

function noteOn(note, velocity){
    activateNoteOnGrid(note);
    pattern.redrawRequired = true; //in order to trigger the redraw function
}

function noteOff(note){
    deactivateNoteOnGrid(note);
    pattern.redrawRequired = true; //in order to trigger the redraw function
}

function activateNoteOnGrid(note){
    var noteName = note % 12;

    switch(noteName){
        case 0: //C
            pattern.getArrayElement(0).isActive = true;
            pattern.getArrayElement(14).isActive = true;
            pattern.getArrayElement(15).isActive = true;
        break;

        case 1: //C#
            pattern.getArrayElement(8).isActive = true;
        break;

        case 2: //D
            pattern.getArrayElement(2).isActive = true;
            pattern.getArrayElement(17).isActive = true;
        break;

        case 3: //D#
            pattern.getArrayElement(11).isActive = true;
        break;

        case 4: //E
            pattern.getArrayElement(4).isActive = true;
            pattern.getArrayElement(5).isActive = true;
            pattern.getArrayElement(19).isActive = true;
        break;

        case 5: //F
            pattern.getArrayElement(13).isActive = true;
        break;

        case 6: //F#
            pattern.getArrayElement(7).isActive = true;
        break;

        case 7: //G
            pattern.getArrayElement(1).isActive = true;
            pattern.getArrayElement(16).isActive = true;
        break;

        case 8: //G#
            pattern.getArrayElement(9).isActive = true;
            pattern.getArrayElement(10).isActive = true;
        break;

        case 9: //A
            pattern.getArrayElement(3).isActive = true;
            pattern.getArrayElement(18).isActive = true;
        break;

        case 10: //A#
            pattern.getArrayElement(12).isActive = true;
        break;

        case 11: //B
            pattern.getArrayElement(6).isActive = true;
        break;

    }
}

function deactivateNoteOnGrid(note){
    var noteName = note % 12;

    switch(noteName){
        case 0: //C
            pattern.getArrayElement(0).isActive = false;
            pattern.getArrayElement(14).isActive = false;
            pattern.getArrayElement(15).isActive = false;
        break;

        case 1: //C#
            pattern.getArrayElement(8).isActive = false;
        break;

        case 2: //D
            pattern.getArrayElement(2).isActive = false;
            pattern.getArrayElement(17).isActive = false;
        break;

        case 3: //D#
            pattern.getArrayElement(11).isActive = false;
        break;

        case 4: //E
            pattern.getArrayElement(4).isActive = false;
            pattern.getArrayElement(5).isActive = false;
            pattern.getArrayElement(19).isActive = false;
        break;

        case 5: //F
            pattern.getArrayElement(13).isActive = false;
        break;

        case 6: //F#
            pattern.getArrayElement(7).isActive = false;
        break;

        case 7: //G
            pattern.getArrayElement(1).isActive = false;
            pattern.getArrayElement(16).isActive = false;
        break;

        case 8: //G#
            pattern.getArrayElement(9).isActive = false;
            pattern.getArrayElement(10).isActive = false;
        break;

        case 9: //A
            pattern.getArrayElement(3).isActive = false;
            pattern.getArrayElement(18).isActive = false;
        break;

        case 10: //A#
            pattern.getArrayElement(12).isActive = false;
        break;

        case 11: //B
            pattern.getArrayElement(6).isActive = false;
        break;
    }
}
