import { useRef, useEffect } from 'react';
import { blank_tile, example_tile } from "./Tiles";

let zoom = 2;
let gridColour = "#111";
let foregroundColour = "#FFF";
let backgroundColour = "#000";
let highlightColour = "rgba(255, 0, 255, 0.2)"
let zoomFactor = zoom * 8;

let blank = blank_tile;
let example = example_tile;

export function Canvas(props) {
  const canvasRef = useRef(null);

  useEffect(() => {

    let currentTiles = [];
    let previousTiles= [];
    let currentCursor = { x: 0, y: 0}
    let previousCursor = { x: 0, y: 0}
    let currentTile = { x: 0, y: 0}
    let previousTile = { x: 2, y: 2}
    let tempTile = { x: 1, y: 1}
    

    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

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
    
    function blankScreen() {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        //previousCursor = currentCursor;
        currentCursor.x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width
        currentCursor.y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        tempTile.x =  (currentCursor.x - (currentCursor.x % zoomFactor))/zoomFactor
        tempTile.y =  (currentCursor.y - (currentCursor.y % zoomFactor))/zoomFactor
        //console.log(currentTile, previousTile)

        
    }

   

    function cellHighlight() {
      context.fillStyle = highlightColour;
      context.fillRect(currentTile.x*zoomFactor, currentTile.y*zoomFactor, zoomFactor, zoomFactor);
      
    }

    function findTile(event) {
      getMousePos(canvas, event);
      
      
    }
    
    function updateCanvas(event) {
        
        blankScreen()
        getMousePos(canvas, event)
        previousTile = currentTile;
        currentTile = tempTile;
        cellHighlight();
        drawGrid();
        console.log(currentTile, previousTile)

    }
    canvas.addEventListener("mousemove", updateCanvas, false);
    blankScreen();
    drawGrid();

   
    
  }, []);

  return <canvas ref={canvasRef} width='1000' height='1200'/>
}
