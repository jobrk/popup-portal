import {useCallback, useState} from 'react';
import {PopupPortal} from './PopupPortal';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleTogglePopup = useCallback(() => {
    setShowPopup(s => !s);
  }, [setShowPopup]);

  const handleIncrementCounter = useCallback(() => {
    setCounter(c => c + 1);
  }, [setCounter]);

  const handleClose = useCallback(() => {
    console.log('poop');
    setShowPopup(false);
  }, [setShowPopup]);

  return (
    <>
      <button onClick={handleTogglePopup}>
        {showPopup ? 'hide popup' : 'show popup'}
      </button>
      <button onClick={handleIncrementCounter}>increment counter</button>
      {showPopup && (
        <PopupPortal onClose={handleClose}>
          <h2>Hello from PopupPortal</h2>
          <p>Counter: {counter}</p>
        </PopupPortal>
      )}
    </>
  );
}

export default App;
