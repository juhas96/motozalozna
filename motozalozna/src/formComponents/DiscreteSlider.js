import React from "react";
import { Slider, TextField, InputLabel } from "@material-ui/core/";
import { Row } from 'react-bootstrap'

import './formCss/formLoadDetails.css'
import './formCss/uniform.css'

export default function DiscreteSlider({ values, handleChange, max }) {
	const [value, setValue] = React.useState(values);
  
	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
		handleChange('vysledna_pozicka', newValue)
	};

	const marks = [
        {
            value: 0,
            label: '0€',
        },
        {
            value: max,
            label: `${max}€`,
        }
    ];
  
	function valueText(value) {
        return `${value}€`;
	}
	
	const handleInputChange = event => {
		handleChange('vysledna_pozicka', Number(event.target.value))
		setValue(event.target.value === "" ? "" : Number(event.target.value));

	};
  
	return (
	    <Row className='d-flex justify-content-center'>

			<div className="col-md-6 textField">
				<Slider
					style={{ marginTop: "20px" }}
					value={typeof value === "number" ? value : 0}
					onChange={handleSliderChange}
					getAriaValueText={valueText}
					valueLabelDisplay="auto"
					aria-labelledby="input-slider"
					step={100}
					min={0}
					max={max}
					marks={marks}
					// onChangeCommitted={(event, value) =>
					// 	handleState("cena")({ target: { value } })
					// }
					/>
			</div>

			<div className="col-md-4 slider">
				<InputLabel>Výška pôžičky</InputLabel>
				<TextField
					className="customText"
					value={value}
					onChange={handleInputChange}
					inputProps={{
						step: 1,
						min: 0,
						max: max,
						type: "number",
						"aria-labelledby": "input-slider",
					}}
				/>
			</div>
	</Row>
	);
  }
  