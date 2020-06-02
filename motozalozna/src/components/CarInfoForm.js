import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {useForm, Controller} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { DevTool } from "react-hook-form-devtools";
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { subscriber, dataService } from '../service/FormDataService';
import Button from '@material-ui/core/Button';
import updateAction from "../service/updateAction";
import { useStateMachine } from "little-state-machine";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'block',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
      margin: '10px'
    },
    // formControl: {
    //     margin: theme.spacing(1),
    //     minWidth: 120,
    //   },
    //   selectEmpty: {
    //     marginTop: theme.spacing(2),
    //   }
  }));

const CarInfoForm = () => {
    const classes = useStyles();
    const [currentPage, setCurrentPage] = React.useState(0);
    const { action, state } = useStateMachine(updateAction);
    const {register, errors, handleSubmit, control} = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            karoseria: state.data.karoseria,
            palivo: state.data.palivo,
            pohon: state.data.pohon,
            prevodovka: state.data.prevodovka,
            vykon: state.data.vykon,
            vek: state.data.vek,
            ec: state.data.ec,
            km: state.data.km
        }
    })

    useEffect(() => {
      console.log(state.data);
      subscriber.subscribe((data) => {
        setCurrentPage(data);
      });
    })

    const handleBack = () => {
      dataService.send(currentPage - 1);
    }

    const handleNext = (data) => {
      action(data);
      dataService.send(currentPage + 1);
    }

    return (
        <Container className={classes.root} maxWidth='md'>
            <DevTool control={control} />
            <CssBaseline />
            <div style={{textAlign: 'center', width: '100%' }}>
                <h1>Údaje o vozidle</h1>
            </div>
            <form onSubmit={handleSubmit(handleNext)}>
            <div style={{display: 'block'}}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="karoseria-label">Typ karosérie</InputLabel>
                    <Controller
                      as = {
                        <Select labelId="karoseria" id="karoseria" className={classes.textField}>
                        <MenuItem value={0}>Hachback / Sedan</MenuItem>
                        <MenuItem value={1}>Kombi</MenuItem>
                    </Select>
                      }
                        name="karoseria"
                        control={control}
                        defaultValue={state.data.karoseria}
                    >

                    </Controller>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="palivo-label">Palivo</InputLabel>
                    <Controller as = {
                      <Select
                        labelId="palivo"
                        className={classes.textField}
                        >
                        <MenuItem value={0}>Benzín</MenuItem>
                        <MenuItem value={1}>Nafta</MenuItem>
                    </Select>
                    } 
                    name="palivo"
                    control={control}
                    defaultValue={state.data.palivo}>
                    </Controller>
                </FormControl>
            </div>

            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="pohon-label">Typ pohonu</InputLabel>
                    <Controller as = {
                      <Select
                        labelId="pohon"
                        className={classes.textField}>
                        <MenuItem value={0}>Jednej nápravy</MenuItem>
                        <MenuItem value={1}>4x4</MenuItem>
                    </Select>
                    }
                    name="pohon"
                    control={control}
                    defaultValue={state.data.pohon}
                    >

                    </Controller>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="prevodovka-label">Prevodovka</InputLabel>
                    <Controller as = {
                      <Select
                        labelId="prevodovka"
                        className={classes.textField}
                        >
                        <MenuItem value={0}>Manuálna</MenuItem>
                        <MenuItem value={1}>Automatická</MenuItem>
                    </Select>
                    }
                    name="prevodovka"
                    control={control}
                    defaultValue={state.data.prevodovka}
                    >

                    </Controller>
                </FormControl>
            </div>

            <div>
              <TextField
                name="vykon"
                label="Výkon v kw"
                variant="outlined"
                error={!!errors.vykon}
                className={classes.textField}
                type="number"
                inputRef={register({required: true})} />

              <TextField
                name="vek"
                label="Vek vozidla v rokoch"
                variant="outlined"
                error={!!errors.vek}
                className={classes.textField}
                type="number"
                inputRef={register({required: true})} />
              </div>

              <div>
              <TextField
                name="km"
                label="Pocet najazdených km"
                variant="outlined"
                error={!!errors.km}
                className={classes.textField}
                type="number"
                inputRef={register({required: true})} />

              <TextField
                name="ec"
                label="ECV Vozidla"
                variant="outlined"
                error={!!errors.ec}
                className={classes.textField}
                type="text"
                inputRef={register({required: true})} />
              </div>

              <div>
                <div>
                  <h2>Poistenie vozidla</h2>
                  <DropzoneArea
                    filesLimit="1"
                    dropzoneText={"Prosím nahrajte potvrdenie o poisteni Vašeho vozidla"}
                    />
                </div>
                <div>
                  <h2>Fotky vozidla</h2>
                  <DropzoneArea
                    filesLimit="10"
                    dropzoneText={"Prosím nahrajte fotky Vašeho vozidla"}
                    />
                </div>
              </div>
              <Button onClick={handleBack} className={classes.backButton} >Späť</Button>
              <Button type="submit" variant="contained" color="primary">Ďalej</Button>
            </form>
        </Container>
    )
}

export default CarInfoForm
