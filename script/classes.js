/*        :::::::::::            BASIC PATTERN CLASS            :::::::::::        */
class basicPattern {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.redrawRequired = true;
    this.offScr = createGraphics(1200, 619);
    this.ghostQueue = [];

    /*        :::::::::::            NOTESs ARRAY            :::::::::::        */
    this.notesList = [];
    this.notesList.push(new Note("C",0,0));          //0
    this.notesList.push(new Note("G",200,0));        //1
    this.notesList.push(new Note("D",400,0));        //2
    this.notesList.push(new Note("A",600,0));        //3
    this.notesList.push(new Note("E",800,0));        //4
    this.notesList.push(new Note("E",100,173));      //5
    this.notesList.push(new Note("B",300,173));      //6
    this.notesList.push(new Note("F#",500,173));     //7
    this.notesList.push(new Note("C#",700,173));     //8
    this.notesList.push(new Note("G#",900,173));     //9
    this.notesList.push(new Note("G#",200,346));     //10
    this.notesList.push(new Note("D#",400,346));     //11
    this.notesList.push(new Note("A#",600,346));     //12
    this.notesList.push(new Note("F",800,346));      //13
    this.notesList.push(new Note("C",1000,346));     //14
    this.notesList.push(new Note("C",300,519));      //15
    this.notesList.push(new Note("G",500,519));      //16
    this.notesList.push(new Note("D",700,519));      //17
    this.notesList.push(new Note("A",900,519));      //18
    this.notesList.push(new Note("E",1100,519));     //19

    /*        :::::::::::            INTERVALs ARRAY            :::::::::::        */
    this.intervalsList = [];
    this.intervalsList.push(new Interval(this.notesList[0],this.notesList[1]));  //1st ROW
    this.intervalsList.push(new Interval(this.notesList[1],this.notesList[2]));
    this.intervalsList.push(new Interval(this.notesList[2],this.notesList[3]));
    this.intervalsList.push(new Interval(this.notesList[3],this.notesList[4]));

    this.intervalsList.push(new Interval(this.notesList[5],this.notesList[6]));  //2nd
    this.intervalsList.push(new Interval(this.notesList[6],this.notesList[7]));
    this.intervalsList.push(new Interval(this.notesList[7],this.notesList[8]));
    this.intervalsList.push(new Interval(this.notesList[8],this.notesList[9]));

    this.intervalsList.push(new Interval(this.notesList[10],this.notesList[11]));  //3rd
    this.intervalsList.push(new Interval(this.notesList[11],this.notesList[12]));
    this.intervalsList.push(new Interval(this.notesList[12],this.notesList[13]));
    this.intervalsList.push(new Interval(this.notesList[13],this.notesList[14]));

    this.intervalsList.push(new Interval(this.notesList[15],this.notesList[16]));  //4th
    this.intervalsList.push(new Interval(this.notesList[16],this.notesList[17]));
    this.intervalsList.push(new Interval(this.notesList[17],this.notesList[18]));
    this.intervalsList.push(new Interval(this.notesList[18],this.notesList[19]));

    this.intervalsList.push(new Interval(this.notesList[0],this.notesList[5]));    //1st DIAG dx
    this.intervalsList.push(new Interval(this.notesList[5],this.notesList[10]));
    this.intervalsList.push(new Interval(this.notesList[10],this.notesList[15]));

    this.intervalsList.push(new Interval(this.notesList[1],this.notesList[6]));    //2nd
    this.intervalsList.push(new Interval(this.notesList[6],this.notesList[11]));
    this.intervalsList.push(new Interval(this.notesList[11],this.notesList[16]));

    this.intervalsList.push(new Interval(this.notesList[2],this.notesList[7]));    //3rd
    this.intervalsList.push(new Interval(this.notesList[7],this.notesList[12]));
    this.intervalsList.push(new Interval(this.notesList[12],this.notesList[17]));

    this.intervalsList.push(new Interval(this.notesList[3],this.notesList[8]));    //4th
    this.intervalsList.push(new Interval(this.notesList[8],this.notesList[13]));
    this.intervalsList.push(new Interval(this.notesList[13],this.notesList[18]));

    this.intervalsList.push(new Interval(this.notesList[4],this.notesList[9]));    //5th
    this.intervalsList.push(new Interval(this.notesList[9],this.notesList[14]));
    this.intervalsList.push(new Interval(this.notesList[14],this.notesList[19]));

    this.intervalsList.push(new Interval(this.notesList[1],this.notesList[5]));    //1st DIAG sx

