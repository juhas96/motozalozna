import React,  { useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { Button, Container, FormControl, FormControlLabel, Checkbox, InputLabel, MenuItem, Select, Typography } from '@material-ui/core/'
import { Form } from 'react-bootstrap'

import '../css/formLoadDetails.css'
import '../css/uniform.css'

import DiscreteSlider from './DiscreteSlider'

const FormLoanDetails = (props) =>  {

    const { values, handleChange, handleState } = props;

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
        props.nextStep();
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    return (
        <MuiThemeProvider>
            <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div>
                    <Form onSubmit={continueNext}> 
                        <div className="categoryName">
                            <h1>Stav vozidla</h1>
                        </div>
                        <div className="wrapper">
                            {/* <div> */}
                                <div className="header">
                                    <h2>Chcete Vaše vozidlo používať počas záložného práva?</h2>
                                    {/* <Row className='d-flex justify-content-center holder'> */}
                                    <div className="holder">

                                        <div className="confirmCol">
                                                <label className="labelConfirm">Áno, chcem používať svoje vozidlo  - </label> 
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

                                        <div className="loanLenght">
                                            <InputLabel style={{'marginRight': "10px"}}id="dlzka_pozicky">Dĺžka pôžičky</InputLabel>
                                            <FormControl style={{marginRight: '10px'}}>
                                                {/* <InputLabel style={{'height': "20px"}}id="dlzka_pozicky">Dĺžka pôžičky</InputLabel> */}
                                                <Select
                                                    required = {true}
                                                    style={{width: '25ch', "backgroundColor":"white", "height": "50px"}}
                                                    labelId="dlzka_pozicky"
                                                    id="dlzka_pozicky"
                                                    onChange={handleChange('dlzka_pozicky')}
                                                    defaultValue={values.dlzka_pozicky ?? undefined}>
                                                    <MenuItem value={0}>1 Týždeň</MenuItem>
                                                    <MenuItem value={1}>2 Týždne</MenuItem>
                                                    <MenuItem value={2}>Mesiac</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                            
                                        {/* </Row> */}
                                </div>
                            </div>

                                <div className="divider"></div>

                                <div className="wrapper">
                                    <div className="chooseLvl">
                                        <Typography id="discrete-slider-custom" gutterBottom variant='inherit'>
                                            <h2>Vyberte si výšku Vašej pôžičky</h2>
                                        </Typography>
                                    </div>

                                    <DiscreteSlider values={values.cenaPozicky} handleChange={handleState} max={values.cenaPozicky}/>

                                </div>
                            <div className="customButton">
                                <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                                <Button type="submit" variant="contained" color="primary">Potvrdiť</Button>
                            </div>
                        {/* </div> */}
                    </Form>
                </div>
            </Container>
        </MuiThemeProvider>
    )
}

export default FormLoanDetails;