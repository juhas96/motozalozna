import React, { Component, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Form } from 'react-bootstrap'
import { Select, MenuItem, InputLabel, FormControl, Container, Button, TextField } from '@material-ui/core/'
import { Autocomplete } from '@material-ui/lab';
import { DropzoneArea } from 'material-ui-dropzone';
import { findPrice, checkStolen } from '../service/CarPrice';
import cars from '../cars.json'
//FORM CSS
import '../css/formCarInfoDetails.css'
import '../css/uniformForm.css'

import '../css/uniform.css'

const FormCarInfoDetails = (props) =>  {

    const { values, handleChange, handleState } = props;
    const number = 200

    var regexECV = /^([A-Z]{2}[0-9]{3}[A-Z]{2})+$/
    var regexCustom = /^([A-Z]{2}[A-Z]{5})$/
    var regexNumbers = /^([A-Z]{2}[0-9]{5})$/

    const [ kw, setKw ] = useState()
    const [ yo, setYo ] = useState()
    const [ km, setKm ] = useState()
    const [ ecv, setEcv ] = useState()
    const [ auto, setAuto ] = useState()
    const [ poistenie, setPoistenie ] = useState()
    const [ fotky, setFotky ] = useState()
    // const [ index, setIndex ] = useState()

    const [ KWError, setKWError ] = useState(false)
    const [ YOError, setYOError ] = useState(false)
    const [ KMError, setKMError ] = useState(false)
    const [ ECVError, setECVError ] = useState(false)

    useEffect(() => {
        setKw(values.vykon)
        setYo(values.vek)
        setKm(values.pocetkm)
        setEcv(values.ec)

        console.log(values)

        setTimeout(function () {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }, 25);

    }, [setKm, setKw, setEcv, setYo]) 

    const continueNext = e => {
        e.preventDefault();

        if(KWError + YOError + KMError + ECVError === 0 && auto && poistenie != 0 && fotky != 0) {
            handleState('vykon', kw); handleState('vek', yo)
            handleState('pocetkm', km); handleState('ec', ecv)
            handleState('auto', auto);

            findPrice({
                karoseria: props.values.karoseria,
                palivo: props.values.palivo,
                pohon: props.values.pohon,
                prevodovka: props.values.prevodovka,
                vykon: kw,
                vek: yo,
                pocetkm: km,
                dovezene: 0,
                auto: auto
            }).then(res => {
                props.handleState('cena', res.data)
            }).catch(err => console.log(err));

            checkStolen({
                ecv: ecv
            }).then(res => res.data == 0 ? props.nextStep() : console.log('stolen')).catch(err => console.log(err));
        }
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    function handleCheck(e) {
        var value = e.target.value

        switch(e.target.name) {
            case 'KW':
                if((1000 > value) && (value > 10)) {
                    setKWError(false)
                    setKw(value)
                } else 
                    setKWError(true)
                break;
            case 'YO':
                if(value > 0 && value < 100) {
                    setYOError(false)
                    setYo(value)
                } else
                    setYOError(true)
                break;
            case 'KM':
                if(value > 1000 && value < 1000000) {
                    setKMError(false)
                    setKm(value)
                } else
                    setKMError(true)
                break;
            case 'ECV':
                if(regexECV.test(value) || regexCustom.test(value) || regexNumbers.test(value)) {
                    setECVError(false)
                    setEcv(value)
                } else 
                    setECVError(true)
                break;
        }
    }

    // function handleValue() {
    //     cars.map((value, index) => {
    //         if(value.key == values.auto) {
    //             setIndex(index)
    //             return;
    //         }
    //     })
    // }
    
    return (
        <MuiThemeProvider>
            <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div>
                    <Form onSubmit={continueNext}>
                        <div className="categoryName">
                            <h1>Údaje o vozidle</h1>
                        </div>
                        <div className="wrapper">
                            <h2>Zákaldne informácie</h2>
                            <div className="controlForm">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-offset-2 topCol">
                                        <FormControl className="form">
                                            <InputLabel id="karoseria-label">Typ karosérie</InputLabel>
                                            <Select
                                                required = {true}
                                                style={{width: '25ch'}}
                                                labelId="karoseria"
                                                id="karoseria"
                                                onChange={e => handleState('karoseria', e.target.value)}
                                                defaultValue={values.karoseria ?? undefined}>
                                                <MenuItem value={0}>Hachback / Sedan</MenuItem>
                                                <MenuItem value={1}>Kombi</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                        
                                    <div className="col-md-3 topCol">
                                        <FormControl className="form">
                                            <InputLabel id="palivo-label">Palivo</InputLabel>
                                            <Select
                                                required = {true}
                                                style={{width: '25ch'}}
                                                labelId="palivo"
                                                id="palivo"
                                                onChange={e => handleState('palivo', e.target.value)}
                                                defaultValue={values.palivo ?? undefined}>
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
                                                required = {true}
                                                style={{width: '25ch'}}
                                                labelId="pohon"
                                                id="pohon"
                                                onChange={e => handleState('pohon', e.target.value)}
                                                defaultValue={values.pohon ?? undefined}>
                                                <MenuItem value={0}>Jednej nápravy</MenuItem>
                                                <MenuItem value={1}>4x4</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div className="col-md-3 topCol">
                                        <FormControl className="form">
                                            <InputLabel id="prevodovka-label">Prevodovka</InputLabel>
                                            <Select
                                                required = {true}
                                                style={{width: '25ch'}}
                                                labelId="prevodovka"
                                                id="prevodovka"
                                                onChange={e => handleState('prevodovka', e.target.value)}
                                                defaultValue={values.prevodovka ?? undefined}>
                                                <MenuItem value={0}>Manuálna</MenuItem>
                                                <MenuItem value={1}>Automatická</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>

                            <div className="infoHolder">
                                <InputLabel style={{'marginTop': "20px", "marginBottom": "10px"}} id="auto">Vyberte si z {number} aut</InputLabel>
                                <Autocomplete
                                    id="auto"
                                    onChange={(e, value) => { setAuto(value.key) }}
                                    style={{maxWidth: 300}}
                                    className="autoComplete"
                                    options={cars}
                      
                                    getOptionLabel={(option) => option.model}
                                    renderInput={(params) => <TextField {...params} label={"Auto"} variant="outlined" />}
                                    />

                                <TextField
                                    inputProps={{style: {fontSize: 22.0}}}
                                    required = {true}
                                    name = "KW"
                                    label="Vykon v KW"
                                    variant="outlined"
                                    className="textLabel"
                                    type="number"
                                    error={KWError}
                                    onChange={e => handleCheck(e)}
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={values.vykon ? values.vykon : undefined}/>

                                <TextField
                                    inputProps={{style: {fontSize: 22.0}}}
                                    required = {true}
                                    name = "YO"
                                    label="Vek vozidla v rokoch"
                                    variant="outlined"
                                    className="textLabel"
                                    type="number"
                                    error={YOError}
                                    onChange={e => handleCheck(e)}
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={values.vek ? values.vek : undefined}/>
                
                                <TextField
                                    inputProps={{style: {fontSize: 22.0}}}
                                    required = {true}
                                    name = "KM"
                                    label="Počet najazdených km"
                                    variant="outlined"
                                    className="textLabel"
                                    type="number"
                                    error={KMError}
                                    onChange={e => handleCheck(e)}
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={values.pocetkm ? values.pocetkm : undefined}/>

                                <TextField
                                    inputProps={{style: {fontSize: 22.0}}}
                                    required = {true}
                                    name = "ECV"
                                    label="EČV vozidla"
                                    variant="outlined"
                                    className="textLabel"
                                    type="text"
                                    error={ECVError}
                                    onChange={e => handleCheck(e)}
                                    size="small"
                                    margin="normal"
                                    fullWidth
                                    defaultValue={values.ec ? values.ec : undefined}/>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="wrapper">
                            <div className="attachment">
                                <h2 className="definitionName">Poistenie vozidla</h2>
                                <DropzoneArea
                                    required = {true}
                                    filesLimit={1}
                                    onChange={(files) => setPoistenie(files)}
                                    dropzoneText={"Prosím nahrajte potvrdenie o poisteni Vašeho vozidla"}/>
                            </div>

                            <div className="attachment">
                                <h2 className="definitionName">Fotky vozidla</h2>
                                <DropzoneArea
                                    required = {true}
                                    filesLimit={10}
                                    onChange={(files) => setFotky(files)}
                                    dropzoneText={"Prosím nahrajte fotky Vašeho vozidla"} />
                            </div>
                        </div>

                        <div className="customButton">
                            <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                            <Button type='submit' variant="contained" color="primary">Ďalej</Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </MuiThemeProvider>
    )
}

export default FormCarInfoDetails;