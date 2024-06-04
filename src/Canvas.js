import { useRef, useEffect } from 'react';
import { blank_tile, example_tile1 } from "./Tiles";


//temporary tile substitutes
let blank = blank_tile;
let example = example_tile1;

//Initialise global variables

let gridColour = "#111";
let foregroundColour = "#FFF";
let iconColour = "#00F";
let backgroundColour = "#000";
let highlightColour = "rgba(255, 0, 0, 0.5)"
let zoom = 5;
let currentMidTiles = [];
let currentLowerTiles = [];
let currentUpperTiles = [];
let currentMidIcons = [];
let currentLowerIcons = [];
let currentUpperIcons = [];

 //functions to save and load data locally
    
 function loadLocal(){
  try {
    let tempLowerTiles = JSON.parse(localStorage.getItem("lowerTileMap"));
    let tempMidTiles = JSON.parse(localStorage.getItem("midTileMap"));
    let tempUpperTiles = JSON.parse(localStorage.getItem("upperTileMap"));
    let tempLowerIcons = JSON.parse(localStorage.getItem("lowerIconMap"));
    let tempMidIcons = JSON.parse(localStorage.getItem("midIconMap"));
    let tempUpperIcons = JSON.parse(localStorage.getItem("upperIconMap"));

    if (tempLowerIcons != null) {
      currentLowerIcons = tempLowerIcons
    }
    if (tempMidIcons != null) {
      currentMidIcons = tempMidIcons
    }
    if (tempUpperIcons != null) {
      currentUpperIcons = tempUpperIcons
    }
    if (tempLowerTiles != null) {
      currentLowerTiles = tempLowerTiles
    }
    if (tempMidTiles != null) {
      currentMidTiles = tempMidTiles
    }
    if (tempUpperTiles != null) {
      currentUpperTiles = tempUpperTiles
    }
    
    console.log('tilemap loaded successfuly')
} catch (err) {
    console.error('something went wrong', err)
    return undefined;
}
}


function saveLocal() {
  try{
    localStorage.setItem('lowerTileMap', JSON.stringify(currentLowerTiles))
    localStorage.setItem('midTileMap', JSON.stringify(currentMidTiles))
    localStorage.setItem('upperTileMap', JSON.stringify(currentUpperTiles))
    localStorage.setItem('lowerIconMap', JSON.stringify(currentLowerIcons))
    localStorage.setItem('midIconMap', JSON.stringify(currentMidIcons))
    localStorage.setItem('upperIconMap', JSON.stringify(currentUpperIcons))
    console.log('tilemap saved successfuly')
  } catch (err) {
    console.error('something went wrong', err)
    return undefined;
  }
        
}

loadLocal();


