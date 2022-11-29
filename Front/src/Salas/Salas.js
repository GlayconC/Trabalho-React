import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';


export default function Estudantes (){

    const [retorno, setRetorno] = useState(1);
    const [alunos, setAlunos] = useState({});   
    const url = 'http://localhost:8000/api/students/';
    const [lis, setLis] = useState(0);
    const [nome, setNome] = useState();
    const [curso, setCurso] = useState();

    if (retorno === 1){

        var data=[]
      
          data={
            name:'Aluno2',
            course:'Inglês2'
          }
       
      
        axios.get(url)
          .then(response=>{
            console.log(response.data.data)
            setAlunos(response.data.data)
            
          })
          .catch(error=>{console.log(error)})
          
          setRetorno(0);
        }

        function Listar(){
            setLis(1)
        }

        function Incluir(){
            var data=[]

            data={
                name:nome,
                course:curso
            }
            
            axios.post(url, data)
            .then(response=>{
                console.log(response)
                
            })
          
            .catch(error=>{console.log(error)})

        }

    return(
        <Fragment>
           <Button onClick={() => {Listar()}}>Listar</Button>
           <Button onClick={() => {setLis(2)}}>Incluir</Button>

           {lis === 1 && (
            Object.values(alunos).map(aluno => (
                <tr key={aluno.id}>
                    <td><strong>ID:</strong>  {aluno.id}  </td>
                    <td><strong>Nome:</strong> {aluno.name} </td>
                    <td><strong>Curso:</strong> {aluno.course} </td>
                    <td><button>Editar</button></td>
                    <td><button>Remover</button></td>
                </tr>    
            ))

           )}

           {lis === 2 && (
                <p>
                <form>   
                    <input type="text" placeholder="Nome:" onChange={(e)=> {setNome(e.target.value)}}></input> <br/>
                    <input type="text" placeholder="Curso:" onChange={(e)=> {setCurso(e.target.value)}}></input><br/>
                    <button type="submit" onClick={() => {Incluir()}}>Enviar</button>
                </form>
                </p>
           )}

           

        </Fragment>
    )
}