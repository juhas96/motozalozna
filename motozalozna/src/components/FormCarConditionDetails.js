import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import '../css/formPT.css'
import '../css/uniform.css'

const FormCarConditionDetails = (props) =>  {

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
                    <h1>Stav vozidla</h1>
                </div>
                    <div className="wrapper" style={{'textAlign': "center"}}>
                        <div className="descriptionLabel">
                            <h3>Má Vaše vozidlo tieto poškodenia?</h3>
                        </div>
                        <FormControl>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodeny_lak ? true : false} onChange={handleChange('poskodeny_lak')} />
                                    }
                                    label="Poškodený lak"
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodena_karoseria ? true : false} onChange={handleChange('poskodena_karoseria')} />
                                    }
                                    label="Poškodená karoséria"
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodeny_interier ? true : false} onChange={handleChange('poskodeny_interier')} />
                                    }
                                    label="Poškodený interiér"
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.opotrebena_naprava ? true : false} onChange={handleChange('opotrebena_naprava')} />
                                    }
                                    label="Opotrebená náprava"
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.opotrebene_pneu ? true : false} onChange={handleChange('opotrebene_pneu')} />
                                    }
                                    label="Opotrebené pneumatiky"
                                />
                            </div>

                            <div className="checker-2">
                                <FormControlLabel
                                    control={
                                        <Checkbox color="primary" checked={values.poskodene_sklo ? true : false} onChange={handleChange('poskodene_sklo')} />
                                    }
                                    label="Poškodené čelné sklo"
                                />
                            </div>

                        </FormControl>
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

export default FormCarConditionDetails;