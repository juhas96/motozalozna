import React, { Component, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Form } from 'react-bootstrap'
import { Select, MenuItem, InputLabel, FormControl, Container, Button, TextField, CircularProgress, Fade } from '@material-ui/core/'
import { Autocomplete } from '@material-ui/lab';
import { DropzoneArea } from 'material-ui-dropzone';
import { findPrice, checkStolen } from '../service/CarPrice';
import cars from '../cars.json'
//FORM CSS
import '../css/formCarInfoDetails.css'
import '../css/uniformForm.css'

import '../css/uniform.css'

const FormCarInfoDetails = (props) =>  {

    const { values, handleState, handleFiles, handlePushLast } = props;

    var regexECV = /^([A-Z]{2}[0-9]{3}[A-Z]{2})+$/
    var regexCustom = /^([A-Z]{2}[A-Z]{5})$/
    var regexNumbers = /^([A-Z]{2}[0-9]{5})$/

    const [ loading, setLoading ] = useState(false)

    const [ KWError, setKWError ] = useState(false)
    const [ YOError, setYOError ] = useState(false)
    const [ KMError, setKMError ] = useState(false)
    const [ ECVError, setECVError ] = useState(false)

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

        // setLoading(true)

        if(KWError + YOError + KMError + ECVError === 0 && values.auto && values.vozidloFiles && values.poistenieFile) {

            cars.map((value, index) => {
                if(value.key == values.auto) {
                    handleState('autoIndex', index)
                    return;
                }
            })

            console.log(values)

            findPrice({
                karoseria: props.values.karoseria,
                palivo: props.values.palivo,
                pohon: props.values.pohon,
                prevodovka: props.values.prevodovka,
                vykon: props.values.vykon,
                vek: props.values.vek,
                pocetkm: props.values.pocetkm,
                dovezene: 0,
                auto: props.values.auto
            }).then(res => {
                props.handleState('cena', res.data)
            }).catch(err => console.log(err));

            checkStolen({
                ecv: values.ec
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
                    handleState('vykon', value)
                } else 
                    setKWError(true)
                break;
            case 'YO':
                if(value > 0 && value < 100) {
                    setYOError(false)
                    handleState('vek', value)
                } else
                    setYOError(true)
                break;
            case 'KM':
                if(value > 1000 && value < 1000000) {
                    setKMError(false)
                    handleState('pocetkm', value)
                } else
                    setKMError(true)
                break;
            case 'ECV':
                if(regexECV.test(value) || regexCustom.test(value) || regexNumbers.test(value)) {
                    setECVError(false)
                    handleState('ec', value)
                } else 
                    setECVError(true)
                break;
        }
    }

    function handleCar(value) {
        if(value != undefined)
            handleState('auto', value.key);
    }

    function handleVozidlo(e) {
        if(values.vozidloFiles) {
            handlePushLast(e.target.files[0])
        } else {
            handleState('vozidloFiles', e.target.files)
        }
    }
    
    return (
        <MuiThemeProvider>
            <Container maxWidth='md' style={{marginBottom: '2%'}}>
                <div>
                    <Form onSubmit={continueNext} id='form'>
                        <div className="categoryName">
                            <h1>Údaje o vozidle</h1>
                        </div>
                        <div className="wrapper">
                            <h2>Základné informácie</h2>
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
                                <InputLabel style={{'marginTop': "20px", "marginBottom": "10px"}} id="auto">Vyberte si zo {Object.keys(cars).length} aut</InputLabel>
                                <Autocomplete
                                    id="auto"
                                    onChange={(e, value) => { handleCar(value) }}
                                    style={{maxWidth: 300}}
                                    defaultValue = {cars[values.autoIndex]}
                                    className="autoComplete"
                                    options={cars}
                                    getOptionLabel={(option) => option.model}
                                    renderInput={(params) => <TextField {...params} label={"Auto"} variant="outlined" />}
                                    />

                                <TextField
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
                                    defaultValue={values.vykon ?? undefined}/>

                                <TextField
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
                                    defaultValue={values.vek ?? undefined}/>
                
                                <TextField
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
                                    defaultValue={values.pocetkm ?? undefined}/>

                                <TextField
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
                                    defaultValue={values.ec ?? undefined}/>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="wrapper">
                            <div className="attachment">
                                <h2 className="definitionName">Poistenie vozidla</h2>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="customFile" onChange={(e) => handleState('poistenieFile', e.target.files[0])}/>
                                    <label id="vodicsky" class="custom-file-label" for="customFile">Choose file</label>
                                </div>
                                {/* <DropzoneArea
                                    // initialFiles={[values.vodicskyFile.name]}
                                    required = {true}
                                    filesLimit={1}
                                    onChange={(files) => setPoistenie(files)}
                                    dropzoneText={"Prosím nahrajte potvrdenie o poisteni Vašeho vozidla"}/> */}

                                    {handleFiles(values.poistenieFile, 'poistenieFile')}
                            </div>

                            <div className="attachment">
                                <h2 className="definitionName">Fotky vozidla</h2>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="customFile" multiple onChange={(e) => handleVozidlo(e)}/>
                                    <label id="vodicsky" class="custom-file-label" for="customFile">Choose file</label>
                                </div>
                                {/* <DropzoneArea
                                    required = {true}
                                    filesLimit={10}
                                    onChange={(files) => setFotky(files)}
                                    dropzoneText={"Prosím nahrajte fotky Vašeho vozidla"} /> */}
                                    {handleFiles(values.vozidloFiles, 'vozidloFiles')}
                            </div>
                        </div>

                        <div className="customButton">
                            <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                            <Button onClick={continueNext} variant="contained" color="primary">Ďalej</Button>
                        </div>
                    </Form>
                </div>
                {/* <div style={{top: '0px',bottom: '0px',left: '0px',right: '0px', width: '100%',}}>
                    <Fade
                    in={loading}>
                        <CircularProgress />
                    </Fade>
                </div> */}
            </Container>
        </MuiThemeProvider>
    )
}

export default FormCarInfoDetails;