import React from 'react';

import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <main style={{marginTop: '120px'}}>
        <p>This is the page content!</p>
      </main>
    </div>
  );
}

export default App;
