var colorBackground = "#000000";
var colorNoteActive = "#00c820";
var colorNote = "#696969";
var colorIntervalActive = "#00701e";
var colorInterval = "#7c807c";
var colorChordActive = "#3b8c37";
var colorChord = "#000000";

var colorGhost = "#ff0000";
var colorVoicing = "#ff00f9";

var musicalModes = ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"];

var musicalScales = {
  "C" : ["C", "D", "E", "F", "G", "A", "B"],
  "Cshrp" : ["C#", "D#", "F", "F#", "G#", "A#", "C"],
  "D" : ["D", "E", "F#", "G", "A", "B", "C#"],
  "Dshrp" : ["D#", "F", "G", "G#", "A#", "C", "D"],
  "E" : ["E", "F#", "G#", "A", "B", "C#", "D#"],
  "F" : ["F", "G", "A", "A#", "C", "D", "E"],
  "Fshrp" : ["F#", "G#", "A#", "B", "C#", "D#", "F"],
  "G" : ["G", "A", "B", "C", "D", "E", "F#"],
  "Gshrp" : ["G#", "A#", "C", "C#", "D#", "F", "G"],
  "A" : ["A", "B", "C#", "D", "E", "F#", "G#"],
  "Ashrp" : ["A#", "C", "D", "D#", "F", "G", "A"],
  "B" : ["B", "C#", "D#", "E", "F#", "G#", "A#"]
}; //[TO FIX] i have to fix the note's names for a right nomenclature, even if the notes are the same

var notesNames = []; //[TO FIX], i give this array to the changeNoteId method of the basicPattern, in order to change the id's of the circle grid
