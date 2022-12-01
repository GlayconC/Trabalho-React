import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import api from '../api';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function Salas() {

    const [retorno, setRetorno] = useState(1);
    const [salas, setSalas] = useState({});
    const url = 'http://localhost:8000/api/classrooms/';
    const [lis, setLis] = useState(0);
    const [nome, setNome] = useState();
    const [numero, setNumero] = useState();
    const [alerta, setAlerta] = useState(0);
    const [editNome, setEditNome] = useState();
    const [editNumero, setEditNumero] = useState();
    const [id, setId] = useState();
    const [pag,setPag] = useState(1);
    const [totalPag, setTotalPag] = useState(0);

    if (retorno === 1) {

        var data = []

        data = {
            name: 'sala2',
            number: '4'
        }


        axios.get(url+'?page='+pag)
            .then(response => {
                console.log(response.data)
                setSalas(response.data.data)
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
            number: numero
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
        console.log(editNumero)

        axios.put(url + id + '?name=' + editNome + '&number=' + editNumero)
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
                                Object.values(salas).map(sala => (
                                    <tr key={sala.id}>
                                        
                                        <CardContent></CardContent>
                                        <td><strong>ID:</strong>  {sala.id}  </td>
                                        <CardContent></CardContent>
                                        <td><strong>Nome:</strong> {sala.name} </td>
                                        <CardContent></CardContent>
                                        <td><strong>Numero:</strong> {sala.number} </td>
                                        <CardContent></CardContent>
                                        <td><Button variant="contained" color="success" onClick={() => { setAlerta(0); setLis(3); setId(sala.id); }} >Editar</Button></td>
                                        <CardContent></CardContent>
                                        <td><Button variant="contained" color="error" onClick={() => { remover(sala.id); }}>Remover</Button></td>
                                    </tr>
                                ))

                            )}

                            {lis === 2 && (
                                <p>
                                    <form>
                                        <input type="text" placeholder="Nome:" onChange={(e) => { setNome(e.target.value) }}></input> <br />
                                        <CardContent></CardContent>
                                        <input type="text" placeholder="Numero:" onChange={(e) => { setNumero(e.target.value) }}></input><br />
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
                                        <input type="text" placeholder="Numero:"  onChange={(e) => { setEditNumero(e.target.value) }}></input><br />
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
                                    <Alert variant="outlined" severity="info">Sala de aula removida com sucesso!</Alert>
                                )}
                                {alerta === 2 && (
                                    <Alert variant="outlined" severity="success">Sala de aula inserida com sucesso!</Alert>
                                )}
                                {alerta === 3 && (
                                    <Alert variant="outlined" severity="info">Sala de aula alterada!</Alert>
                                )}
                                {alerta === 4 && (
                                    <Alert variant="outlined" severity="error">Erro ao adicionar Sala de aula!</Alert>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    
                )}
        </Fragment>
    )
}