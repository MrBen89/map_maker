import { useState } from "react";
import { TileSelect } from './TileSelect.js';
import { Canvas } from './Canvas.js';

export function DrawView() {

    const [zoom, setZoom] = useState(5);

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

    const handleTileSelect = (value) => {
        setSelectedTile(value);
        console.log("Hi, i am value", value)
        
    };

    function zoomIn(){
        if (zoom < 10){
            setZoom(zoom+1);
            console.log(zoom)
        }
    }

    function zoomOut(){
        if (zoom > 1){
            setZoom(zoom-1);
            console.log(zoom)
        }
    }
    

    return (
        <div className='Screen'>  
          <div className="Main-canvas">
            <Canvas selectedTile={selectedTile} zoom={zoom}/>
          
        
          </div>
          <div className="Tile-selector">
            <TileSelect setSelectedTile={handleTileSelect} selectedTile={selectedTile} />
            </div>
          <div>
            <input type="button"  value="+" onClick={zoomIn}/>
            <input type="button"  value="-" onClick={zoomOut}/>  
            
          </div>  
            
          
        
        </div>
    )
}
