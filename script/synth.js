window.onload = function() {
    var audioCtx = new AudioContext();
    audioCtx.resume();
};

const synth = new Tone.PolySynth().toDestination();

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];


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
                //pattern.redrawRequired = true;
            } else {
                noteOff(note);
            }
            break;
        case 128: // noteOff
            noteOff(note);
            //pattern.redrawRequired = true;
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
}

function noteOn(note, velocity){
    playNote(note, velocity);
    let equivalentKeyCode = midiToEquivalentKeycode(note);
    if(showVoicings==true){
        voicingOn(equivalentKeyCode);
    }
    activateNoteOnGrid(note);
    pattern.redrawRequired = true; //in order to trigger the redraw function
}

function noteOff(note){
    releaseNote(note);
    let equivalentKeyCode = midiToEquivalentKeycode(note);
    voicingOff(equivalentKeyCode);
    deactivateNoteOnGrid(note);
    pattern.redrawRequired = true; //in order to trigger the redraw function
}

function activateNoteOnGrid(note){
    let noteNumber = note % 12;
    
    switch(noteNumber){
        case 0: //C
            pattern.turnOnNote([0, 14, 15]);
        break;

        case 1: //C#
            pattern.turnOnNote([8]);
        break;

        case 2: //D
            pattern.turnOnNote([2, 17]);
        break;

        case 3: //D#
            pattern.turnOnNote([11]);
        break;

        case 4: //E
            pattern.turnOnNote([4, 5, 19]);
        break;

        case 5: //F
            pattern.turnOnNote([13]);
        break;

        case 6: //F#
            pattern.turnOnNote([7]);
        break;

        case 7: //G
            pattern.turnOnNote([1, 16]);
        break;

        case 8: //G#
            pattern.turnOnNote([9, 10]);
        break;

        case 9: //A
            pattern.turnOnNote([3, 18]);
        break;

        case 10: //A#
            pattern.turnOnNote([12]);
        break;

        case 11: //B
            pattern.turnOnNote([6]);
        break;
    }
}

function deactivateNoteOnGrid(note){
    let noteNumber = note % 12;

    switch(noteNumber){
        case 0: //C
            pattern.turnOffNote([0, 14, 15]);
        break;

        case 1: //C#
            pattern.turnOffNote([8]);
        break;

        case 2: //D
            pattern.turnOffNote([2, 17]);
        break;

        case 3: //D#
            pattern.turnOffNote([11]);
        break;

        case 4: //E
            pattern.turnOffNote([4, 5, 19]);
        break;

        case 5: //F
            pattern.turnOffNote([13]);
        break;

        case 6: //F#
            pattern.turnOffNote([7]);
        break;

        case 7: //G
            pattern.turnOffNote([1, 16]);
        break;

        case 8: //G#
            pattern.turnOffNote([9, 10]);
        break;

        case 9: //A
            pattern.turnOffNote([3, 18]);
        break;

        case 10: //A#
            pattern.turnOffNote([12]);
        break;

        case 11: //B
            pattern.turnOffNote([6]);
        break;
    }
}

function midiToEquivalentKeycode(note){
    let noteNumber = note % 12;

    switch(noteNumber){
        case 0: //C
            return 53;
        case 1: //C#
            return 73;
        case 2: //D
            return 55;
        case 3: //D#
            return 50;
        case 4: //E
            return 57;
        case 5: //F
            return 52;
        case 6: //F#
            return 68;
        case 7: //G
            return 54;
       case 8: //G#
            return 49;
       case 9: //A
            return 56;
        case 10: //A#
            return 51;
        case 11: //B
            return 48;
   }
}


//SOUND
function returnNoteNameString(note){
    let noteNumber = note % 12;
    let octaveNumber = Math.floor(note/12);
    return notes[noteNumber] + octaveNumber;
}

function playNote(note, velocity){
    noteName = returnNoteNameString(note);
    console.log("Note played: " + noteName);
    let now = Tone.now();
    synth.triggerAttack(noteName, now, velocity/127);
}

function releaseNote(note){
    noteName = returnNoteNameString(note);
    console.log("Note released: " + noteName);
    synth.triggerRelease(noteName);
}

function changeOscillatorType(type){
    synth.set({
        "oscillator":{
            "type": type
        }
    });
    console.log("oscillator changed to: " + type)
}

window.triggerOscillatorChange = function(e){
    changeOscillatorType(e.value);
}

function setAttack(value){
    synth.set({
        "envelope":{
            "attack": value
        }
    });
}

