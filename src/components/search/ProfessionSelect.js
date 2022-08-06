import { useState } from "react";
import Select from "react-select";
import BackIcon from "../icons/BackIcon";

const options = [
    { value: "Physician", label: "Physician" },
    { value: "PhysicianAssistant", label: "Physician Assistant" },
    { value: "NursePractitioner", label: "Nurse Practitioner" },
    { value: "Dentist", label: "Dentist" },
    { value: "Nurse", label: "Nurse" },
    { value: "Pharmacist", label: "Pharmacist" },
    { value: "PhysicalTherapist", label: "Physical Therapist" },
    { value: "OccupationalTherapist", label: "Occupational Therapist" },
    { value: "SpeechTherapist", label: "Speech Therapist" },
    { value: "RespiratoryTherapist", label: "Respiratory Therapist" },
    { value: "Dietitian", label: "Dietitian" },
    { value: "SocialWorker", label: "Social Worker" },
    { value: "CaseManagement", label: "Case Management" },
    { value: "Other", label: "Other" },
  ];



export default function ProfessionSelect({close, setValue}){

  const [profession, setProfession] = useState()
  const [error, setError] = useState()


  


    return (<div className="filter-component">
    <div className="flex-container filter-back-button" onClick={close}>
        <div><BackIcon fill="#757575" className="filter-icon" /></div>
        <div style={{marginTop:".7rem"}}> Filters</div>
        
       
      </div>

    <h3 className="component-title">Profession</h3>
    
    <Select
                options={options}
                className="select-input"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: '#4cb944',
                    primary: '#08415c',
                  },
                })}
                onChange={(e) => setProfession(e)}
              />
    <p style={{ color: "red", paddingBottom: "1rem" }}>{error}</p>
    <button className="button button-green" onClick={()=>{

      if(profession){
        setValue(profession)
        close()

      }else {
        setError("Please select a Profession")
      }
      

    }}>Set</button>
    
    </div>)
}