var colorBackground = "#000000";
var colorNoteActive = "#00c820";
var colorNote = "#696969";
var colorIntervalActive = "#00701e";
var colorInterval = "#7c807c";
var colorChordActive = "#3b8c37";
var colorChord = "#000000";
var colorRoot = "#ff0000";
var colorScale = "#3e3e3e";
var colorText = "#e6e6e6";
var colorVoicing = "#ff00f9";

var colorScaleChord = "#252525";

var colorGame = "#e6e600";
var colorIntervalGame = "#b3b300";
var colorChordGame = "#ffff80";

const nonEnharmonicExchangedScale = ["C", "G", "D", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "F", "C", "C", "G", "D", "A", "E"];

let scaleMap = new Map();
scaleMap.set("C", nonEnharmonicExchangedScale);
scaleMap.set("Cshrp", ["B#", "G", "D", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "B#", "B#", "G", "D", "A", "E"]);
scaleMap.set("Db" , ["C", "G", "D", "A", "E", "E", "B", "Gb", "Db", "Ab", "Ab", "Eb", "Bb", "F", "C", "C", "G", "D", "A", "E"]);
scaleMap.set("D", nonEnharmonicExchangedScale);
scaleMap.set("Dshrp", ["B#", "F##", "C##", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "B#", "B#", "F##", "C##", "A", "E"]);
scaleMap.set("Eb" , ["C", "G", "D", "A", "E", "E", "B", "Gb", "Db", "Ab", "Ab", "Eb", "Bb", "F", "C", "C", "G", "D", "A", "E"]);
scaleMap.set("E", nonEnharmonicExchangedScale);
scaleMap.set("Eshrp", ["B#", "F##", "C##", "G##", "D##", "D##", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "B#", "B#", "F##", "C##", "G##", "D##"]);
scaleMap.set("F", ["C", "G", "D", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "Bb", "F", "C", "C", "G", "D", "A", "E"]);
scaleMap.set("Fshrp", ["C", "G", "D", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "C", "C", "G", "D", "A", "E"]);
scaleMap.set("Gb" , ["C", "G", "D", "A", "E", "E", "Cb", "Gb", "Db", "Ab", "Ab", "Eb", "Bb", "F", "C", "C", "G", "D", "A", "E"]);
scaleMap.set("G", nonEnharmonicExchangedScale);
scaleMap.set("Gshrp", ["B#", "F##", "D", "A", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "B#", "B#", "F##", "D", "A", "E"]);
scaleMap.set("Ab" , ["C", "G", "D", "A", "E", "E", "B", "Gb", "Db", "Ab", "Ab", "Eb", "Bb", "F", "C", "C", "G", "D", "A", "E"]);
scaleMap.set("A", nonEnharmonicExchangedScale);
scaleMap.set("Ashrp", ["B#", "F##", "C##", "G##", "E", "E", "B", "F#", "C#", "G#", "G#", "D#", "A#", "E#", "B#", "B#", "F##", "C##", "G##", "E"]);
scaleMap.set("Bb" , ["C", "G", "D", "A", "E", "E", "B", "Gb", "Db", "Ab", "Ab", "Eb", "Bb", "F", "C", "C", "G", "D", "A", "E"]);
scaleMap.set("B", nonEnharmonicExchangedScale);

let scaleNotes = new Map();
scaleNotes.set("C", ["C", "D", "E", "F", "G", "A", "B"] );
scaleNotes.set("Cshrp", ["C#", "D#", "E#", "F#", "G#", "A#", "B#"]);
scaleNotes.set("Db", ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"] );
scaleNotes.set("D", ["D", "E", "F#", "G", "A", "B", "C#"]);
scaleNotes.set("Dshrp", ["D#", "E#", "F##", "G#", "A#", "B#", "C##"]);
scaleNotes.set("Eb", ["Eb", "F", "G", "Ab", "Bb", "C", "D"]);
scaleNotes.set("E", ["E", "F#", "G#", "A", "B", "C#", "D#"]);
scaleNotes.set("Eshrp", ["E#", "F##", "G##", "A#", "B#", "C##", "D##"]);
scaleNotes.set("F", ["F", "G", "A", "Bb", "C", "D", "E"]);
scaleNotes.set("Fshrp", ["F#", "G#", "A#", "B", "C#", "D#", "E#"]);
scaleNotes.set("Gb", ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"]);
scaleNotes.set("G", ["G", "A", "B", "C", "D", "E", "F#"]);
scaleNotes.set("Gshrp", ["G#", "A#", "B#", "C#", "D#", "E#", "F##"]);
scaleNotes.set("Ab", ["Ab", "Bb", "C", "Db", "Eb", "F", "G"]);
scaleNotes.set("A", ["A", "B", "C#", "D", "E", "F#", "G#"]);
scaleNotes.set("Ashrp", ["A#", "B#", "C##", "D#", "E#", "F##", "G##"]);
scaleNotes.set("Bb", ["Bb", "C", "D", "Eb", "F", "G", "A"]);
scaleNotes.set("B", ["B", "C#", "D#", "E", "F#", "G#", "A#"]);
