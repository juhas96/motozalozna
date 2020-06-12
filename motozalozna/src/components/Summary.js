import React, { Component, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { Box, FormControlLabel, FormControl, Container, Button, InputLabel } from '@material-ui/core/';
// import { Form } from 'react-bootstrap'

import '../css/formPT.css'
import '../css/uniform.css'

const Summary = (props) => {
    
    const { values } = props;
    
    var valueRate = []

    useEffect(() => {

        // console.log(values)
        // Object.entries(values).map( ([key, value]) =>  valueRate.push({[key]: value}))

        // console.log(valueRate)

        setTimeout(function () {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }, 25);

    }, []) 

    const continueNext = e => {
        e.preventDefault();

    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    const getValues = () => { 

        Object.entries(values).map( ([key, value]) =>  {
            if(key.includes('_'))
                key = key.replace('_', " ")

            if(value == true)
                value = 'Áno'
            else if(value == false)
                value = 'Nie'

            switch (key) {
                case 'karoseria':
                    value == 0 ? value = 'Hatchbag / Sedan' : value = 'Kombi'
                    break;
                case 'palivo':
                    value == 0 ? value = 'Benzín' : value = 'Nafta'
                    break;
                case 'pohon':
                    value == 0 ? value = 'Jednej nápravy' : value = '4x4'
                    break;
                case 'prevodovka':
                    value == 0 ? value = 'Manuálna' : value = 'Automatická'
                    break;
                case 'dlzka_pozicky':
                    if(value == 0)
                        value = '1 Týždeň 9%'
                    else if(value == 1)
                        value = '2 Týždne 15%'
                    else 
                        value = 'Mesiac 19%'
                default:
                    break;
            }

            valueRate.push({name: key, val: value})
        })

        return (
            valueRate.map((value) => {
                return (
                    <div style={{margin: "auto"}}>
                        <ul class="list-group" style={{width: "500px"}}>
                            <li class="list-group-item" style={{'textAlign': "left", "fontSize": "20px"}}>{value.name} - {value.val}</li>
                        </ul>
                    </div>
                )
            })
        )
    }

    return (
        <MuiThemeProvider>
            <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div className="categoryName">
                    <h1>Suhrn</h1>
                </div>
                <div className="wrapper" style={{'textAlign': "center"}}>
                    <FormControl>
                        { getValues() }
                    </FormControl>
                </div>
                <div className="customButton">
                    <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                    <Button variant="contained" color="primary">Potvrdit</Button>
                </div>
            </Container>
        </MuiThemeProvider>
    )
}

export default Summary