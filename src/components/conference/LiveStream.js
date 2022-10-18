

import { useState } from "react";
import LiveStreamForm from "./LiveStreamForm";

import './liveStream.scss'
// import GoogleIcon from "../icons/GoogleIcon";
import ZoomLogo from "../icons/ZoomLogo";
import GoogleMeetIcon from "../icons/GoogleMeetIcon";
import VimeoIcon from "../icons/VimeoIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import FacebookIcon from "../icons/FacebookIcon";






export default function LiveStream(){

   const [activeTab, setActiveTab] = useState(null);
   const [visibility, setVisibility] = useState(false);


   const tabs = [{name : "Zoom", icon:<ZoomLogo/>}, {name : "Google Meet", icon:<GoogleMeetIcon/>}, {name : "Vimeo", icon:<VimeoIcon/>}, {name : "Youtube Live", icon:<YoutubeIcon/>}, {name : "Facebook", icon:<FacebookIcon/>}];

    return(
        <div >

<div className="flex-container" >
            
            {tabs.map((item, index)=>{
                    return(<div key={index}>
                        <button className="buttons-livestream" onClick={()=>{
                            if(activeTab===null || activeTab!==tabs[index]){
                                setActiveTab(tabs[index]);
                                setVisibility(true);
                            } else if (activeTab===tabs[index]){
                                setActiveTab(null);
                                setVisibility(false);
                            }
                        }}>{item.icon}</button>
                    </div>)
    
                })}
            </div>

<LiveStreamForm source={activeTab} style={{display: visibility ? 'initial' : 'none'}}/>


      

 
        
       
           
            
            
        </div>
        
      
    )
}