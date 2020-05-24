import React from 'react';
import MultiStep from 'react-multistep';
import PersonalInfoForm from './PersonalInfoForm';
import CarInfoForm from './CarInfoForm';
import CarConditionForm from './CarConditionForm';
import RentTypeForm from './RentTypeForm';


function MainPage() {

    const steps = [
        {name: 'Osobne udaje', component: <PersonalInfoForm />},
        {name: 'Udaje o vozidle', component: <CarInfoForm />},
        {name: 'Stav vozidla', component: <CarConditionForm />},
        {name: 'Typ pozicky', component: <RentTypeForm />}
    ]

    let userForm = {
        firstName: '',
        lastName: '',
        
    }

    return (
        <div>
            <MultiStep showNavigation={true} steps={steps}/>
        </div>
    )
}

export default MainPage
