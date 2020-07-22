import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap'
import { Select, MenuItem, InputLabel, FormControl, FormControlLabel, Container, Button, TextField, CircularProgress, Fade, Box, Checkbox } from '@material-ui/core/'
import { Autocomplete } from '@material-ui/lab';
import { findPrice, checkStolen } from '../service/HttpService';
import cars from '../cars.json'
//FORM CSS
import '../css/formCarInfoDetails.css'
import '../css/uniformForm.css'

import '../css/uniform.css'

const FormCarInfoDetails = (props) =>  {

    const { values, handleState, handleFiles, handlePushLast, handleChange } = props;

    var regexECV = /^([A-Z]{2}[0-9]{3}[A-Z]{2})+$/
    var regexCustom = /^([A-Z]{2}[A-Z]{5})$/
    var regexNumbers = /^([A-Z]{2}[0-9]{5})$/

    const [ loading, setLoading ] = useState(false)

    const [ KWError, setKWError ] = useState(false)
    const [ YOError, setYOError ] = useState(false)
    const [ KMError, setKMError ] = useState(false)
    const [ ECVError, setECVError ] = useState(false)

    const year = new Date().getFullYear();
    const years = Array.from(new Array(40), (val, index) => index - year);

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
        if(KWError + YOError + KMError + ECVError === 0 && values.auto) {
            
            setLoading(true)

            var skoda = values.poskodena_karoseria + values.poskodene_sklo + values.poskodeny_interier + values.opotrebena_naprava + values.opotrebene_pneu + values.poskodeny_lak
            skoda = skoda*300


            // var cena = values.cena - skoda
            // props.handleState('cena', cena)

            // var maximum = ((cena / 100.0) * 40.0).toFixed(0)

            // props.handleState('cenaPozicky', maximum)
            // props.handleState('vysledna_pozicka', maximum)

            cars.map((value, index) => {
                if(value.key == values.auto) {
                    handleState('autoIndex', index)
                    return;
                }
            })

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
                var cena = res.data - skoda
                props.handleState('cena', cena)
                var maximum = ((cena / 100.0) * 40.0).toFixed(0)

                props.handleState('cenaPozicky', maximum)
                props.handleState('vysledna_pozicka', maximum)
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
            default:
                break;
        }
    }

    function handleCar(value) {
        if(value != undefined)
            handleState('auto', value.key);
    }

    function handleVozidlo(e) {
        if(values.vozidloFiles && e.target.files.length == 1)
            handlePushLast(e.target.files[0])
        else if(values.vozidloFiles)
            handlePushLast(e.target.files)
        else
            handleState('vozidloFiles', e.target.files)
    }

    const styleButtons = () => {
        if(!loading) 
            return (
                <div className="customButton">
                    <div>
                        {/* <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button> */}
                        <Button type="submit" variant="contained" color="primary">Ďalej</Button>
                    </div>
                </div> 
            )

        return (
            <div className="customButton">
                <div>
                    <Fade in={loading}>
                        <CircularProgress />
                    </Fade>
                </div>
            </div>
        )
    }

    const carConditionDetails = () => {
        return (
            <div>
                <div className="wrapper" style={{'textAlign': "center"}}>
                    <div className="descriptionLabel">
                        <h2>Má Vaše vozidlo tieto poškodenia?</h2>
                    </div>
                    <FormControl>
                        <div className="checker-2">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.poskodeny_lak ?? false} onChange={handleChange('poskodeny_lak')} />
                                }
                                label= {
                                    <Box component="div" >
                                        Poškodený lak
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker-2">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.poskodena_karoseria ?? false} onChange={handleChange('poskodena_karoseria')} />
                                }
                                label= {
                                    <Box component="div">
                                        Poškodená karoséria
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker-2">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.poskodeny_interier ?? false} onChange={handleChange('poskodeny_interier')} />
                                }
                                label= {
                                    <Box component="div">
                                        Poškodený interiér
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker-2">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.opotrebena_naprava ?? false} onChange={handleChange('opotrebena_naprava')} />
                                }
                                label= {
                                    <Box component="div">
                                        Opotrebená náprava
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker-2">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.opotrebene_pneu ?? false} onChange={handleChange('opotrebene_pneu')} />
                                }
                                label= {
                                    <Box component="div">
                                        Opotrebené pneumatiky
                                    </Box>
                                }
                            />
                        </div>

                        <div className="checker-2">
                            <FormControlLabel
                                control={
                                    <Checkbox color="primary" checked={values.poskodene_sklo ?? false} onChange={handleChange('poskodene_sklo')} />
                                }
                                label= {
                                    <Box component="div">
                                        Poškodené čelné sklo
                                    </Box>
                                }
                            />
                        </div>
                    </FormControl>
                </div>
            </div>
    )
    }
    
    return (
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
                                                value={values.karoseria ?? ''}>
                                                <MenuItem value={1}>Hachback / Sedan</MenuItem>
                                                <MenuItem value={0}>Kombi</MenuItem>
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
                                                value={values.palivo ?? ''}>
                                                <MenuItem value={1}>Benzín</MenuItem>
                                                <MenuItem value={0}>Nafta</MenuItem>
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
                                                value={values.pohon ?? ''}>
                                                <MenuItem value={1}>Jednej nápravy</MenuItem>
                                                <MenuItem value={0}>4x4</MenuItem>
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
                                                value={values.prevodovka ?? ''}>
                                                <MenuItem value={0}>Manuálna</MenuItem>
                                                <MenuItem value={1}>Automatická</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-offset-2 topCol">
                                        <FormControl className="form">
                                            <InputLabel id="vykon-label">Výkon v KW</InputLabel>
                                            <Select
                                                required = {true}
                                                labelId="vykon"
                                                id="vykon"
                                                error={KWError}
                                                style={{width: '25ch'}}
                                                onChange={e => handleState('vykon', e.target.value)}
                                                value={values.vykon ?? ''}>
                                                <MenuItem value={44}>do 44 kW (60 PS)</MenuItem>
                                                <MenuItem value={45}>45 - 56 kW (61 - 76 PS)</MenuItem>
                                                <MenuItem value={56}>56 - 67 kW (76 - 91 PS)</MenuItem>
                                                <MenuItem value={67}>67 - 85 kW (91 - 116 PS)</MenuItem>
                                                <MenuItem value={85}>85 - 96 kW (116 - 131 PS)</MenuItem>
                                                <MenuItem value={96}>96 - 111 kW (131 - 151 PS)</MenuItem>
                                                <MenuItem value={111}>111 - 148 kW (151 - 201 PS)</MenuItem>
                                                <MenuItem value={148}>148 - 184 kW (201 - 250 PS)</MenuItem>
                                                <MenuItem value={184}>184 - 223 kW (250 - 303 PS)</MenuItem>
                                                <MenuItem value={223}>223 - 262 kW (303 - 358 PS)</MenuItem>
                                                <MenuItem value={262}>262 - 297 kW (358 - 404 PS)</MenuItem>
                                                <MenuItem value={297}>297 - 334 kW (404 - 454 PS)</MenuItem>
                                                <MenuItem value={334}>viac ako 334 kW (viac ako 454 PS)</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div className="col-md-3 topCol">
                                        <FormControl className="form">
                                            <InputLabel id="vek-label">Rok výroby vozidla</InputLabel>
                                            <Select
                                                required = {true}
                                                style={{width: '25ch'}}
                                                labelId="vek"
                                                id="vek"
                                                error={YOError}
                                                onChange={e => handleState('vek', e.target.value)}
                                                value={values.vek ?? ''}>
                                                {years.map((year, index) => {
                                                    return <MenuItem key={index} value={index}>{year.toString().replace('-','')}</MenuItem>
                                                })}
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

                                {/* <TextField
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
                                    defaultValue={values.vykon ?? null}/> */}

                                {/* <TextField
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
                                    defaultValue={values.vek ?? null}/> */}
                
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
                                    defaultValue={values.pocetkm ?? null}/>

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
                                    defaultValue={values.ec ?? ''}/>
                            </div>
                        </div>

                        <div className="divider"></div>
                        {/* <div className="wrapper">
                            <div className="attachment">
                                <h2 className="definitionName">Poistenie vozidla</h2>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFile" onChange={(e) => handleState('poistenieFile', e.target.files[0])}/>
                                    <label id="vodicsky" className="custom-file-label" htmlFor="customFile">Choose file</label>
                                </div>

                                    {handleFiles(values.poistenieFile, 'poistenieFile')}
                            </div>

                            <div className="attachment">
                                <h2 className="definitionName">Fotky vozidla</h2>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFile" multiple onChange={(e) => handleVozidlo(e)}/>
                                    <label id="vodicsky" className="custom-file-label" htmlFor="customFile">Choose file</label>
                                </div>
                                    {handleFiles(values.vozidloFiles, 'vozidloFiles')}
                            </div>
                        </div> */}

                        {carConditionDetails()}

                        {styleButtons()}
                    </Form>
                </div>
            </Container>
        //</MuiThemeProvider> 
    )
}

export default FormCarInfoDetails;