    this.intervalsList.push(new Interval(this.notesList[2],this.notesList[6]));    //2nd
    this.intervalsList.push(new Interval(this.notesList[6],this.notesList[10]));

    this.intervalsList.push(new Interval(this.notesList[3],this.notesList[7]));    //3rd
    this.intervalsList.push(new Interval(this.notesList[7],this.notesList[11]));
    this.intervalsList.push(new Interval(this.notesList[11],this.notesList[15]));

    this.intervalsList.push(new Interval(this.notesList[4],this.notesList[8]));    //4th
    this.intervalsList.push(new Interval(this.notesList[8],this.notesList[12]));
    this.intervalsList.push(new Interval(this.notesList[12],this.notesList[16]));

    this.intervalsList.push(new Interval(this.notesList[9],this.notesList[13]));   //5th
    this.intervalsList.push(new Interval(this.notesList[13],this.notesList[17]));

    this.intervalsList.push(new Interval(this.notesList[14],this.notesList[18]));  //6th

    /*        :::::::::::            CHORDs ARRAY            :::::::::::        */
    this.chordsList = [];
    this.chordsList.push(new Chord(this.notesList[0],this.notesList[1],this.notesList[5]));     //1st ROW DOWN
    this.chordsList.push(new Chord(this.notesList[1],this.notesList[2],this.notesList[6]));
    this.chordsList.push(new Chord(this.notesList[2],this.notesList[3],this.notesList[7]));
    this.chordsList.push(new Chord(this.notesList[3],this.notesList[4],this.notesList[8]));

    this.chordsList.push(new Chord(this.notesList[5],this.notesList[6],this.notesList[10]));    //2nd
    this.chordsList.push(new Chord(this.notesList[6],this.notesList[7],this.notesList[11]));
    this.chordsList.push(new Chord(this.notesList[7],this.notesList[8],this.notesList[12]));
    this.chordsList.push(new Chord(this.notesList[8],this.notesList[9],this.notesList[13]));

    this.chordsList.push(new Chord(this.notesList[10],this.notesList[11],this.notesList[15]));  //3rd
    this.chordsList.push(new Chord(this.notesList[11],this.notesList[12],this.notesList[16]));
    this.chordsList.push(new Chord(this.notesList[12],this.notesList[13],this.notesList[17]));
    this.chordsList.push(new Chord(this.notesList[13],this.notesList[14],this.notesList[18]));

    this.chordsList.push(new Chord(this.notesList[5],this.notesList[6],this.notesList[1]));     //1st ROW UP
    this.chordsList.push(new Chord(this.notesList[6],this.notesList[7],this.notesList[2]));
    this.chordsList.push(new Chord(this.notesList[7],this.notesList[8],this.notesList[3]));
    this.chordsList.push(new Chord(this.notesList[8],this.notesList[9],this.notesList[4]));

    this.chordsList.push(new Chord(this.notesList[10],this.notesList[11],this.notesList[6]));   //2nd
    this.chordsList.push(new Chord(this.notesList[11],this.notesList[12],this.notesList[7]));
    this.chordsList.push(new Chord(this.notesList[12],this.notesList[13],this.notesList[8]));
    this.chordsList.push(new Chord(this.notesList[13],this.notesList[14],this.notesList[9]));

