import { useRef, useEffect } from 'react';
import { blank_tile, example_tile1, example_tile2, example_tile3, example_tile4, example_tile5, 
        example_tile6, example_tile7, example_tile8, example_tile9, example_tile10, example_tile11, } from "./Tiles";



//Initialise global variables
let zoom = 5;
let gridColour = "#111";
let foregroundColour = "#FFF";
let boxColour = "#F00"
let backgroundColour = "#000";
let highlightColour = "rgba(255, 0, 0, 0.5)"
let zoomFactor = zoom * 8;

let tileRam = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
];
let tempTileList = []



export function TileDraw(props) {
  const canvasRef = useRef(null);

  function saveLocal() {
    try{
      localStorage.setItem('tileList', JSON.stringify(tempTileList))
      console.log('tilemap saved successfuly')
      console.log(localStorage.getItem('tileList'))
    } catch (err) {
      console.error('something went wrong', err)
      return undefined;
    }
          
  }

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

  function saveTile() {
    
    props.tileList.forEach((tile) => tempTileList.push(tile.slice()))
    tempTileList.push(tileCopy(tileRam)); 
    saveLocal();
    props.setTileList(tempTileList)
    
    props.handleTileEdit(false)
  }
  

  useEffect(() => {

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
           
    }


    //Blanks and rerenders the canvas
    function updateCanvas(event) {
      getMousePos(canvas, event)
      previousTile = currentTile;
      currentTile = tempTile;
      
      blankScreen()  
      drawTile()
      drawGrid();
      } 

  function drawTile(){
    for (let x = 0; x < 8; x++){
      for (let y = 0; y < 8; y++){
        if (tileRam[y][x] == 1){
          drawPixel(x,y)
        }
        
      }
    }
  }
  
   function drawPixel(x, y) {
    context.fillStyle = foregroundColour;
    context.fillRect(x* zoomFactor, y*zoomFactor, zoomFactor, zoomFactor)
  }

//Update the currently selected tile
    function handleClick() {
      selectedTile = currentTile;
      if (tileRam[selectedTile.y][selectedTile.x] == 1) {
        tileRam[selectedTile.y][selectedTile.x] = 0;
      } else {
        tileRam[selectedTile.y][selectedTile.x] = 1;
      }
      blankScreen();      
      drawTile();
      drawGrid();
      
      
      context.beginPath();
      context.strokeStyle = boxColour;      
      context.rect(selectedTile.x* zoomFactor, selectedTile.y*zoomFactor, zoomFactor, zoomFactor)
      context.stroke(); 
    }
    
    canvas.addEventListener("mousemove", updateCanvas, false);
    canvas.addEventListener("click", handleClick, false);
    
   blankScreen()  
      drawTile()
      drawGrid();

    

    return(() => {
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", updateCanvas);
    })
    
  }, []);

  return (<div>
    <canvas ref={canvasRef} width={8*zoomFactor} height={8*zoomFactor}/>
    <input type="button" value="Save Tile" onClick={() => saveTile()} /> 
    <input type="button" value="Cancel" onClick={() => props.handleTileEdit(false)} /> 
  </div> )
}
