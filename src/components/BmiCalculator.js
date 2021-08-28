import React, { useState, useEffect } from 'react'
import FormInput from './FormInput'
import PropTypes from 'prop-types'


const BmiCalculator = props => {

    const {getBmiValue}= props;

const [heightUnit, setHeightUnit]= useState('cm');
const [weightUnit, setWeighttUnit]= useState('kg');
const [unit, setUnit]= useState('Metric');
const [count, setCount]= useState({
    heightCount: '0',
    InchesCount: '0',
    weightCount: '0'
})


const {heightCount, InchesCount, weightCount} = count;

useEffect( () => {
    metricBMI(heightCount, weightCount);
    imperialBMi(heightCount, weightCount, InchesCount)
   // eslint-disable-next-line
}, [heightCount, weightCount, InchesCount]);

    const onChangeInput= e => {
        const {name, value}= e.target;
        
        setCount(prevState => ({ ...prevState,[name]:  value }));


    };

    const onSelectTag = e => {

        setUnit(e.target.value);
        if (e.target.value === 'Metric'){
            setHeightUnit('cm');
            setWeighttUnit('kg');
        } else {
            setHeightUnit('ft');
            setWeighttUnit('lbs');
        }
    };

const metricBMI= (height, weight) => {
    if(height > 0 && weight > 0) {
        const heightToMeter = height/100;
        const bmi = weight/(heightToMeter*heightToMeter);
        getBmiValue(Math.round(bmi));
    }
}

const imperialBMi = (height,weight,inches) =>{
    if (height>0 && weight >0 && inches > 0){


        const heightToInches = (height*12)+parseInt(inches);
        const bmi = 703 * (weight / (heightToInches*heightToInches));
        getBmiValue(Math.round(bmi));

    }
}

   const resetData = e => {
       e.preventDefault();
       getBmiValue(0);
       setUnit('Metric');
       setCount({
        heightCount: '0',
        InchesCount: '0',
        weightCount: '0'
       })
       setHeightUnit('cm');
       setWeighttUnit('kg');
   }

    return (
        <>
            <div className="bmi-inputs">
                <div className="inputs-fields">
                    <div>

                        <span className="label-unit">Unit</span>
                        <div className ="unit">
                            <select 
                                name="unit"
                                value={unit}
                                onChange={onSelectTag}
                                className="form-control form-control-sm"
                            >
                                <option value="Metric">Metric</option>
                                <option value="Imperial">Imperial</option>
                            </select>
                        </div>
                    </div>
                    <FormInput 
                        type="text"
                        name="heightCount"
                        title={`Height (${heightUnit})`}
                        value={heightCount}
                        onChange={onChangeInput}
                    />
                    {
                       unit === 'Imperial' ?
                       <FormInput 
                        type="text"
                        name="InchesCount"
                        title={`Height (${heightUnit})`}
                        value={InchesCount}
                        onChange={onChangeInput}
                    /> : ''
                    }
                    
                    <FormInput 
                        type="text"
                        name="weightCount"
                        title={`weight (${weightUnit})`}
                        value={weightCount}
                        onChange={onChangeInput}
                    />
                </div>
                <button className="button" type="submit" onClick={resetData}>
                    Reset
                </button>
            </div>
        </>
    )
}

BmiCalculator.propTypes={
    getBmiValues: PropTypes.func.isRequired
}
export default BmiCalculator;
