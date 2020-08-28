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
    playNote(note, velocity);
    pattern.redrawRequired = true; //in order to trigger the redraw function
}

function noteOff(note){
    deactivateNoteOnGrid(note);
    releaseNote(note);
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
    let noteNumber = note % 12;

    switch(noteNumber){
        case 0: //C
            pattern.getArrayElement(0).isActive = false
            pattern.getArrayElement(14).isActive = false
            pattern.getArrayElement(15).isActive = false
        break;

        case 1: //C#
            pattern.getArrayElement(8).isActive = false
        break;

        case 2: //D
            pattern.getArrayElement(2).isActive = false
            pattern.getArrayElement(17).isActive = false
        break;

        case 3: //D#
            pattern.getArrayElement(11).isActive = false
        break;

        case 4: //E
            pattern.getArrayElement(4).isActive = false
            pattern.getArrayElement(5).isActive = false
            pattern.getArrayElement(19).isActive = false
        break;

        case 5: //F
            pattern.getArrayElement(13).isActive = false
        break;

        case 6: //F#
            pattern.getArrayElement(7).isActive = false
        break;

        case 7: //G
            pattern.getArrayElement(1).isActive = false
            pattern.getArrayElement(16).isActive = false
        break;

        case 8: //G#
            pattern.getArrayElement(9).isActive = false
            pattern.getArrayElement(10).isActive = false
        break;

        case 9: //A
            pattern.getArrayElement(3).isActive = false
            pattern.getArrayElement(18).isActive = false
        break;

        case 10: //A#
            pattern.getArrayElement(12).isActive = false
        break;

        case 11: //B
            pattern.getArrayElement(6).isActive = false
        break;
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
