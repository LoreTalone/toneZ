const gameChords = [[0, 1, 5], [1, 2, 6], [2, 3, 7], [3, 4, 8], [5, 6, 10], [6, 7, 11], [7, 8, 12], [8, 9, 13], [10, 11, 15], [11, 12, 16], [12, 13, 17], [13, 14, 18], [5, 6, 1], [6, 7, 2], [7, 8, 3], [8, 9, 4], [10, 11, 6], [11, 12, 7], [12, 13, 8], [13, 14, 9], [15, 16, 11], [16, 17, 12], [17, 18, 13], [18, 19, 14]];
var totalScore = 0;
var lives = 3;
var gameChordDisplayed;

function startGame(){
    pattern.resetNoteStatus();

    pattern.redrawRequired = true;

    document.getElementById('score-value').innerHTML = "Score: " + totalScore;
    gameChordDisplayed = gameChords[Math.floor(Math.random() * gameChords.length)];
    console.log(gameChordDisplayed);

    pattern.turnOnGameNote(gameChordDisplayed);
}


//while(lives > 0){
    


    /*

    //retrieve note names from gameChordDisplayed
    notedisplayed1 = pattern.getArrayElement[gameChordDisplayed[0]].id;
    notedisplayed2 = pattern.getArrayElement[gameChordDisplayed[1]].id;
    notedisplayed3 = pattern.getArrayElement[gameChordDisplayed[2]].id;
    //listen to midi messages and retrieve names of note being played

    if(notedisplayed1 != noteplayed && notedisplayed2 != noteplayed && notedisplayed3 != noteplayed){
        let currentlife = "life" + lives;
        document.getElementById(currentLife).removeClass('life');
        lives --;
    }
    else if(notedisplayed1 == noteplayed1 && notedisplayed2 == noteplayed2 && notedisplayed3 == noteplayed3){
        totalScore ++;
    }

    */
//}

//game over (modal and reload from index.html)