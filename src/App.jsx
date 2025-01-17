import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Pokedex from './components/Pokedex';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Pokedex />
    </>
  )
}

export default App
