import React from "react";
import { Slider, TextField, InputLabel } from "@material-ui/core/";
import { Row } from 'react-bootstrap'

import '../css/formLoadDetails.css'
import '../css/uniform.css'

export default function DiscreteSlider({ values, handleChange, max }) {
	const [value, setValue] = React.useState(values.cena);
  
	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};
  
	function valueText(value) {
        return `${value}€`;
	}
	
	const handleInputChange = event => {
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
					step={1}
					min={0}
					max={max}
					onChangeCommitted={(event, value) =>
						handleChange("areaSpace")({ target: { value } })
					}
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
						"aria-labelledby": "input-slider"
					}}
				/>
			</div>

	</Row>
	);
  }
  