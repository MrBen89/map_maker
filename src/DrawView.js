import { useState } from "react";
import { TileSelect } from './TileSelect.js';
import { Canvas } from './Canvas.js';

export function DrawView() {
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
    

    return (
        <div className='Screen'>  
          <div className="Main-canvas">
            <Canvas selectedTile={selectedTile}/>
          
        
          </div>
          <div className="Tile-selector">
            <TileSelect setSelectedTile={handleTileSelect} selectedTile={selectedTile} />
            </div>
          
        
        </div>
    )
}