    this.chordsList.push(new Chord(this.notesList[15],this.notesList[16],this.notesList[11]));  //3rd
    this.chordsList.push(new Chord(this.notesList[16],this.notesList[17],this.notesList[12]));
    this.chordsList.push(new Chord(this.notesList[17],this.notesList[18],this.notesList[13]));
    this.chordsList.push(new Chord(this.notesList[18],this.notesList[19],this.notesList[14]));
  }

  drawPattern(canvas) {
    for (let i = 0; i < this.chordsList.length; i++){
      this.chordsList[i].draw(canvas);
    }
    for (let  i = 0; i < this.intervalsList.length; i++){
      this.intervalsList[i].draw(canvas);
    }
    for (let i = 0; i < this.notesList.length; i++){
      this.notesList[i].draw(canvas);
    }
  }

  getArrayElement(i) {
    return this.notesList[i];
  }

  getGhostElement(i) {
    return this.ghostQueue[i];
  }

  getIntervalArrayElement(i) {
    return this.intervalsList[i];
  }

  turnOnVoiceNote(noteName){
    let note;
    for (note of this.notesList){
      if (note.id == noteName) note.isVoice = true;
    }
  }

  turnOffVoiceNote(noteName){
    let note;
    for (note of this.notesList){
      if (note.id == noteName) note.isVoice = false;
    }
  }

  turnOnNote(notePosition){
    let position;
    for (position of notePosition){
      this.notesList[position].isActive = true;
    }
  }

  turnOffNote(notePosition){
    let position;
    for (position of notePosition){
      this.notesList[position].isActive = false;
    }
  }

  turnOnRootNote(noteName){
    let correctedNote = noteName.replace("shrp","#");
    let note;
    for (note of this.notesList){
      if (note.id == correctedNote) note.isRoot = true;
    }
  }

  turnOnScaleNotes(array){
    let scaleNote, gridNote;
    for (scaleNote of array){
      for(gridNote of pattern.notesList){
        if (gridNote.id == scaleNote) gridNote.isScale = true;
      }
    }
  }

  resetNoteStatus(){
    let note;
    for (note of this.notesList){
      note.isRoot = false;
      note.isScale = false;
      note.isGame = false;
    }
  }

  turnOnGameNote(notePosition){
    let position;
    for (position of notePosition){
      this.notesList[position].isGame = true;
    }
  }

  turnOffGameNote(notePosition){
    let position;
    for (position of notePosition){
      this.notesList[position].isGame = false;
    }
  }

  changeNoteId(array){
    for(var i=0; i<array.length; i++){
      var noteId = array[i];
      this.notesList[i].setNoteId = noteId;
    }
  }

}


/*        :::::::::::            NOTE CLASS            :::::::::::        */
class Note {
  constructor(id,x,y){
    this.id = id;
    this.x = x;
    this.y = y;
    this.isActive = false;
    this.isVoice = false;
    this.isRoot = false;
    this.isScale = false;
    this.isGhost = false;
    this.isGame = false;
  }

  draw(canvas) {
    if (this.isActive === true){
      canvas.fill(colorNoteActive);
    } else if (this.isScale === true) {
      canvas.fill(colorScale);
    } else {
      canvas.fill(colorBackground);
    }

    canvas.noStroke();
    canvas.circle(this.x, this.y, 70);

    if (this.isVoice == true){
      canvas.strokeWeight(2);
      canvas.stroke(colorVoicing);
      canvas.noFill();
      canvas.circle(this.x, this.y, 70);
    }

    if (this.isRoot === true) {
      canvas.strokeWeight(2);
      canvas.stroke(colorRoot);
      canvas.noFill();
      canvas.circle(this.x, this.y, 65);
    }

    if (this.isGame === true) {
      canvas.strokeWeight(2);
      canvas.stroke(colorGame);
      canvas.noFill();
      canvas.circle(this.x, this.y, 70);
    }

    canvas.textAlign(CENTER, CENTER);
    canvas.textSize(30);
    canvas.fill(colorText);
    canvas.text(this.id, this.x, this.y);
  }

  xvalue() {
    return this.x;
  }

  yvalue() {
    return this.y;
  }

  set setNoteId(id){
    this.id = id;
  }
}


/*        :::::::::::            INTERVAL CLASS           :::::::::::        */
class Interval {
  constructor(note1 ,note2){
    this.note1 = note1;
    this.note2 = note2;
    this.isActive = false;
    this.isGhost = false;
  }

  draw(canvas) {
    if (this.note1.isActive === true && this.note2.isActive === true){
      canvas.strokeWeight(10);
      canvas.stroke(colorIntervalActive);
    } else if (this.note1.isGame === true && this.note2.isGame === true){
      canvas.strokeWeight(10);
      canvas.stroke(colorIntervalGame);
    } else {
      canvas.strokeWeight(2);
      canvas.stroke(colorInterval);
    }
    canvas.line(this.note1.x, this.note1.y, this.note2.x, this.note2.y);
  }
}


/*        :::::::::::            CHORD CLASS            :::::::::::        */
class Chord {
  constructor(note1, note2, note3){
    this.note1 = note1;
    this.note2 = note2;
    this.note3 = note3;
    this.isActive = false;
    this.isGhost = false;
  }

  draw(canvas){
    if (this.note1.isActive === true && this.note2.isActive === true && this.note3.isActive === true){
      canvas.fill(colorChordActive);
    } else if(this.note1.isGame === true && this.note2.isGame === true && this.note3.isGame === true){
      canvas.fill(colorChordGame);
    } else {
      canvas.fill(colorChord);
    }
    canvas.noStroke();
    canvas.triangle(this.note1.x, this.note1.y, this.note2.x, this.note2.y, this.note3.x, this.note3.y);
  }
}
