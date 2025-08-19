import './App.css';
import { useState } from "react";
import { DrawView } from './DrawView.js';
import { JournalView } from './JournalView.js';
import { CharView } from './CharView.js';
import { Login } from './auth/Login.js';


function App() {

  const [mode, setMode] = useState("Draw");

  const drawMode = (() => {
  if (mode === "Draw"){
    return (<DrawView />)
  } else if (mode === "Journal"){
    return (<JournalView />)
  } else if (mode === "Char"){
    return (<CharView />)
  }
  })

  function handleModeEdit(value){
      setMode(value)     
  }    
    
  return (
    
    <div className="App">
      
      <header className="App-header">
        <Login />
        <div className="tab-box">
          <button className={`tab ${(mode=="Draw") ? "active-tab" : ""}`} onClick={() => handleModeEdit("Draw")}>Draw</button>
          <button className={`tab ${(mode=="Journal") ? "active-tab" : ""}`} onClick={() => handleModeEdit("Journal")}>Journal</button>
          <button className={`tab ${(mode=="Char") ? "active-tab" : ""}`} onClick={() => handleModeEdit("Char")}>Character Sheet</button>
        </div>

        {drawMode()}
      
        
      </header>
      
      
      
    </div>
  );
  
}


export default App;
