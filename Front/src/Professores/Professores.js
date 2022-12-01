import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import api from '../api';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function Professores() {

    const [retorno, setRetorno] = useState(1);
    const [professores, setProfessores] = useState({});
    const url = 'http://localhost:8000/api/teachers/';
    const [lis, setLis] = useState(0);
    const [nome, setNome] = useState();
    const [materia, setMateria] = useState();
    const [alerta, setAlerta] = useState(0);
    const [editNome, setEditNome] = useState();
    const [editMateria, setEditMateria] = useState();
    const [id, setId] = useState();
    const [pag,setPag] = useState(1);
    const [totalPag, setTotalPag] = useState(0);

    if (retorno === 1) {

        var data = []

        data = {
            name: 'professor2',
            materia: 'Inglês'
        }


        axios.get(url+'?page='+pag)
            .then(response => {
                console.log(response.data)
                setProfessores(response.data.data)
                setTotalPag(response.data.last_page)

            })
            .catch(error => { console.log(error) })

        setRetorno(0);
    }

    function Listar() {
        setLis(1)
    }

    function Incluir() {
        var data = []

        data = {
            name: nome,
            materia: materia
        }

        axios.post(url, data)
            .then(response => {
                console.log(response)
                setRetorno(1)
                setAlerta(2)

            })

            .catch(error => { setAlerta(4)})

    }

    function editar() {
        console.log(editNome)
        console.log(editMateria)

        axios.put(url + id + '?name=' + editNome + '&materia=' + editMateria)
            .then(response => {
                console.log(response)
                setRetorno(1)
            })
            .catch(error => { console.log(error) })

    }

    function remover(id) {
        axios.delete(url + id)
            .then(response => { setRetorno(1); setAlerta(1) })
            .catch(error => { console.log(error) })
    }

    return (
        <Fragment>
            <Button variant="contained" color="inherit" className="m-3" onClick={() => { Listar(); setAlerta(0) }}>Listar</Button>
            <Button variant="contained" color='warning' className="m-3" onClick={() => { setLis(2); setAlerta(0) }}>Incluir</Button>

            {lis !== 0 &&(
                <Grid container spacing='2'>
                    <Card>
                        <CardContent>  
                            {lis === 1 && (
                                <p>Página {pag}</p>
                            )}
                            {lis === 1 && (                           
                                Object.values(professores).map(professor => (
                                    <tr key={professor.id}>
                                        
                                        <CardContent></CardContent>
                                        <td><strong>ID:</strong>  {professor.id}  </td>
                                        <CardContent></CardContent>
                                        <td><strong>Nome:</strong> {professor.name} </td>
                                        <CardContent></CardContent>
                                        <td><strong>Materia:</strong> {professor.materia} </td>
                                        <CardContent></CardContent>
                                        <td><Button variant="contained" color="success" onClick={() => { setAlerta(0); setLis(3); setId(professor.id); }} >Editar</Button></td>
                                        <CardContent></CardContent>
                                        <td><Button variant="contained" color="error" onClick={() => { remover(professor.id); }}>Remover</Button></td>
                                    </tr>
                                ))

                            )}

                            {lis === 2 && (
                                <p>
                                    <form>
                                        <input type="text" placeholder="Nome:" onChange={(e) => { setNome(e.target.value) }}></input> <br />
                                        <CardContent></CardContent>
                                        <input type="text" placeholder="Materia:" onChange={(e) => { setMateria(e.target.value) }}></input><br />
                                        <CardContent></CardContent>
                                        <Button variant="contained" color="success" onClick={() => { Incluir(); setLis(1); }}>Enviar</Button>
                                    </form>
                                </p>
                            )}

                            {lis === 3 && (
                                <p>
                                    <form>
                                        <input type="text" placeholder="Nome:" onChange={(e) => { setEditNome(e.target.value) }}></input> <br />
                                        <CardContent></CardContent>
                                        <input type="text" placeholder="Materia:"  onChange={(e) => { setEditMateria(e.target.value) }}></input><br />
                                        <CardContent></CardContent>
                                        <Button variant="contained" color="success" onClick={() => { editar(); setLis(1); setAlerta(3) }}>Editar</Button>
                                    </form>
                                </p>
                            )}

                        </CardContent>
                    </Card>
                </Grid>
                )}
                {lis === 1 &&(
                    <Grid>
                        {pag > 1  &&(
                            <Button variant="contained" color="info" className="m-3" onClick={()=> {setPag(pag-1); setRetorno(1); setAlerta(0)}}>Anterior</Button>
                         )}   

                        {pag < totalPag &&(
                            <Button variant="contained" color="info" className="m-3" onClick={()=> {setPag(pag+1); setRetorno(1); setAlerta(0)}}>Próxima</Button> 
                        )}
                    </Grid>                    
                    )}
                                       
                    <CardContent></CardContent>
                {alerta !== 0 && (
                    <Grid container spacing='2' xs='12'>
                        <Card>
                            <CardContent>
                                {alerta === 1 && (
                                    <Alert variant="outlined" severity="info">Professor removido com sucesso!</Alert>
                                )}
                                {alerta === 2 && (
                                    <Alert variant="outlined" severity="success">Professor inserido com sucesso!</Alert>
                                )}
                                {alerta === 3 && (
                                    <Alert variant="outlined" severity="info">Professor alterado!</Alert>
                                )}
                                {alerta === 4 && (
                                    <Alert variant="outlined" severity="error">Erro ao adicionar Professor!</Alert>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    
                )}
        </Fragment>
    )
}