import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {useForm, Controller} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { DevTool } from "react-hook-form-devtools";
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import updateAction from "../service/updateAction";
import { useStateMachine } from "little-state-machine";
import Button from '@material-ui/core/Button';
import { subscriber, dataService } from '../service/FormDataService';

const PersonalTermsForm = () => {
    return (
        <h1>Works</h1>
    )
}



export default PersonalTermsForm