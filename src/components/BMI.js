import React, {useState} from 'react'
import BmiCalculator from './BmiCalculator'

const BMI = () => {

    const [bmiValue,setBmiValue] = useState(0);

    const getBmiClass =bmi => {
        if(bmi>=1 && bmi<=18.5) return 'Underweight';
        if(bmi>=18.5 && bmi<=25) return 'Normal weight';
        if(bmi>=25.5 && bmi<=29) return 'Overweight';
        if(bmi >30) return 'Obese';
    }
  const bmicategory = getBmiClass(bmiValue);

  const bmiBackgraound=bmi =>{
    if(bmi>=1 && bmi<=18.5) return '#FED88B';
    if(bmi>=18.5 && bmi<=25) return '#80ff80';
    if(bmi>=25.5 && bmi<=29) return '#FF7F50';
    if(bmi >30) return '#FF5411';
  }

let bmiClass = '';
if(bmiValue>0 && bmicategory ){
    bmiClass= bmicategory.split(' ')[0].toLowerCase();
}

    return (
        <>
           <div className="calculator" style={{backgroundColor: bmiBackgraound(bmiValue)}}>
               <h3>
                   Body  Mass Index calculator
               </h3>
               <div className="bmi-result-container">
                   <div className="bmi-result">
                       <div className="bmi-result-number">
                           Body Mass Index (BMI) = {bmiValue}
                       </div>
                       <div className={`bmi-category ${bmiClass}`}>
                           {bmicategory}
                       </div>
                   </div>
               </div>
               <BmiCalculator getBmiValue ={setBmiValue}/>
           </div>
        </>
    )
}

export default BMI;