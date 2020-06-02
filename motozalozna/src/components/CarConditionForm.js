import React, {useEffect, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
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

const CarConditionForm = (props) => {
    const classes = useStyles();
    const [currentPage, setCurrentPage] = React.useState(0);
    const { action, state } = useStateMachine(updateAction);
    const [stateOfCheckboxes, setState] = React.useState({
        poskodeny_lak: state.data.poskodeny_lak,
        poskodena_karoseria: state.data.poskodena_karoseria,
        poskodeny_interier: state.data.poskodeny_interier,
        opotrebena_naprava: state.data.opotrebena_naprava,
        opotrebene_pneu: state.data.opotrebene_pneu,
        poskodene_sklo: state.data.poskodene_sklo
    });

    useEffect(() => {
      subscriber.subscribe((data) => {
        setCurrentPage(data);
      });
    })
  
    const handleBack = () => {
      dataService.send(currentPage - 1);
    }

    const handleNext = (data) => {
      console.log(data);
      // action(data);
      // dataService.send(currentPage + 1);
    }
  

    const {poskodeny_lak, poskodena_karoseria, poskodeny_interier, opotrebena_naprava, opotrebene_pneu, poskodene_sklo} = stateOfCheckboxes;
    const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <Container className={classes.root} maxWidth='md'>
            <CssBaseline />
            <div style={{textAlign: 'center', width: '100%' }}>
                <h1>Stav vozidla</h1>
                <h2>Má Vaše vozidlo tieto poškodenia?</h2>
            </div>
            <form>
            <div style={{display: 'block'}}>
              <FormControl>
                  <FormControlLabel
                    control={<Checkbox checked={poskodeny_lak} onChange={handleChange} name="poskodeny_lak" />}
                    label="Poškodený lak"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={poskodena_karoseria} onChange={handleChange} name="poskodena_karoseria" />}
                    label="Poškodená karoséria"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={poskodeny_interier} onChange={handleChange} name="poskodeny_interier" />}
                    label="Poškodený interiér"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={opotrebena_naprava} onChange={handleChange} name="opotrebena_naprava" />}
                    label="Opotrebená náprava"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={opotrebene_pneu} onChange={handleChange} name="opotrebene_pneu" />}
                    label="Opotrebené pneumatiky"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={poskodene_sklo} onChange={handleChange} name="poskodene_sklo" />}
                    label="Poškodené čelné sklo"
                  />

              </FormControl>
              </div>
              <Button onClick={handleBack} className={classes.backButton} >Späť</Button>
              <Button variant="contained" color="primary" onClick={(e) => handleNext(e)}>Ďalej</Button>
            </form>
        </Container>
    )
}

export default CarConditionForm