function setDecay(value){
    synth.set({
        "envelope":{
            "decay": value
        }
    });
}

function setSustain(value){
    synth.set({
        "envelope":{
            "sustain": value
        }
    });
}

function setRelease(value){
    synth.set({
        "envelope":{
            "release": value
        }
    });
}



//KEY EVENT
function pressedKeySound(btn){
  code = btn.keyCode;
  let velocity = 120;

  if(btn.repeat) return; //prevent the key repeat behaviour

  switch(code){
    case 49:
      playNote(32, velocity);
    break;

    case 50:
      playNote(39, velocity);
    break;

    case 51:
      playNote(46, velocity);
    break;

    case 52:
      playNote(53, velocity);
    break;

    case 53:
      playNote(60, velocity);
    break;

    case 54:
      playNote(67, velocity);
    break;

    case 55:
      playNote(74, velocity);
    break;

    case 56:
      playNote(81, velocity);
    break;

    case 57:
      playNote(88, velocity);
    break;

    case 48:
      playNote(95, velocity);
    break;

    case 81:
      playNote(48, velocity);
    break;

    case 87:
      playNote(55, velocity);
    break;

    case 69:
      playNote(62, velocity);
    break;

    case 82:
      playNote(69, velocity);
    break;

    case 84:
      playNote(76, velocity);
    break;

    case 89:
      playNote(83, velocity);
    break;

    case 85:
      playNote(90, velocity);
    break;

    case 73:
      playNote(97, velocity);
    break;

    case 79:
      playNote(104, velocity);
    break;

    case 80:
      playNote(111, velocity);
    break;

    case 65:
      playNote(52, velocity);
    break;

    case 83:
      playNote(59, velocity);
    break;

    case 68:
      playNote(66, velocity);
    break;

    case 70:
      playNote(73, velocity);
    break;

    case 71:
      playNote(80, velocity);
    break;

    case 72:
      playNote(87, velocity);
    break;

    case 74:
      playNote(94, velocity);
    break;

    case 75:
      playNote(101, velocity);
    break;

    case 76:
      playNote(108, velocity);
    break;

    case 90:
      playNote(56, velocity);
    break;

    case 88:
      playNote(63, velocity);
    break;

    case 67:
      playNote(70, velocity);
    break;

    case 86:
      playNote(77, velocity);
    break;

    case 66:
      playNote(84, velocity);
    break;

    case 78:
      playNote(91, velocity);
    break;

    case 77:
      playNote(98, velocity);
    break;
  }
}

function releasedKeySound(btn){
  code = btn.keyCode;

  switch(code){
    case 49:
      releaseNote(32);
    break;

    case 50:
      releaseNote(39);
    break;

    case 51:
      releaseNote(46);
    break;

    case 52:
      releaseNote(53);
    break;

    case 53:
      releaseNote(60);
    break;

    case 54:
      releaseNote(67);
    break;

    case 55:
      releaseNote(74);
    break;

    case 56:
      releaseNote(81);
    break;

    case 57:
      releaseNote(88);
    break;

    case 48:
      releaseNote(95);
    break;

    case 81:
      releaseNote(48);
    break;

    case 87:
      releaseNote(55);
    break;

    case 69:
      releaseNote(62);
    break;

    case 82:
      releaseNote(69);
    break;

    case 84:
      releaseNote(76);
    break;

    case 89:
      releaseNote(83);
    break;

    case 85:
      releaseNote(90);
    break;

    case 73:
      releaseNote(97);
    break;

    case 79:
      releaseNote(104);
    break;

    case 80:
      releaseNote(111);
    break;

    case 65:
      releaseNote(52);
    break;

    case 83:
      releaseNote(59);
    break;

    case 68:
      releaseNote(66);
    break;

    case 70:
      releaseNote(73);
    break;

    case 71:
      releaseNote(80);
    break;

    case 72:
      releaseNote(87);
    break;

    case 74:
      releaseNote(94);
    break;

    case 75:
      releaseNote(101);
    break;

    case 76:
      releaseNote(108);
    break;

    case 90:
      releaseNote(56);
    break;

    case 88:
      releaseNote(63);
    break;

    case 67:
      releaseNote(70);
    break;

    case 86:
      releaseNote(77);
    break;

    case 66:
      releaseNote(84);
    break;

    case 78:
      releaseNote(91);
    break;

    case 77:
      releaseNote(98);
    break;
  }
}


document.addEventListener('keydown', pressedKeySound);
document.addEventListener('keyup', releasedKeySound);
