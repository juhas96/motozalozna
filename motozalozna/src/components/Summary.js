import React, { Component, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { Box, FormControlLabel, FormControl, Container, Button, InputLabel } from '@material-ui/core/';
// import { Form } from 'react-bootstrap'

import '../css/formPT.css'
import '../css/uniform.css'

const Summary = (props) => {
    
    const { values } = props;

    useEffect(() => {

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

    String.prototype.Capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    const getValues = () => { 

        return(
            values.map((e) => {
                return(
                   <div>
                       <h2 style={{'marginBottom': "20px", "marginTop": "20px"}}>{e.name}</h2>
                       {
                            Object.entries(e.values).map( ([key, value]) =>  {

                                key = key.Capitalize()

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
                                    case 'dlzka pozicky':
                                        if(value == 0)
                                            value = '1 Týždeň 9%'
                                        else if(value == 1)
                                            value = '2 Týždne 15%'
                                        else 
                                            value = 'Mesiac 19%'
                                    default:
                                        break;
                                }

                                return(
                                <div style={{margin: "auto"}}>
                                    <ul class="list-group" style={{width: "500px"}}>
                                    <li class="list-group-item" style={{'textAlign': "left"}}>{key} - {value}</li>
                                    </ul>
                                </div>
                                )
                        })
                       }
                   </div>
                )
        }))
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