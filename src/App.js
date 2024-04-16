import './App.css';
import { Canvas } from './Canvas.js';
import { TileSelect } from './TileSelect.js';


 
function App() {
  
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='Screen'>  
          <div className="Main-canvas">
            <Canvas />
          
        
          </div>
          <div className="Tile-selector">
            <TileSelect />
            </div>
          
        
        </div>
      
        
      </header>
      
      
      
    </div>
  );
  
}


export default App;
