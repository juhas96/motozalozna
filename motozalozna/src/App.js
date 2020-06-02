import React from 'react';
import './App.css';
import MainPage from './components/MainPage';
import { StateMachineProvider, createStore } from "little-state-machine";

createStore({
  data: {}
});

function App() {
  return (
    <StateMachineProvider>
      <div className="App">
        <MainPage/>
      </div>
    </StateMachineProvider>
  );
}

export default App;
