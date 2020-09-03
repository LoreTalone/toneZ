const gameChords = [[0, 1, 5], [1, 2, 6], [2, 3, 7], [3, 4, 8], [5, 6, 10], [6, 7, 11], [7, 8, 12], [8, 9, 13], [10, 11, 15], [11, 12, 16], [12, 13, 17], [13, 14, 18], [5, 6, 1], [6, 7, 2], [7, 8, 3], [8, 9, 4], [10, 11, 6], [11, 12, 7], [12, 13, 8], [13, 14, 9], [15, 16, 11], [16, 17, 12], [17, 18, 13], [18, 19, 14]];
var totalScore = 0;
var lives = 6;
var gameChordDisplayed;

window.onload = function() {
    var audioCtx = new AudioContext();
    audioCtx.resume();
};

const synth = new Tone.PolySynth().toDestination();

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

var notesBeingPlayed = [];

var wrongNotes = [];

var newNotesRequired = true;

var iterationNeeded = false;

var notedisplayed1;
var notedisplayed2;
var notedisplayed3;


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

    //console.log("Command: " + command + "; Note: " + note + "; Velocity: " + velocity);

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
    }
}

function noteOn(note, velocity){
    playNote(note, velocity);
    activateNoteOnGrid(note);
    notesBeingPlayed.push(returnNoteNameStringNoOctave(note));
    //console.log("Notes being played: " + notesBeingPlayed);
    iterateGame();
    pattern.redrawRequired = true; //in order to trigger the redraw function
}

function noteOff(note){
    releaseNote(note);
    deactivateNoteOnGrid(note);
    let index = notesBeingPlayed.indexOf(returnNoteNameStringNoOctave(note));
    notesBeingPlayed.splice(index);
    //console.log("Notes being played: " + notesBeingPlayed);
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


/*        :::::::::::            SOUND            :::::::::::        */

function returnNoteNameString(note){
    let noteNumber = note % 12;
    let octaveNumber = Math.floor(note/12);
    return notes[noteNumber] + octaveNumber;
}

function returnNoteNameStringNoOctave(note){
  let noteNumber = note % 12;
  return notes[noteNumber];
}

function playNote(note, velocity){
    noteName = returnNoteNameString(note);
    //console.log("Note played: " + noteName);
    let now = Tone.now();
    synth.triggerAttack(noteName, now, velocity/127);
}

function releaseNote(note){
    noteName = returnNoteNameString(note);
    //console.log("Note released: " + noteName);
    synth.triggerRelease(noteName);
}

function changeOscillatorType(type){
    synth.set({
        "oscillator":{
            "type": type
        }
    });
    //console.log("oscillator changed to: " + type)
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


/*        :::::::::::            GAME LOGIC            :::::::::::        */

$(document).ready(function(){
    $('#instruction-modal').modal('show');
});


function iterateGame(){

    setTimeout(function(){
        if(lives == 0){
            $('#game-over-modal').modal('show');
        }
    
        if(newNotesRequired){
            pattern.resetNoteStatus();
            pattern.redrawRequired = true;
            gameChordDisplayed = gameChords[Math.floor(Math.random() * gameChords.length)];
            pattern.turnOnGameNote(gameChordDisplayed);
            notedisplayed1 = pattern.getArrayElement(gameChordDisplayed[0]).id;
            notedisplayed2 = pattern.getArrayElement(gameChordDisplayed[1]).id;
            notedisplayed3 = pattern.getArrayElement(gameChordDisplayed[2]).id;
            newNotesRequired = false;
        }
    
        document.getElementById('score-value').innerHTML = "Score: " + totalScore;
    
        //console.log("Notes: " + notedisplayed1 + " " + notedisplayed2 + " " + notedisplayed3);
    
        if(notesBeingPlayed.includes(notedisplayed1) && notesBeingPlayed.includes(notedisplayed2) && notesBeingPlayed.includes(notedisplayed3)){
            //console.log("Nota corretta!");
            notesBeingPlayed = [];
            synth.releaseAll(Tone.now() + 0.3);
            //alert("Correct chord!");
            swal({
                title: "Correct chord!",
                icon: "success",
                text: " ",
                button: false,
                timer: 1500,
            });
            if(lives<6){
                lives++;
                let currentLife = "#life" + lives;
                //console.log("Vita da aggiungere: " + currentLife);
                $(currentLife).addClass('life');
            }
            totalScore ++;
            newNotesRequired = true;
            iterateGame();
        }

        
        do{

            for (var note of notesBeingPlayed){
                //console.log("Prima della valutazione: " + notesBeingPlayed);
                //console.log("Nota di notesBeingPlayed: " + note);
                if(notedisplayed1 != note && notedisplayed2 != note && notedisplayed3 != note){
                    //console.log("Nota sbagliata!");
                    //console.log("Dopo la valutazione: " + notesBeingPlayed);
                    let currentLife = "#life" + lives;
                    //console.log("Vita da rimuovere: " + currentLife);
                    $(currentLife).removeClass('life');
                    synth.releaseAll(Tone.now() + 0.3);
                    //alert("Wrong note! " + note + " is not present in the chord" );
                    wrongNotes.push(note);
                    notesBeingPlayed.splice(notesBeingPlayed.indexOf(note), 1);
                    lives --;
                    //console.log("Lunghezza notesBeingPlayed: " + notesBeingPlayed.length);
                    iterationNeeded = true;
                    
                }
                else{
                    notesBeingPlayed.splice(notesBeingPlayed.indexOf(note), 1);
                }

            }
        } while(notesBeingPlayed.length != 0);
    
        
    
        if(iterationNeeded && !notesBeingPlayed.length){
            if(wrongNotes.length == 1){
                swal({
                    title: "Wrong note!",
                    text: wrongNotes[0] + " is not present in the chord!",
                    icon: "error",
                    button: false,
                    timer: 2500,
                });
            } else{
                swal({
                    title: "Wrong notes!",
                    text: wrongNotes.toString() + " are not present in the chord!",
                    icon: "error",
                    button: false,
                    timer: 2500,
                });
            }
            
            wrongNotes.splice(0);
            newNotesRequired = true;
            iterationNeeded = false;
            iterateGame();
        }
    
        
    
    
        
    }, 150);

    
}

function returnToMainMenu(){
    window.location.href = "index.html";
}
