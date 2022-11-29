import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import api from '../api';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function Estudantes() {

    const [retorno, setRetorno] = useState(1);
    const [alunos, setAlunos] = useState({});
    const url = 'http://localhost:8000/api/students/';
    const [lis, setLis] = useState(0);
    const [nome, setNome] = useState();
    const [curso, setCurso] = useState();
    const [alerta, setAlerta] = useState(0);
    const [editNome, setEditNome] = useState();
    const [editCurso, setEditCurso] = useState();
    const [id, setId] = useState();
    const [pag,setPag] = useState(1);
    const [totalPag, setTotalPag] = useState(0);

    if (retorno === 1) {

        var data = []

        data = {
            name: 'Aluno2',
            course: 'Inglês2'
        }


        axios.get(url+'?page='+pag)
            .then(response => {
                console.log(response.data)
                setAlunos(response.data.data)
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
            course: curso
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
        console.log(editCurso)

        axios.put(url + id + '?name=' + editNome + '&course=' + editCurso)
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
            <Button onClick={() => { Listar(); setAlerta(0) }}>Listar</Button>
            <Button onClick={() => { setLis(2); setAlerta(0) }}>Incluir</Button>

            {lis !== 0 &&(
                <Grid container spacing='2'>
                    <Card>
                        <CardContent>  
                            {lis === 1 && (
                                <p>Página {pag}</p>
                            )}
                            {lis === 1 && (                           
                                Object.values(alunos).map(aluno => (
                                    <tr key={aluno.id}>
                                        
                                        <CardContent></CardContent>
                                        <td><strong>ID:</strong>  {aluno.id}  </td>
                                        <CardContent></CardContent>
                                        <td><strong>Nome:</strong> {aluno.name} </td>
                                        <CardContent></CardContent>
                                        <td><strong>Curso:</strong> {aluno.course} </td>
                                        <CardContent></CardContent>
                                        <td><Button variant="contained" color="success" onClick={() => { setAlerta(0); setLis(3); setId(aluno.id); }} >Editar</Button></td>
                                        <CardContent></CardContent>
                                        <td><Button variant="contained" color="error" onClick={() => { remover(aluno.id); }}>Remover</Button></td>
                                    </tr>
                                ))

                            )}

                            {lis === 2 && (
                                <p>
                                    <form>
                                        <input type="text" placeholder="Nome:" onChange={(e) => { setNome(e.target.value) }}></input> <br />
                                        <CardContent></CardContent>
                                        <input type="text" placeholder="Curso:" onChange={(e) => { setCurso(e.target.value) }}></input><br />
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
                                        <input type="text" placeholder="Curso:"  onChange={(e) => { setEditCurso(e.target.value) }}></input><br />
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
                            <Button onClick={()=> {setPag(pag-1); setRetorno(1); setAlerta(0)}}>Anterior</Button>
                         )}   

                        {pag < totalPag &&(
                            <Button onClick={()=> {setPag(pag+1); setRetorno(1); setAlerta(0)}}>Próxima</Button> 
                        )}
                    </Grid>                    
                    )}
                                       
                    <CardContent></CardContent>
                {alerta !== 0 && (
                    <Grid container spacing='2' xs='12'>
                        <Card>
                            <CardContent>
                                {alerta === 1 && (
                                    <Alert variant="outlined" severity="info">Estudante removido com sucesso!</Alert>
                                )}
                                {alerta === 2 && (
                                    <Alert variant="outlined" severity="success">Estudante inserido com sucesso!</Alert>
                                )}
                                {alerta === 3 && (
                                    <Alert variant="outlined" severity="info">Estudante alterado!</Alert>
                                )}
                                {alerta === 4 && (
                                    <Alert variant="outlined" severity="error">Erro ao adicionar estudante!</Alert>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    
                )}
        </Fragment>
    )
}