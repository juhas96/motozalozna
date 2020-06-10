import React, { Component, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { Row } from 'react-bootstrap' 
import { TextField } from '@material-ui/core';
import '../css/formLoadDetails.css'
import '../css/uniform.css'

import DiscreteSlider from './Filter'

const FormLoanDetails = (props) =>  {

    const { values, handleChange } = props;

    useEffect(() => {
        setTimeout(function () {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }, 25);
    }, []) 

     // const continueNext = e => {
    //     e.preventDefault();
    //     props.nextStep();
    // }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    function valueText(value) {
        if(value != loanValue) {
            loanValue = value
            document.getElementById('awesomeID').value = loanValue
        }

        return `${value}€`;
    }

    var loanValue = 0

    const handleInput = input => e => {

        // console.log(e)

        if(input == 'slider') {
            loanValue = Number(e.target.ariaValueNow)
            document.getElementById('awesomeID').value = loanValue
        } else {
            loanValue = Number(e.target.value)
            document.getElementById("absolutelyMegaID").value = loanValue
        }
    }

    return (
        <MuiThemeProvider>
            <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div>
                    <div className="categoryName">
                        <h1>Stav vozidla</h1>
                    </div>
                    <div className="wrapper">
                        {/* <div> */}
                            <div className="header">
                                <h3>Chcete Vaše vozidlo používať počas záložného práva?</h3>
                                {/* <Row className='d-flex justify-content-center holder'> */}
                                <div className="holder">
                                    <div className="loanLenght">
                                        <InputLabel style={{'marginRight': "10px"}}id="dlzka_pozicky">Dĺžka pôžičky</InputLabel>
                                        <FormControl style={{marginRight: '10px'}}>
                                            {/* <InputLabel style={{'height': "20px"}}id="dlzka_pozicky">Dĺžka pôžičky</InputLabel> */}
                                            <Select
                                                style={{width: '25ch', "backgroundColor":"white"}}
                                                labelId="dlzka_pozicky"
                                                id="dlzka_pozicky"
                                                onChange={handleChange('dlzka_pozicky')}
                                                defaultValue={values.dlzka_pozicky ? values.dlzka_pozicky : undefined}>
                                                <MenuItem value={'1T'}>1 Týždeň</MenuItem>
                                                <MenuItem value={'2T'}>2 Týždne</MenuItem>
                                                <MenuItem value={'mesiac'}>Mesiac</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                            
                                    <div className="confirmCol">
                                        <label className="labelConfirm">Potvrdzujem svoj záujem  - </label> 
                                        <FormControl>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox color="primary" checked={values.zalozne_pravo ? values.zalozne_pravo : false} onChange={handleChange('zalozne_pravo')} />
                                                }
                                                label="Áno"
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                    {/* </Row> */}
                            </div>
                        </div>

                            <div className="divider"></div>

                            <div className="wrapper">
                                <div className="chooseLvl">
                                    <Typography id="discrete-slider-custom" gutterBottom variant='inherit'>
                                        <h3>Vyberte si výšku Vašej pôžičky</h3>
                                    </Typography>
                                </div>

                                 <DiscreteSlider values={values} handleChange={handleChange} max={10000}/>
                            </div>
                        <div className="customButton">
                            <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                            <Button variant="contained" color="primary">Potvrdiť</Button>
                        </div>
                    {/* </div> */}
                </div>
            </Container>
        </MuiThemeProvider>
    )
}

export default FormLoanDetails;