export function Canvas(props) {
  const canvasRef = useRef(null);
  let selectedTile = props.selectedTile;
  zoom = props.zoom;
  let layer = props.layer;
  let zoomFactor = zoom * 8;;
  let viewCoords = props.viewCoords;
  
 useEffect(() => {

    
    let previousTiles= [];
    let currentCursor = { x: 0, y: 0}
    let previousCursor = { x: 0, y: 0}
    let currentTile = { x: 0, y: 0}
    let previousTile = { x: 2, y: 2}
    let tempTile = { x: 1, y: 1}

    
    
    setTimeout(() => {
      blankScreen()
      drawMappedTiles();
      drawMappedIcons();
      drawGrid();
    }, 100)


    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let viewWidth = Math.floor(canvas.width/zoomFactor);
    let viewHeight = Math.floor(canvas.height/zoomFactor);

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
    function drawTile(tile, locationX, locationY, colour) {
        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++){
            if (tile[y][x] === 1){

              context.fillStyle = colour;
              context.fillRect(locationX + (props.zoom * x), locationY + (props.zoom * y), props.zoom, props.zoom);
            }
          }
          
        }
    };

//Draws all tiles in tilemap
    function drawMappedTiles() {
      if (layer == 0){
        currentUpperTiles.forEach((element) => {
          if (element.x >= viewCoords[0]  && element.x < viewCoords[0] +viewWidth && element.y >= viewCoords[1] && element.y < viewCoords[1] + viewHeight) {
              console.log("drawing")
              drawTile(element.tile, (element.x - viewCoords[0]) * zoomFactor, (element.y - viewCoords[1]) * zoomFactor, foregroundColour);
            }
          
        })
      } else if (layer == 1) {
        currentMidTiles.forEach((element) => {
          if (element.x >= viewCoords[0]  && element.x < viewCoords[0] +viewWidth && element.y >= viewCoords[1] && element.y < viewCoords[1] + viewHeight) {
            drawTile(element.tile, (element.x - viewCoords[0]) * zoomFactor, (element.y - viewCoords[1]) * zoomFactor, foregroundColour);
          }
        })
      } else if (layer == 2) {
        currentLowerTiles.forEach((element) => {
          if (element.x >= viewCoords[0]  && element.x < viewCoords[0] +viewWidth && element.y >= viewCoords[1] && element.y < viewCoords[1] + viewHeight) {
            drawTile(element.tile, (element.x - viewCoords[0]) * zoomFactor, (element.y - viewCoords[1]) * zoomFactor, foregroundColour);
          }
        })
      }
      
    }

    //Draws all icons in iconmap
    function drawMappedIcons() {
      if (layer == 0){
        currentUpperIcons.forEach((element) => {
          if (element.x >= viewCoords[0]  && element.x < viewCoords[0] +viewWidth && element.y >= viewCoords[1] && element.y < viewCoords[1] + viewHeight) {
            drawTile(element.tile, (element.x - viewCoords[0]) * zoomFactor, (element.y - viewCoords[1]) * zoomFactor, iconColour);
          }
        })
      } else if (layer == 1) {
        currentMidIcons.forEach((element) => {
          if (element.x >= viewCoords[0]  && element.x < viewCoords[0] +viewWidth && element.y >= viewCoords[1] && element.y < viewCoords[1] + viewHeight) {
            drawTile(element.tile, (element.x - viewCoords[0]) * zoomFactor, (element.y - viewCoords[1]) * zoomFactor, iconColour);
          }
        })
      } else if (layer == 2) {
        currentLowerIcons.forEach((element) => {
          if (element.x >= viewCoords[0]  && element.x < viewCoords[0] +viewWidth && element.y >= viewCoords[1] && element.y < viewCoords[1] + viewHeight) {
            drawTile(element.tile, (element.x - viewCoords[0]) * zoomFactor, (element.y - viewCoords[1]) * zoomFactor, iconColour);
          }
        })
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
        currentTile.x = tempTile.x;
        currentTile.y = tempTile.y;
        drawMappedTiles();
        drawMappedIcons();
        cellHighlight();
        drawGrid();
        
    }

    //Adds or updates the current tile to the tilemap
    function updateTileMap() {
      let currLayer
      let flag = false
      if (layer == 0) {
        currLayer = currentUpperTiles
      } else if (layer == 1) {
        currLayer = currentMidTiles
      } else if (layer == 2) {
        currLayer = currentLowerTiles
      }
      currLayer.forEach((element) => {
        if (element.x == currentTile.x + viewCoords[0] && element.y == currentTile.y + viewCoords[1]){
          element.tile = tileCopy(selectedTile)
          flag = true
          return;
        } 
        
        
      })
      if (flag == false){
        currLayer.push({x: currentTile.x + viewCoords[0], y: currentTile.y + viewCoords[1], tile: tileCopy(selectedTile)})
      }
           
    }

    //Adds or updates the current icon to the iconmap
    function updateIconMap() {
      let currLayer
      let flag = false
      if (layer == 0) {
        currLayer = currentUpperIcons
      } else if (layer == 1) {
        currLayer = currentMidIcons
      } else if (layer == 2) {
        currLayer = currentLowerIcons
      }
      currLayer.forEach((element) => {
        if (element.x == currentTile.x + viewCoords[0] && element.y == currentTile.y + viewCoords[1]){
          element.tile = tileCopy(selectedTile)
          flag = true
          return;
        } 
        
        
      })
      if (flag == false){
        currLayer.push({x: currentTile.x + viewCoords[0], y: currentTile.y + viewCoords[1], tile: tileCopy(selectedTile)})
      }
      
        
      
    }


   

//Update the current tilemap with the new tile
    function handleClick() {
      if (props.drawType == "Tile") {
        console.log("tile")
        updateTileMap()
      } else if (props.drawType == "Icon") {
        updateIconMap()
      }

      saveLocal()
      blankScreen()  
      drawMappedTiles(); 
      drawMappedIcons(); 
      cellHighlight(); 
      drawGrid();
      //updates the state for the image download. currently delivers data correctly, not sure how to convert that to .jpg. also quite slow
      //let jpeg = canvas.toDataURL("image/jpeg", 1).replace("image/jpeg", "image/octet-stream");
      //props.handlejpegData(jpeg)  
          
    }
    
    canvas.addEventListener("mousemove", updateCanvas, false);
    
    canvas.addEventListener("mouseup", handleClick, false);
    
    drawGrid();

  


    //If event handlers notr removed, they will be readded everytime the canvas is rerendered, causing multiple vents to fire.
   return(() => {
    canvas.removeEventListener("mouseup", handleClick);
    canvas.removeEventListener("mousemove", updateCanvas);
  })
    
  }, [props.selectedTile, props.zoom, props.layer, props.viewCoords]);

  return <canvas ref={canvasRef} width='3000' height='3200'/>
}
