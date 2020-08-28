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

const nonEnharmonicExchangedScale = ["C", "G", "D", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "F", "C", "C", "G", "D", "A", "E"];

let scaleMap = new Map();
scaleMap.set("C", nonEnharmonicExchangedScale);
scaleMap.set("Cshrp", ["B#", "G", "D", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "B#", "B#", "G", "D", "A", "E"]);
scaleMap.set("D", nonEnharmonicExchangedScale);
scaleMap.set("Dshrp", ["B#", "F##", "C##", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "B#", "B#", "F##", "C##", "A", "E"]);
scaleMap.set("E", nonEnharmonicExchangedScale);
scaleMap.set("F", ["C", "G", "D", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "Bb", "F", "C", "C", "G", "D", "A", "E"]);
scaleMap.set("Fshrp", ["C", "G", "D", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "C", "C", "G", "D", "A", "E"]);
scaleMap.set("G", nonEnharmonicExchangedScale);
scaleMap.set("Gshrp", ["B#", "F##", "D", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "B#", "B#", "F##", "D", "A", "E"]);
scaleMap.set("A", nonEnharmonicExchangedScale);
scaleMap.set("Ashrp", ["B#", "F##", "C##", "G##", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "B#", "B#", "F##", "C##", "G##", "E"]);
scaleMap.set("B", nonEnharmonicExchangedScale);
var notesNames = []; //[TO FIX], i give this array to the changeNoteId method of the basicPattern, in order to change the id's of the circle grid
