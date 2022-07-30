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



export default function ProfessionSelect({close, setValue}){


  


    return (<>
    <button className="filter-back-button" onClick={close}>
    <BackIcon className="icon-size"/> 
         Filters

    </button>

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
                onChange={(e) => setValue(e)}
              />
    
    </>)
}