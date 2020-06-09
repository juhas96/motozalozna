import React, { Component } from 'react';
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

const FormLoanDetails = (props) =>  {
    
    // const continueNext = e => {
    //     e.preventDefault();
    //     props.nextStep();
    // }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }
    
    
    const { values, handleChange } = props;
    const marks = [
        {
            value: 0,
            label: '0€',
        },
        {
            value: 10000,
            label: '10000€',
        }
    ];

    function valueText(value) {
        return `${value}€`;
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
                                        <FormControl style={{marginRight: '10px'}}>
                                            <InputLabel id="dlzka_pozicky-label">Dĺžka pôžičky</InputLabel>
                                            <Select
                                                style={{width: '25ch', "backgroundColor":"white"}}
                                                labelId="dlzka_pozicky"
                                                id="dlzka_pozicky"
                                                onChange={handleChange('dlzka_pozicky')}
                                                defaultValue={values.dlzka_pozicky ? values.dlzka_pozicky : 0}>
                                                <MenuItem value={0}>1 Týždeň</MenuItem>
                                                <MenuItem value={1}>2 Týždne</MenuItem>
                                                <MenuItem value={2}>Mesiac</MenuItem>
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

                                <Row className='d-flex justify-content-center'>
                                    <div className="col-md-6 slider">
                                        <Slider
                                            defaultValue={0}
                                            min={0}
                                            max={10000}
                                            getAriaValueText={valueText}
                                            aria-labelledby="discrete-slider-custom"
                                            step={1}
                                            valueLabelDisplay="auto"
                                            marks={marks}
                                        />
                                    </div>

                                    <div style={{'width': "30px"}}></div>


                                    <div className="col-md-4 textField">
                                        <TextField
                                            style={{'backgroundColor': "white"}}
                                            label="Vyska Pozicky"
                                            type="number"
                                            // onChange={handleChange('vykon')}
                                            size="small"
                                            fullWidth
                                        />
                                    </div>
                                </Row>
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