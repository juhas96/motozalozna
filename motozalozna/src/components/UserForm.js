import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormPersonalDetails from './FormPersonalDetails';
import FormCarInfoDetails from './FormCarInfoDetails';
import FormCarConditionDetails from './FormCarConditionDetails';
import FormPersonalTerms from './FormPersonalTerms';
import FormLoanDetails from './FormLoanDetails';

export class UserForm extends Component {
    state = {
        step: 4,
        karoseria: '', 
        palivo: '',
        pohon: '',
        prevodovka: '',
        vykon: '',
        vek: '',
        ec: '',
        pocetkm: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: 0,
        poskodeny_lak: false,
        poskodena_karoseria: false,
        poskodeny_interier: false,
        opotrebena_naprava: false,
        opotrebene_pneu: false,
        poskodene_sklo: false,
        leasing: false,
        kluc: false,
        notar: false,
        blokacia: false,
        zalozne_pravo: '',
        dlzka_pozicky: '',
        cena: 0,
    };

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    // Proceed to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    // Handle input change
    handleChange = input => e => {
      console.log(e.target.value)
        this.setState({ [input]: e.target.value || e.target.checked });
    }

    // handleState = (name, data) => {
    //   this.setState({
    //     'cena': 'helo'
    //   }, function() {
    //     console.log(this.state)
    //   })
    // }

    getStepContent = (stepIndex, values) => {
      switch (stepIndex) {
        case 0:
          return <FormPersonalDetails
                      nextStep={this.nextStep}
                      handleChange={this.handleChange}
                      values={values}/>;
        case 1:
          return <FormCarInfoDetails
                      nextStep={this.nextStep}
                      prevStep={this.prevStep}
                      handleChange={this.handleChange}
                      values={values}/>;
        case 2:
          return <FormCarConditionDetails
                      nextStep={this.nextStep}
                      prevStep={this.prevStep}
                      handleChange={this.handleChange}
                      values={values}/>;
        case 3:
          return <FormPersonalTerms
                      nextStep={this.nextStep}
                      prevStep={this.prevStep}
                      handleChange={this.handleChange}
                      values={values}/>;
        case 4:
          return <FormLoanDetails
                      prevStep={this.prevStep}
                      handleChange={this.handleChange}
                      values={values}/>;
        default:
          return 'Unknown stepIndex';
      }
    }

    render() {
        // const classes = useStyles();
        const steps = getSteps();
        const { step } = this.state;
        const { karoseria, palivo, pohon, prevodovka, vykon,
                vek, ec, pocetkm, firstName, lastName, email, phoneNumber,
                poskodeny_lak, poskodena_karoseria, poskodeny_interier,
                opotrebena_naprava, opotrebene_pneu, poskodene_sklo, leasing, kluc, notar, blokacia, zalozne_pravo, dlzka_pozicky } = this.state;
        const values = { karoseria, palivo, pohon, prevodovka, vykon,
            vek, ec, pocetkm, firstName, lastName, email, phoneNumber,
            poskodeny_lak, poskodena_karoseria, poskodeny_interier,
            opotrebena_naprava, opotrebene_pneu, poskodene_sklo, leasing, kluc, notar, blokacia, zalozne_pravo, dlzka_pozicky };

        return (
            <div>
                <Stepper activeStep={step} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>

                <div>
                    <Typography variant='inherit'>{this.getStepContent(step, values)}</Typography>
                </div>
            </div>
        )
    }

}

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
  
//   function getStepContent(stepIndex, values) {
//     switch (stepIndex) {
//       case 0:
//         return <FormPersonalDetails
//                     nextStep={this.nextStep}
//                     handleChange={this.handleChange}
//                     values={values}/>;
//       case 1:
//         return <h1>TEST2</h1>;
//       case 2:
//         return <h1>TEST3</h1>;
//       case 3:
//         return <h1>TEST4</h1>;
//       case 4:
//         return <h1>TEST5</h1>;
//       default:
//         return 'Unknown stepIndex';
//     }
//   }


export default UserForm;