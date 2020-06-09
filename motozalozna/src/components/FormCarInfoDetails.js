import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
//FORM CSS
import '../css/formCarInfoDetails.css'
import '../css/uniformForm.css'

import '../css/uniform.css'

const FormCarInfoDetails = (props) =>  {

    const { values, handleChange } = props;

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
                    <div className="categoryName">
                        <h1>Údaje o vozidle</h1>
                    </div>
                    <div className="wrapper">
                        <h3>Zákaldne informácie</h3>
                        <div className="controlForm">
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-offset-2 topCol">
                                    <FormControl className="form">
                                        <InputLabel id="karoseria-label">Typ karosérie</InputLabel>
                                        <Select
                                            style={{width: '25ch'}}
                                            labelId="karoseria"
                                            id="karoseria"
                                            onChange={handleChange('karoseria')}
                                            defaultValue={values.karoseria ? values.karoseria : 0}>
                                            <MenuItem value={0}>Hachback / Sedan</MenuItem>
                                            <MenuItem value={1}>Kombi</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                    
                                <div className="col-md-3 topCol">
                                    <FormControl className="form">
                                        <InputLabel id="palivo-label">Palivo</InputLabel>
                                        <Select
                                            style={{width: '25ch'}}
                                            labelId="palivo"
                                            id="palivo"
                                            onChange={handleChange('palivo')}
                                            defaultValue={values.palivo ? values.palivo : 0}>
                                            <MenuItem value={0}>Benzín</MenuItem>
                                            <MenuItem value={1}>Nafta</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center">
                                <div className="col-md-offset-2 topCol">
                                    <FormControl className="form">
                                        <InputLabel id="pohon-label">Typ pohonu</InputLabel>
                                        <Select
                                            style={{width: '25ch'}}
                                            labelId="pohon"
                                            id="pohon"
                                            onChange={handleChange('pohon')}
                                            defaultValue={values.pohon ? values.pohon : 0}>
                                            <MenuItem value={0}>Jednej nápravy</MenuItem>
                                            <MenuItem value={1}>4x4</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="col-md-3 topCol">
                                    <FormControl className="form">
                                        <InputLabel id="prevodovka-label">Prevodovka</InputLabel>
                                        <Select
                                            style={{width: '25ch'}}
                                            labelId="prevodovka"
                                            id="prevodovka"
                                            onChange={handleChange('prevodovka')}
                                            defaultValue={values.prevodovka ? values.prevodovka : 0}>
                                            <MenuItem value={0}>Manuálna</MenuItem>
                                            <MenuItem value={1}>Automatická</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>

                        <div className="infoHolder">
                            <TextField
                                label="Vykon v KW"
                                variant="outlined"
                                className="textLabel"
                                type="number"
                                onChange={handleChange('vykon')}
                                size="small"
                                margin="normal"
                                fullWidth
                                defaultValue={values.vykon ? values.vykon : 0}/>

                            <TextField
                                label="Vek vozidla v rokoch"
                                variant="outlined"
                                className="textLabel"
                                type="number"
                                onChange={handleChange('vek')}
                                size="small"
                                margin="normal"
                                fullWidth
                                defaultValue={values.vek ? values.vek : 0}/>
            
                            <TextField
                                label="Počet najazdených km"
                                variant="outlined"
                                className="textLabel"
                                type="number"
                                onChange={handleChange('pocetkm')}
                                size="small"
                                margin="normal"
                                fullWidth
                                defaultValue={values.pocetkm ? values.pocetkm : 0}/>

                            <TextField
                                label="EČV vozidla"
                                variant="outlined"
                                className="textLabel"
                                type="text"
                                onChange={handleChange('ec')}
                                size="small"
                                margin="normal"
                                fullWidth
                                defaultValue={values.ec ? values.ec : 0}/>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="wrapper">
                        <div className="attachment">
                            <h3 className="definitionName">Poistenie vozidla</h3>
                            <DropzoneArea
                                filesLimit={1}
                                dropzoneText={"Prosím nahrajte potvrdenie o poisteni Vašeho vozidla"}/>
                        </div>

                        <div className="attachment">
                            <h3 className="definitionName">Fotky vozidla</h3>
                            <DropzoneArea
                                filesLimit={1}
                                dropzoneText={"Prosím nahrajte fotky Vašeho vozidla"} />
                        </div>
                    </div>
                    <div className="customButton">
                        <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                        <Button onClick={continueNext} variant="contained" color="primary">Ďalej</Button>
                    </div>
                </div>
            </Container>
        </MuiThemeProvider>
    )
}

export default FormCarInfoDetails;