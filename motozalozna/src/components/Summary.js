import React, { useEffect,  } from 'react';
import { FormControl, Container, Button } from '@material-ui/core/';
// import { Form } from 'react-bootstrap'

import '../css/formPT.css'
import '../css/uniform.css'
import { sendData } from '../service/HttpService';

const Summary = (props) => {
    
    const { summaryValues, values } = props;

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
        let formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append('files', value, value.name);
            } else if (value instanceof FileList) {
                console.log('FILELIST', value);
            } else {
                formData.set(key.toString(), value);
            }
        })
        sendData(formData);
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    String.prototype.Capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    const getValues = () => { 

        return(
            summaryValues.map((e) => {
                return(
                   <div>
                       <h2 style={{'marginBottom': "20px", "marginTop": "20px"}}>{e.name}</h2>
                       {
                            Object.entries(e.values).map( ([key, value]) =>  {

                                key = key.Capitalize()

                                if(key.includes('_'))
                                key = key.replace('_', " ")
                
                                if(value == true)
                                    value = 'Áno'
                                else if(value == false)
                                    value = 'Nie'
                    
                                switch (key) {
                                    case 'Karoseria':
                                        value == 0 ? value = 'Hatchbag / Sedan' : value = 'Kombi'
                                        break;
                                    case 'Palivo':
                                        value == 0 ? value = 'Benzín' : value = 'Nafta'
                                        break;
                                    case 'Pohon':
                                        value == 0 ? value = 'Jednej nápravy' : value = '4x4'
                                        break;
                                    case 'Prevodovka':
                                        value == 0 ? value = 'Manuálna' : value = 'Automatická'
                                        break;
                                    case 'Dlzka pozicky':
                                        if(value == 0)
                                            value = '1 Týždeň 9%'
                                        else if(value == 1)
                                            value = '2 Týždne 15%'
                                        else 
                                            value = 'Mesiac 19%'
                                    default:
                                        break;
                                }

                                return(
                                    <div style={{margin: "auto"}}>
                                        <ul class="list-group" style={{width: "500px"}}>
                                        <li class="list-group-item" style={{'textAlign': "left"}}>{key} - {value}</li>
                                        </ul>
                                    </div>
                                )
                            })
                       }
                   </div>
                )
        }))
    }

    return (
        <Container maxWidth='md' style={{marginBottom: '2%'}}>
            <div className="categoryName">
                <h1>Suhrn</h1>
            </div>
            <div className="wrapper" style={{'textAlign': "center"}}>
                <FormControl>
                    { getValues() }
                </FormControl>
            </div>
            <div className="customButton">
                <Button style={{marginRight: '10px'}} onClick={back} variant="contained" color="primary">Späť</Button>
                <Button onClick={continueNext} variant="contained" color="primary">Potvrdit</Button>
            </div>
        </Container>
    )
}

export default Summary