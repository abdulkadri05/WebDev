var candies =["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = []; 
var rows = 9;
var columns = 9;
var score = 0;
var moves = 0;
var currentTile;
var otherTile;
let matchSound = new Audio("../candyCrushGame/sounds/gameSound.mp3");

window.onload = function() {
    startGame();
    matchSound.play();
    window.setInterval(function() {
        crushCandy(); // check for candies to crush every second
        slideCandy(); // slide candies down every second'
        generateCandy(); // generate new candies every second
    }, 100);

};

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame(){
    
    for(let r = 0; r < rows; r++){
        let row = [];
        for(let c = 0; c < columns; c++){
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            // Drag and drop functionality
            tile.addEventListener("dragstart", dragStart); // click on a candy to start dragging
            tile.addEventListener("dragover", dragOver); // allow the tile to be a drop target
            tile.addEventListener("dragenter", dragEnter); // when a tile is dragged over another tile
            tile.addEventListener("dragleave", dragLeave); // when a tile is dragged away from another tile
            tile.addEventListener("drop", dragDrop); // when a tile is dropped onto another tile
            tile.addEventListener("dragend", dragEnd); // when the dragging ends, we swap candies


            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
} 


function dragStart(){
    currentTile = this; // the tile that is being dragged
}

function dragOver(e){
    e.preventDefault(); // prevent default to allow drop
}

function dragEnter(e){
    e.preventDefault(); // prevent default to allow drop
}

function dragLeave(){
    // This function can be used to add visual effects when a tile is dragged away
}

function dragDrop(){
    otherTile = this; // the tile that is being dropped onto
}

function dragEnd(){

    if(currentTile.src.includes("blank") || otherTile.src.includes("blank")){
        return; // if either tile is blank, do nothing
    } 

    let currCoords = currentTile.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]); // row index
    let c = parseInt(currCoords[1]); // column index
    let otherCoords = otherTile.id.split("-"); // id="0-1" -> ["0", "1"]
    let r2 = parseInt(otherCoords[0]); // row index of the other tile
    let c2 = parseInt(otherCoords[1]); // column index of the other tile
    // Check if the tiles are adjacent
    let moveLeft = c2 == c - 1 && r2 == r; // left
    let moveRight = c2 == c + 1 && r2 == r; // right

    let moveUp = c2 == c && r2 == r - 1; // up
    let moveDown = c2 == c && r2 == r + 1; // down


    let isAdjacent = moveLeft || moveRight || moveUp || moveDown; // check if the tiles are adjacent

    if(isAdjacent){
        let currImg = currentTile.src; // the image of the current tile
        let otherImg = otherTile.src; // the image of the other tile
        currentTile.src = otherImg; // swap the images
        otherTile.src = currImg; // swap the images back

        let validMove = checkValid(); // check if the move is valid
        if(!validMove){
        let currImg = currentTile.src; // the image of the current tile
        let otherImg = otherTile.src; // the image of the other tile
        currentTile.src = otherImg; // swap the images
        otherTile.src = currImg; // swap the images back
        } else {
            // If the move is valid, crush candies
            crushCandy();
            moves++;
            document.getElementById("moves-value").innerText = moves;

        }
    }
    

}


function crushCandy(){
    //crushFive();
    //crushThree();
    crushThree();

}

function crushThree(){
    for(let r = 0; r<rows; r++){
        for(let c = 0; c<columns-2; c++){
            let candy1 = board[r][c]; // first candy in the row
            let candy2 = board[r][c+1]; // second candy in the row
            let candy3 = board[r][c+2]; // third candy in the row
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "../candyCrushGame/images/blank.png"; // crush the first candy
                candy2.src = "../candyCrushGame/images/blank.png"; // crush the second candy
                candy3.src = "../candyCrushGame/images/blank.png"; // crush the third candy
                score += 3; // increase the score
                document.getElementById("score-value").innerText = score;
 // update the score display
            
            }
        }
    }

    //check columns
    for(let c = 0; c<columns; c++){
        for(let r = 0; r<rows-2; r++){
            let candy1 = board[r][c]; // first candy in the column
            let candy2 = board[r+1][c]; // second candy in the column
            let candy3 = board[r+2][c]; // third candy in the column
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "../candyCrushGame/images/blank.png"; // crush the first candy
                candy2.src = "../candyCrushGame/images/blank.png"; // crush the second candy
                candy3.src = "../candyCrushGame/images/blank.png"; // crush the third candy
                score += 3; // increase the score
                document.getElementById("score-value").innerText = score;
 // update the score display
            
            }
        }
    }
}

function checkValid(){
for(let r = 0; r<rows; r++){
    for(let c = 0; c<columns-2; c++){
        let candy1 = board[r][c]; // first candy in the row
        let candy2 = board[r][c+1]; // second candy in the row
        let candy3 = board[r][c+2]; // third candy in the row
        if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
            return true; // valid move found
        
        }
    }
}

//check columns
for(let c = 0; c<columns; c++){
    for(let r = 0; r<rows-2; r++){
        let candy1 = board[r][c]; // first candy in the column
        let candy2 = board[r+1][c]; // second candy in the column
        let candy3 = board[r+2][c]; // third candy in the column
        if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
            return true; // valid move found
        }
    }
    }
    return false; // no valid move found
}

function slideCandy(){
    for(let c = 0; c < columns; c++){
        for(let r = rows - 1; r >= 0; r--){
            if(board[r][c].src.includes("blank")){
                for(let r2 = r - 1; r2 >= 0; r2--){
                    if(!board[r2][c].src.includes("blank")){
                        board[r][c].src = board[r2][c].src; // slide the candy down
                        board[r2][c].src = "../candyCrushGame/images/blank.png"; // make the old position blank
                        break;
                    }
                }
            }
        }
    }
}


function generateCandy(){
    for(let c =0; c<columns; c++){
        if(board[0][c].src.includes("blank")){ // if the top row has a blank tile
            board[0][c].src = "./images/" + randomCandy() + ".png"; // set the new candy image
        }
    }
}