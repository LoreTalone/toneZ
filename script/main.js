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


//CHORD(triangle) TEST , NOT WORKING PROPERLY, see boudaries amd ceche the pressed key. It does not match properly the grid (GHB)
document.addEventListener('keydown', function(event){
    //we trigger the redrawAll function through the redrawRequired boolean
    pattern.redrawRequired = true;
    // 1st KEYBOARD ROW [ 1 2 3 4 5 ]
    key = event.key.toUpperCase();
    if(key == "1" || key == "6" || key == "Z" || key == "N"){
        pattern.getArrayElement(0).isActive = true;
        pattern.getArrayElement(14).isActive = true;
        pattern.getArrayElement(15).isActive = true;
    } else if(key == "2" || key == "7" || key == "X" || key == "M"){
        pattern.getArrayElement(1).isActive = true;
        pattern.getArrayElement(16).isActive = true;
    } else if(key == "3" || key == "8" || key == "C"){
        pattern.getArrayElement(2).isActive = true;
        pattern.getArrayElement(17).isActive = true;
    } else if(key == "4" || key == "9" || key == "V"){
        pattern.getArrayElement(3).isActive = true;
        pattern.getArrayElement(18).isActive = true;
    } else if(key == "5" || key == "0" || key == "B"){
        pattern.getArrayElement(4).isActive = true;
        pattern.getArrayElement(5).isActive = true;
        pattern.getArrayElement(19).isActive = true;
    } else

    // 2nd KEYBOARD ROW [ Q W E R T ]
    if(key == "Q" || key == "Y"){
        pattern.getArrayElement(4).isActive = true;
        pattern.getArrayElement(5).isActive = true;
        pattern.getArrayElement(19).isActive = true;
    } else if(key == "W" || key == "U"){
        pattern.getArrayElement(6).isActive = true;
    } else if(key == "E" || key == "I"){
        pattern.getArrayElement(7).isActive = true;
    } else if(key == "R" || key == "O"){
        pattern.getArrayElement(8).isActive = true;
    } else if(key == "T" || key == "P"){
        pattern.getArrayElement(9).isActive = true;
        pattern.getArrayElement(10).isActive = true;
    } else

    // 3rd KEYBOARD ROW [ A S D F G ]
    if(key == "A" || key == "H"){
        pattern.getArrayElement(9).isActive = true;
        pattern.getArrayElement(10).isActive = true;
    } else if(key == "S" || key == "J"){
        pattern.getArrayElement(11).isActive = true;
    } else if(key == "D" || key == "K"){
        pattern.getArrayElement(12).isActive = true;
    } else if(key == "F" || key == "L"){
        pattern.getArrayElement(13).isActive = true;
    } else if(key == "G"){
        pattern.getArrayElement(0).isActive = true;
        pattern.getArrayElement(14).isActive = true;
        pattern.getArrayElement(15).isActive = true;
    }
} );


document.addEventListener('keyup', function(event){
    //we trigger the redrawAll function through the redrawRequired boolean
    pattern.redrawRequired = true;
    // 1st KEYBOARD ROW [ 1 2 3 4 5 ]
    key = event.key.toUpperCase();
    if(key == "1" || key == "6" || key == "Z" || key == "N"){
        pattern.getArrayElement(0).isActive = false;
        pattern.getArrayElement(14).isActive = false;
        pattern.getArrayElement(15).isActive = false;
    } else if(key == "2" || key == "7" || key == "X" || key == "M"){
        pattern.getArrayElement(1).isActive = false;
        pattern.getArrayElement(16).isActive = false;
    } else if(key == "3" || key == "8" || key == "C"){
        pattern.getArrayElement(2).isActive = false;
        pattern.getArrayElement(17).isActive = false;
    } else if(key == "4" || key == "9" || key == "V"){
        pattern.getArrayElement(3).isActive = false;
        pattern.getArrayElement(18).isActive = false;
    } else if(key == "5" || key == "0" || key == "B"){
        pattern.getArrayElement(4).isActive = false;
        pattern.getArrayElement(5).isActive = false;
        pattern.getArrayElement(19).isActive = false;
    } else

    // 2nd KEYBOARD ROW [ Q W E R T ]
    if(key == "Q" || key == "Y"){
        pattern.getArrayElement(4).isActive = false;
        pattern.getArrayElement(5).isActive = false;
        pattern.getArrayElement(19).isActive = false;
    } else if(key == "W" || key == "U"){
        pattern.getArrayElement(6).isActive = false;
    } else if(key == "E" || key == "I"){
        pattern.getArrayElement(7).isActive = false;
    } else if(key == "R" || key == "O"){
        pattern.getArrayElement(8).isActive = false;
    } else if(key == "T" || key == "P"){
        pattern.getArrayElement(9).isActive = false;
        pattern.getArrayElement(10).isActive = false;
    } else

    // 3rd KEYBOARD ROW [ A S D F G ]
    if(key == "A" || key == "H"){
        pattern.getArrayElement(9).isActive = false;
        pattern.getArrayElement(10).isActive = false;
    } else if(key == "S" || key == "J"){
        pattern.getArrayElement(11).isActive = false;
    } else if(key == "D" || key == "K"){
        pattern.getArrayElement(12).isActive = false;
    } else if(key == "F" || key == "L"){
        pattern.getArrayElement(13).isActive = false;
    } else if(key == "G"){
        pattern.getArrayElement(0).isActive = false;
        pattern.getArrayElement(14).isActive = false;
        pattern.getArrayElement(15).isActive = false;
    }
} );
