

import { useState } from "react";
import LiveStreamForm from "./LiveStreamForm";

import './liveStream.scss'






export default function LiveStream(){

   const [activeTab, setActiveTab] = useState(null);
   const [visibility, setVisibility] = useState(false);

   const tabs = ["Google Meet", "Connect Zoom", "Vimeo Live", "Youtube Live", "Facebook Live"];

    return(
        <div className="conf-form-wrap">

<LiveStreamForm source={activeTab} style={{display: visibility ? 'initial' : 'none'}}/>


        <ul className="flex-container">
            {tabs.map((item, index)=>{
                return(<li className="list" key={index}>
                    <button className="buttons" onClick={()=>{
                        if(activeTab===null || activeTab!==tabs[index]){
                            setActiveTab(tabs[index]);
                            setVisibility(true);
                        } else if (activeTab===tabs[index]){
                            setActiveTab(null);
                            setVisibility(false);
                        }
                    }}>{item}</button>
                </li>)

            })}
            
            
        </ul>
        
        </div>
    )
}