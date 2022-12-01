import React, { Fragment, useState } from 'react';


// Utils
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// Pags
import Estudantes from './Estudantes/Estudantes'
import Livros from './Livros/Livros'
import Professores from './Professores/Professores'
import Salas from './Salas/Salas'
import Home from './Home/Home'

function App() {

const [a, setA] = useState(0);

  return (
    <Fragment>
        <Grid  
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Button variant="contained" color="info" className="m-3" onClick={() => {setA(0)}}>Home</Button>
          <Button variant="contained" color="info" className="m-3" onClick={() => {setA(1)}}>Estudantes</Button>
          <Button variant="contained" color="info" className="m-3" onClick={() => {setA(2)}}>Livros</Button>
          <Button variant="contained" color="info" className="m-3" onClick={() => {setA(3)}}>Salas</Button>
          <Button variant="contained" color="info" className="m-3" onClick={() => {setA(4)}}>Professor</Button>
        </Grid>

        <hr/>
  
      {a === 0 &&(
        <Home/>
      )}
      {a === 1 &&(
        <Estudantes/>
      )}
      {a === 2 &&(
        <Livros/>
      )}
      {a === 3 &&(
        <Salas/>
      )}
      {a === 4 &&(
        <Professores/>
      )}

    </Fragment>
  );
}

export default App;
