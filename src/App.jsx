import React from 'react';
import './App.css';
import './components/Profile';  // Import the Lit component (custom element)
import Profile1 from './components/Profile1';  // Import React component

function App() {
  return (
    <div className="App">
      {/* Using the Lit web component directly in JSX */}
      <volunteer-profile></volunteer-profile>

      {/* Using the React component */}
      <Profile1 />
    </div>
  );
}

export default App;
