function setup (){
    createCanvas (windowWidth, windowHeight);
    graphicBuffer = createGraphics(windowWidth, windowHeight);
    frameRate(5);
    pattern = new basicPattern(0,0);   
}

function draw(){
    background(000);
/*        :::::::::::            GRID GENERATOR            :::::::::::        */ 
    let shift = 0;

    for (row = 0; row <= floor(windowHeight/pattern.getArrayElement(15).yvalue()); row++){
        shift = row*1.5*pattern.getArrayElement(1).xvalue()
        for(repx = 0; repx <= floor(windowWidth/(3*pattern.getArrayElement(4).xvalue())); repx++){

                push()
                translate(pattern.getArrayElement(0).xvalue() + repx*3*pattern.getArrayElement(4).xvalue() + shift, pattern.getArrayElement(0).yvalue() + row*pattern.getArrayElement(15).yvalue())
                pattern.drawPattern()
                pop()
                push()
                translate(pattern.getArrayElement(14).xvalue() + repx*3*pattern.getArrayElement(4).xvalue() + shift, pattern.getArrayElement(14).yvalue() + row*pattern.getArrayElement(15).yvalue())
                pattern.drawPattern()
                pop()
                push()
                translate(pattern.getArrayElement(9).xvalue() + pattern.getArrayElement(4).xvalue() + repx*3*pattern.getArrayElement(4).xvalue() + shift, pattern.getArrayElement(9).yvalue() + row*pattern.getArrayElement(15).yvalue())
                pattern.drawPattern()
                pop()
        }
    }
}


/*        :::::::::::            KEY PRESS            :::::::::::        */

/*function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        pattern.getArrayElement(0).isActive = 1;
    } else if (keyCode === RIGHT_ARROW) {
        pattern.getArrayElement(0).isActive = 0;
    }
}
*/

/*
k = KeyboardEvent; // how can i get a keyboard event without using the HTML interaction??
function keyPressed(k){
    if(k.code == KeyA){
        pattern.getArrayElement(2).isActive = !pattern.getArrayElement(2).isActive
    }
}
*/

/*
document.addEventListener('keydown', function(event){
    if(event.key.toUpperCase() == "A"){
        pattern.getArrayElement(2).isActive = true;
        //alert(event.key);
    } else if(event.key.toUpperCase() == "B")
        pattern.getArrayElement(2).isActive = false
    });
*/


// NOTES on key events
// KeyboardEvent.repeat (Boolean that is true if the key is being held down such that it is automatically repeating.)
// https://keycode.info/
// event.keydown (it returns a key code), same for keyup



//CHORD TEST FOR BRILLIS

document.addEventListener('keydown', function(event){
    if(event.key.toUpperCase() == "A"){
        pattern.getArrayElement(0).isActive = !pattern.getArrayElement(0).isActive
    }
    if(event.repeat){
        pattern.getArrayElement(0).isActive = !pattern.getArrayElement(0).isActive
    }
} );

document.addEventListener('keydown', function(event){
    if(event.key.toUpperCase() == "S"){
        pattern.getArrayElement(1).isActive = !pattern.getArrayElement(1).isActive
    }
    if(event.repeat){
        pattern.getArrayElement(1).isActive = !pattern.getArrayElement(1).isActive
    }
} );

document.addEventListener('keydown', function(event){
    if(event.key.toUpperCase() == "D"){
        pattern.getArrayElement(5).isActive = !pattern.getArrayElement(5).isActive
    }
    if(event.repeat){
        pattern.getArrayElement(5).isActive = !pattern.getArrayElement(5).isActive
    }
} );



//switch ()