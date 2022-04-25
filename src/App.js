import { useCallback, useMemo, useState } from 'react';
import './App.css';
import ThreeDtText from './Components/ThreeDtText';

function App() {
  const [currentSelector, setCurrentSelector] = useState(null);
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  const selectorComponents = useMemo(() => {
    return [{
      name: "3dtext",
      component: <ThreeDtText />, 
    }]
  }, [])

  const selectorComponent = useMemo(() => {
    return selectorComponents.find((c) => c.name === currentSelector)?.component
  } ,[currentSelector, selectorComponents]) 

  const updateSelector = useCallback((name) => {
    setCurrentSelector(name);
  }, [])

  return (
    <div className="App">
      <div className="header"> 
        <div>
          Reusable css components
        </div> 
      </div>

      <div className="main">
        {currentSelector ? 
        <>
          <div className='back-button' onClick={() => setCurrentSelector(null)}> {"<-"} </div>

          <div className="selector-component">
            {selectorComponent}

            <div className="selector-actions">
              <div className="btn btn-primary" onClick={() => setIsCodeOpen(true)}>view source code</div>
              <div className="btn btn-primary">Download</div>
            </div>

            <div className="source-code-container accordion-item">
             
              {isCodeOpen && 
                <div style = {{width: "90%", border: "1px solid rgba(0, 0, 0, 0.279)", padding: "30px"}}>
                  <div className="code-close-btn" >
                    <div> {""} </div>
                    <div>{currentSelector} </div>
                    <div onClick={()=> setIsCodeOpen(false)}>X </div>
                  </div>

                  <div className="source-code">
                    yor code goes here
                  </div>
                </div>
            }  
            </div>
          </div>
        </>
        : 
          selectorComponents.map((c) => (
            <button class = "btn btn-secondary" onClick={() => updateSelector(c.name)}>
              {c.name}
            </button>
          ))
        }
      </div>
      
    </div>
  );
}

export default App;
