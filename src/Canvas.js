import { useRef, useEffect } from 'react';
import { blank_tile, example_tile } from "./Tiles";


//temporary tile substitutes
let blank = blank_tile;
let example = example_tile;

//Initialise global variables
let zoom = 5;
let gridColour = "#111";
let foregroundColour = "#FFF";
let backgroundColour = "#000";
let highlightColour = "rgba(255, 0, 0, 0.5)"
let zoomFactor = zoom * 8;
let currentTiles = [];





export function Canvas(props) {
  const canvasRef = useRef(null);
  let selectedTile = props.selectedTile;
  console.log("canvas ", selectedTile )

  useEffect(() => {

    
    let previousTiles= [];
    let currentCursor = { x: 0, y: 0}
    let previousCursor = { x: 0, y: 0}
    let currentTile = { x: 0, y: 0}
    let previousTile = { x: 2, y: 2}
    let tempTile = { x: 1, y: 1}

   
    

    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function tileCopy(b){
      let a = []
      a[0] = b[0].slice();
      a[1] = b[1].slice();
      a[2] = b[2].slice();
      a[3] = b[3].slice();
      a[4] = b[4].slice();
      a[5] = b[5].slice();
      a[6] = b[6].slice();
      a[7] = b[7].slice();

      return a

    }

//Draw the grid overlay
    function drawGrid() {
        for (let x = 0; x < canvas.height; x += (8*zoom)){
            context.beginPath();
            context.moveTo(x,0);
            context.lineTo(x,canvas.height);
            context.strokeStyle = gridColour;
            context.stroke();
        }
        for (let y = 0; y < canvas.width; y += (8*zoom)){
            context.beginPath();
            context.moveTo(0,y);
            context.lineTo(canvas.width,y);
            context.strokeStyle = gridColour;
            context.stroke();
        }
    }

    
//Draws an individual tile at XY
    function drawTile(tile, locationX, locationY) {
        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++){
            if (tile[y][x] === 1){
              context.fillStyle = foregroundColour;
              context.fillRect(locationX + (zoom * x), locationY + (zoom * y), zoom, zoom);
            }
          }
          
        }
    };

//Draws all tiles in tilemap
    function drawMappedTiles() {
      currentTiles.forEach((element) => {
        drawTile(element.tile, element.x * zoomFactor, element.y * zoomFactor);
      })
    }
    
//Clears the canvas    
    function blankScreen() {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

//Computes the current mouse co-ordinates relative to the canvas
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        //previousCursor = currentCursor;
        currentCursor.x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width
        currentCursor.y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        tempTile.x =  (currentCursor.x - (currentCursor.x % zoomFactor))/zoomFactor
        tempTile.y =  (currentCursor.y - (currentCursor.y % zoomFactor))/zoomFactor
        //console.log(currentTile, previousTile)

        
    }

   
//Highlights the cell currently hovered over
    function cellHighlight() {
      context.fillStyle = highlightColour;
      context.fillRect(currentTile.x*zoomFactor, currentTile.y*zoomFactor, zoomFactor, zoomFactor);
      
    }

//Blanks and rerenders the canvas
    function updateCanvas(event) {
        
        blankScreen()
        getMousePos(canvas, event)
        previousTile = currentTile;
        currentTile = tempTile;
        drawMappedTiles();
        console.log(currentTiles)
        cellHighlight();
        drawGrid();
        
    }
    function updateTileMap() {
      console.log("click", props.selectedTile)
      let flag = false
      currentTiles.forEach((element) => {
        if (element.x == currentTile.x && element.y == currentTile.y){
          element.tile = tileCopy(selectedTile)
          flag = true
          return;
        } 
        
        
      })
      if (flag == false){
        currentTiles.push({x: currentTile.x, y: currentTile.y, tile: tileCopy(selectedTile)})
      }
    }

//Update the current tilemap with the new tile
    function handleClick() {
     
      updateTileMap()
      blankScreen()  
      drawMappedTiles();  
      cellHighlight(); 
      drawGrid();  
    }
    
    canvas.addEventListener("mousemove", updateCanvas, false);
    canvas.addEventListener("click", handleClick, false);
    
    drawGrid();

   
    
  }, [props.selectedTile]);

  return <canvas ref={canvasRef} width='3000' height='3200'/>
}
