// import { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import MathSolverPopup from './MathSolverPopup';

// function App() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const togglePopup = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Welcome to Math Solver</h1>
//         <button onClick={togglePopup}>
//           {isPopupOpen ? 'Close Math Solver' : 'Open Math Solver'}
//         </button>
//         {/* Render the MathSolverPopup component conditionally */}
//         {isPopupOpen && <MathSolverPopup />}
//       </header>
//     </div>
//   );
// }

// export default App;




import { useState } from 'react';

import MathSolverPopup from './MathSolverPopup';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Math Solver</h1>
        <button onClick={togglePopup}>
          {isPopupOpen ? 'Close Math Solver' : 'Open Math Solver'}
        </button>
        {isPopupOpen && <MathSolverPopup />}
      </header>
    </div>
  );
}

export default App;
