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



export default function ProfessionSelect({close}){
    return (<>
    <button className="filter-back-button" onClick={close}>
    <BackIcon className="icon-size"/> 
        Filters

    </button>
    
    <Select
                options={options}
                className="select-input"
                onChange={(e) => console.log(e.value)}
              />
    
    </>)
}