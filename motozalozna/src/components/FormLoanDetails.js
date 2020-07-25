import React,  { useEffect } from 'react';
import { FormControl, FormControlLabel, Checkbox, InputLabel, MenuItem, Select, Typography } from '@material-ui/core/'

import '../css/formLoadDetails.css'
import '../css/uniform.css'

import DiscreteSlider from './DiscreteSlider'

const FormLoanDetails = (props) =>  {

    const { values, handleChange, handleState } = props;
    return (
        <div>
            <div className="wrapper">
                <div className="header">
                    <h2 className='whiterText'>Chcete Vaše vozidlo používať počas záložného práva?</h2>
                    <div className="holder">
                        <div className="confirmCol">
                                <label className="labelConfirm"><span className='whiterText'>Áno, chcem používať svoje vozidlo  - </span></label> 
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox className='orangeCheckbox' checked={values.zalozne_pravo ?? false} onChange={handleChange('zalozne_pravo')} />
                                        }
                                        label="Áno"
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="loanLenght">
                            <InputLabel style={{'marginRight': "10px"}} id="dlzka_pozicky"><span className='whiterText'>Dĺžka pôžičky</span></InputLabel>
                            <FormControl style={{marginRight: '10px'}}>
                                <Select
                                    required = {true}
                                    style={{width: '25ch', "backgroundColor":"white", "height": "50px"}}
                                    labelId="dlzka_pozicky"
                                    id="dlzka_pozicky"
                                    onChange={handleChange('dlzka_pozicky')}
                                    value={values.dlzka_pozicky ?? 0}>
                                    <MenuItem value={0}>1 Týždeň: Úrok {values.zalozne_pravo ? 9 : 3}%</MenuItem>
                                    <MenuItem value={1}>2 Týždeň: Úrok {values.zalozne_pravo ? 15 : 6}%</MenuItem>
                                    <MenuItem value={2}>Mesiac: Úrok {values.zalozne_pravo ? 19 : 12}%</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                </div>
            </div>

            <div className="divider"></div>

            <div className="wrapper">
                <div className="chooseLvl">
                    <Typography id="discrete-slider-custom" gutterBottom variant='inherit'>
                        <h2 className='whiterText'>Vyberte si výšku Vašej pôžičky</h2>
                        <h5 className='whiterText'>Vaše vozidlo bolo ohodnotené na: {values.cena}€</h5>
                        <h5 className='whiterText'>Maximálna výška pôžičky je: {values.cenaPozicky}€</h5>
                    </Typography>
                </div>
                <DiscreteSlider values={values.cenaPozicky} handleChange={handleState} max={values.cenaPozicky}/>
            </div>
        </div>
    )
}

export default FormLoanDetails;