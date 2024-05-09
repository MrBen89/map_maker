import { useState } from "react";
import { TileSelect } from './TileSelect.js';
import { IconSelect } from './IconSelect.js';
import { Canvas } from './Canvas.js';

export function DrawView() {

    const [zoom, setZoom] = useState(5);
    const [layer, setLayer] = useState(1);
    const [jpegData, setjpegData] = useState();
    const [drawType, setDrawType] = useState("Tile");

    const [selectedTile, setSelectedTile] = useState([
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
    ]);

    const handleTileSelect = (value, type) => {
        setSelectedTile(value);
        setDrawType(type);
               
    };


    function handleJpeg(data){
        setjpegData(data)
    }

    function layerUpper(){
        setLayer(0);
    }

    function layerMid(){
        setLayer(1);
    }

    function layerLower(){
        setLayer(2);
    }

    function zoomIn(){
        if (zoom < 10){
            setZoom(zoom+1)
            console.log("app", zoom);
        }
    }

    function zoomOut(){
        if (zoom > 1){
            setZoom(zoom-1)
            console.log("app", zoom);
        }
    }

    
    

    return (
        <div className='Screen'>  
          <div className="Main-canvas">
            <Canvas selectedTile={selectedTile} zoom={zoom} layer={layer} handlejpegData={handleJpeg} drawType={drawType}/>
          </div>

          <div className="Selectors">
            <div className="Tile-selector">
                <TileSelect setSelectedTile={handleTileSelect} selectedTile={selectedTile} drawType={drawType} />
            </div>
            <div className="Icon-selector">
                <IconSelect setSelectedTile={handleTileSelect} selectedTile={selectedTile} drawType={drawType} />
            </div>
          </div>
          
          
          <div className="Buttons">
            <input type="button"  value="+" onClick={() => zoomIn()}/>
            <input type="button"  value="-" onClick={() => zoomOut()}/> 
            <input type="button"  value="Upper" onClick={() => layerUpper()}/>  
            <input type="button"  value="Mid" onClick={() => layerMid()}/>  
            <input type="button"  value="Lower" onClick={() => layerLower()}/> 
            <input type="button"  value="Save to JPEG" href={jpegData}/>  
            
          </div>  
            
          
        
        </div>
    )
}
