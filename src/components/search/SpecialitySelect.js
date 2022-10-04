import { useState } from "react";
import Select from "react-select";
import BackIcon from "../icons/BackIcon";

const options = [
    { value: "Cardiology", label: "Cardiology" },
    { value: "Oncologist", label: "Oncologist" },
    { value: "Orhtopedics", label: "Orthopedics" },
    { value: "Paramedics", label: "Paramedics" },
    
  ];



export default function SpecialitySelect({close, setValue}){

  const [selected, setSelected] = useState([])
  const [errorSelect, setErrorSelect] = useState();


  


    return (<div className="filter-component">
    <div className="flex-container filter-back-button" onClick={close}>
        <div><BackIcon fill="#757575" className="filter-icon" /></div>
        <div style={{marginTop:".7rem"}}> Filters</div>
        
       
      </div>

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