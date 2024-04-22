import { useRef, useEffect } from 'react';
import { blank_tile, example_tile1, example_tile2, example_tile3, example_tile4, example_tile5, example_tile6, example_tile7 } from "./Tiles";


//temporary tile substitutes
let blank = blank_tile;
let example1 = example_tile1;
let example2 = example_tile2;
let example3 = example_tile3;
let example4 = example_tile4;
let example5 = example_tile5;
let example6 = example_tile6;
let example7 = example_tile7;

//Initialise global variables
let zoom = 5;
let gridColour = "#111";
let foregroundColour = "#FFF";
let boxColour = "#F00"
let backgroundColour = "#000";
let highlightColour = "rgba(255, 0, 0, 0.5)"
let zoomFactor = zoom * 8;
let selectedTile = example1;
let tileRam = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
];




export function TileSelect(props) {
  const canvasRef = useRef(null);

  useEffect(() => {

    let tileList = [blank, example1, example2, example3, example4, example5, example6, example7, ];

    let currentTiles = [
      
    ];
    let previousTiles= [];
    let currentCursor =   { x: 0, y: 0 }
    let previousCursor =  { x: 0, y: 0 }
    let selectedTile =    { x: 0, y: 0 }
    let currentTile =     { x: 0, y: 0 }
    let previousTile =    { x: 2, y: 2 }
    let tempTile =        { x: 1, y: 1 }
    

    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

// vLoads the needed tiles onto the currentTiles array
    function tileLoader() {
      let maxTilesX = Math.floor(canvas.width/zoomFactor);
      let maxTilesY = Math.floor(canvas.height/zoomFactor);
      let xCounter = 0;
      let yCounter = 0;
      tileList.forEach((element) => {
        
        if (xCounter == maxTilesX - 1){
          currentTiles.push({tile: element, x: xCounter, y: yCounter});
          yCounter++;
          xCounter = 0;
          
        } else {
          currentTiles.push({tile: element, x: xCounter, y: yCounter});
          xCounter++;
          
        }

      }
        
      )
    }
    tileLoader()

//Draw the grid overlay
    function drawGrid() {
        for (let x = 0; x < canvas.height; x += (zoomFactor)){
            context.beginPath();
            context.moveTo(x,0);
            context.lineTo(x,canvas.height);
            context.strokeStyle = gridColour;
            context.stroke();
        }
        for (let y = 0; y < canvas.width; y += (zoomFactor)){
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
    function drawStoredTiles() {
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

    //Read tile data
    

    function readTile(locationX, locationY) {
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++){
          const pixel = context.getImageData(locationX*zoomFactor + x*zoom, locationY*zoomFactor + y*zoom, 1, 1);
          
          if (pixel.data[0] == 255){
            tileRam[y][x] = 1;
          } else {
            tileRam[y][x] = 0;
          }
          

        }
        
      }
      
    };

    //Blanks and rerenders the canvas
    function updateCanvas(event) {
      getMousePos(canvas, event)
      previousTile = currentTile;
      currentTile = tempTile;     
  }
   

//Update the currently selected tile
    function handleClick() {
      selectedTile = currentTile;
      
      
            
      blankScreen()  
      drawStoredTiles()
      readTile(selectedTile.x, selectedTile.y)
      console.log(tileRam)
      drawGrid(); 
      context.beginPath();
      context.strokeStyle = boxColour;
      
      context.rect(selectedTile.x* zoomFactor, selectedTile.y*zoomFactor, zoomFactor, zoomFactor)
      context.stroke(); 
      let tempRam = [];
      tempRam.push(
        tileRam[0], 
        tileRam[1], 
        tileRam[2], 
        tileRam[3], 
        tileRam[4], 
        tileRam[5], 
        tileRam[6], 
        tileRam[7]);
      props.setSelectedTile(tempRam);
      console.log("RAM", tempRam)
     
    }
    
    canvas.addEventListener("mousemove", updateCanvas, false);
    canvas.addEventListener("click", handleClick, false);
    
    blankScreen()  
    drawStoredTiles()
    drawGrid();

   
    
  }, []);

  return <canvas ref={canvasRef} width='300' height='300'/>
}
