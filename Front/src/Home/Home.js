import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Home (){

    return(
        <Fragment>
            <Grid container>
                <Card>
                    <CardContent> Bem Vindo!</CardContent>
                    <CardContent> Selecione uma das opções acima para continuar...</CardContent>
                </Card>
            </Grid>
        </Fragment>
    )
}