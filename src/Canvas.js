import { useRef, useEffect } from 'react';
import { blank_tile } from "./Tiles";

let zoom = 5;
let gridColour = "#2FF";
let foregroundColour = "#FFF";
let backgroundColour = "#000";
let highlightcolour = "rgba(255, 0, 255, 0.2)"

let blank = blank_tile;

export function Canvas(props, blank_tile) {
  const canvasRef = useRef(null);

  useEffect(() => {
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function drawGrid() {
        for (let x = 0; x < canvas.width; x += (8*zoom)){
            context.beginPath();
            context.moveTo(x,0);
            context.lineTo(x,canvas.width);
            context.strokeStyle = gridColour;
            context.stroke();
        }
        for (let y = 0; y < canvas.height; y += (8*zoom)){
            context.beginPath();
            context.moveTo(0,y);
            context.lineTo(canvas.height,y);
            context.strokeStyle = gridColour;
            context.stroke();
        }
    }

    

    function drawTile(tile, locationX, locationY) {
        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++){
            if (tile[y][x] == 0){
              context.fillStyle = backgroundColour;
              context.fillRect(locationX + (zoom * x), locationY + (zoom * y), zoom, zoom);
            } else {
              context.fillStyle = foregroundColour;
              context.fillRect(locationX + (zoom * x), locationY + (zoom * y), zoom, zoom);
            }
          }
          
        }
    };
    
    function blankScreen() {
        for (let x = 0; x < canvas.width; x += (8*zoom)) {
            for (let y = 0; y < canvas.height; y += (8*zoom)) {
                drawTile(blank, x, y);
            }
        }
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }

    canvas.addEventListener("mousemove", cellHighlight, false);
    blankScreen();
    drawGrid();

    function cellHighlight(event) {
        var pos = getMousePos(canvas, event);
        let posX = pos.x
        let posY = pos.y

        context.fillStyle = highlightcolour;
        context.fillRect(posX - (posX % (8 * zoom)), posY - (posY % (8 * zoom)), zoom*8, zoom*8);

    }

   
    
  }, []);

  return <canvas ref={canvasRef} width='3000' height='3200'/>
}


