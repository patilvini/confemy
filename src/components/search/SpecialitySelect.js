import { useState } from "react";
import Select from "react-select";
import BackIcon from "../icons/BackIcon";

const options = [
    { value: "physician", label: "Physician" },
    { value: "physicianAssistant", label: "Physician Assistant" },
    { value: "nursePractitioner", label: "Nurse Practitioner" },
    { value: "dentist", label: "Dentist" },
    { value: "nurse", label: "Nurse" },
    { value: "pharmacist", label: "Pharmacist" },
    { value: "physicalTherapist", label: "Physical Therapist" },
    { value: "occupationalTherapist", label: "Occupational Therapist" },
    { value: "speechTherapist", label: "Speech Therapist" },
    { value: "respiratoryTherapist", label: "Respiratory Therapist" },
    { value: "dietitian", label: "Dietitian" },
    { value: "socialWorker", label: "Social Worker" },
    { value: "caseManagement", label: "Case Management" },
    { value: "other", label: "Other" },
  ];



export default function SpecialitySelect({close, setValue}){

  const [selected, setSelected] = useState([])
  const [errorSelect, setErrorSelect] = useState();


  


    return (<div className="filter-component">
    <button className="filter-back-button" onClick={close}>
    <BackIcon fill="#757575" className="filter-icon"/> 
         Filters

    </button>

    <h3 className="component-title">Speciality</h3>
    
    <Select
        isMulti
        options={options}
        className="select-input"
        onChange={(e) => setSelected(e)}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: '#4cb944',
            primary: '#08415c',
            primary25: "#4cb944",
            primary: "#08415c",
          },
        })}
       
        
      />
       <p style={{ color: "red", paddingBottom: "1rem" }}>{errorSelect}</p>

      <button className="button button-green" onClick={()=>{
        
        if (selected.length > 0){
          setValue(selected)
          close()
        } else{
          setErrorSelect("Select at least one Speciality")
        }

        
        
        }}>
        Set
      </button>

    
    </div>)
}