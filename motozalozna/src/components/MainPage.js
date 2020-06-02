import React, { useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import CarInfoForm from './CarInfoForm';
import CarConditionForm from './CarConditionForm';
import PersonalTermsForm from './PersonalTermsForm';
import RentTypeForm from './RentTypeForm';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { subscriber } from '../service/FormDataService';
import updateAction from "../service/updateAction";
import { useStateMachine } from "little-state-machine";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  function getSteps() {
    return ['Osobné údaje', 'Údaje o vozidle', 'Stav vozidla', 'Podmienky', 'Typ pôžičky'];
  }
  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <PersonalInfoForm/>;
      case 1:
        return <CarInfoForm />;
      case 2:
        return <CarConditionForm />;
      case 3:
        return <RentTypeForm />;
      case 4:
        return <PersonalTermsForm />;
      default:
        return 'Unknown stepIndex';
    }
  }

function MainPage() {

    const { state } = useStateMachine(updateAction);

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    useEffect(() => {
      console.log(state.data);
      subscriber.subscribe((data) => {
        setActiveStep(data);
      });
    })

    const handleReset = () => {
      setActiveStep(0);
    };

    return (
        <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Resetovať</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
            </div>
          </div>
        )}
      </div>
    </div>
    )
}

export default MainPage
