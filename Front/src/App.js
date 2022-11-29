import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Fragment, useState } from 'react';
import Estudantes from './Estudantes/Estudantes'
import Button from '@mui/material/Button';

function App() {

const [a, setA] = useState(0);

  return (
    <Fragment>
    
    <Button onClick={() => {setA(0)}}>Home</Button>
    <Button onClick={() => {setA(1)}}>Estudantes</Button>
    <Button onClick={() => {setA(2)}}>Livros</Button>
    <Button onClick={() => {setA(3)}}>Salas</Button>
    <Button onClick={() => {setA(4)}}>Professor</Button>
    <hr></hr>
 

{a === 1 &&(
  <Estudantes/>
)}
    </Fragment>
  );
}

export default App;
