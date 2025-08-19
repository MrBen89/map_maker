import { useState, useEffect } from "react";
import { TileSelect } from './TileSelect.js';
import { TileDraw } from './TileDraw.js';
import { IconSelect } from './IconSelect.js';
import { IconDraw } from './IconDraw.js';
import { Canvas } from './Canvas.js';
import { blank_tile, example_tile1, example_tile2, example_tile3, example_tile4, example_tile5, 
    example_tile6, example_tile7, example_tile8, example_tile9, example_tile10, example_tile11, example_icon } from "./Tiles";

let blank = blank_tile;
let example1 = example_tile1;
let example2 = example_tile2;
let example3 = example_tile3;
let example4 = example_tile4;
let example5 = example_tile5;
let example6 = example_tile6;
let example7 = example_tile7;
let example8 = example_tile8;
let example9 = example_tile9;
let example10 = example_tile10;
let example11 = example_tile11;
let icon1 = example_icon

let tempTileList = [blank, example1, example2, example3, example4, example5, example6, example7, example8, example9, example10, example11, ];
let tempIconList = [blank, icon1 ];
let tilesLoaded = false;
let iconsLoaded = false;



const Fetch = (setTileList) => {
    let tiles = []
  useEffect(() => {
    fetch('http://127.0.0.1:3001/square_tiles')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (const element of data) {
            let numEl = []
            for (const line of element.map) {
                numEl.push(line.map(Number))
            }
           
        tiles.push(numEl)
        };
        setTileList(tiles);
        tilesLoaded = true;
      })
  }, []);}



function loadLocal(){
    try {
      tempTileList = JSON.parse(localStorage.getItem("tileList")); 
      tempIconList = JSON.parse(localStorage.getItem("iconList"));     
      console.log('tilemap loaded successfuly')
    } catch (err) {
      console.error('something went wrong', err)
      return undefined;
  }
  }

  //loadLocal()

export function DrawView() {

    const [tileList, setTileList] = useState(tempTileList)

    const [zoom, setZoom] = useState(5);
    const [layer, setLayer] = useState(1);
    const [jpegData, setjpegData] = useState();
    const [drawType, setDrawType] = useState("Tile");
    const [viewCoords, setViewCoords] = useState([0,0]);
    const [tileEditMode, setTileEditMode] = useState(false);
    const [iconEditMode, setIconEditMode] = useState(false);

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

    const [selectedIcon, setSelectedIcon] = useState([
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
    ]);

    
    const [iconList, setIconList] = useState(tempIconList)

    function loadTiles() {
        if (tileList == null && tilesLoaded == false) {
            setTileList(tempTileList)
            
            tilesLoaded = true
        } 
        if (iconList == null && iconsLoaded == false) {
            setTileList(tempIconList)
            
            iconsLoaded = true
        } 
    }

    loadTiles() 


    
     
      

    const handleTileSelect = (value, type) => {
        setSelectedTile(value);
        setDrawType(type);
               
    };

    const handleIconSelect = (value, type) => {
        setSelectedIcon(value);
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
        }
    }

    function zoomOut(){
        if (zoom > 1){
            setZoom(zoom-1)
        }
    }

    function scrollUp(){
        setViewCoords([viewCoords[0], viewCoords[1] -1])
    }

    function scrollDown(){
        setViewCoords([viewCoords[0], viewCoords[1] +1])
    }
    
    function scrollLeft(){
        setViewCoords([viewCoords[0] -1, viewCoords[1]])
    }
    
    function scrollRight(){
        setViewCoords([viewCoords[0] +1, viewCoords[1]])
    }   

    function handleTileEdit(value){
        setTileEditMode(value)
        
    }    

    function handleIconEdit(value){
        setIconEditMode(value)
        
    }    
   
    Fetch(setTileList)   
    console.log (tempTileList)
    console.log (tileList)
       
    return (
        <div className='Screen'>  
          <div className="Main-canvas">
            <Canvas selectedTile={selectedTile} zoom={zoom} layer={layer} handlejpegData={handleJpeg} drawType={drawType} viewCoords={viewCoords}/>
          
            <div className="Buttons">
                <input type="button"  value="+" onClick={() => zoomIn()}/>
                <input type="button"  value="-" onClick={() => zoomOut()}/> 
                <input type="button"  value="Upper" onClick={() => layerUpper()}/>  
                <input type="button"  value="Mid" onClick={() => layerMid()}/>  
                <input type="button"  value="Lower" onClick={() => layerLower()}/> 
                <input type="button"  value="Save to JPEG" href={jpegData}/> 
                <input type="button"  value="←" onClick={() => scrollLeft()}/> 
                <input type="button"  value="↑" onClick={() => scrollUp()}/> 
                <input type="button"  value="→" onClick={() => scrollRight()}/> 
                <input type="button"  value="↓" onClick={() => scrollDown()}/> 
            </div>  
          </div>

          

          <div className="Selectors">
            <div className="Tile-selector">
                
                { tileEditMode 
                    ? 
                    (tilesLoaded ? <div>
                        <TileDraw handleTileEdit={handleTileEdit} setTileList={setTileList} tileList={tileList}/> 
                        
                      </div>
                    : <div>Loading Tiles...</div>)
                    : 
                    (tilesLoaded ? <div>
                        <TileSelect setSelectedTile={handleTileSelect} selectedTile={selectedTile} drawType={drawType} tileList={tileList} /> 
                        <input type="button" value="New Tile" onClick={() => handleTileEdit(true)} /> 
                      </div>
                    : <div>Loading Tiles...</div>)
                }
                
            </div>
            <div className="Icon-selector">
                { iconEditMode 
                    ? <div>
                        <IconDraw handleIconEdit={handleIconEdit} setIconList={setIconList} iconList={iconList}/> 
                        
                      </div>
                    : <div>
                        <IconSelect setSelectedTile={handleTileSelect} selectedTile={selectedTile} drawType={drawType} iconList={iconList} /> 
                        <input type="button" value="New Icon" onClick={() => handleIconEdit(true)} /> 
                      </div>
                }
                
            </div>
          </div>
          
          
          
            
          
        
        </div>
    )
}
