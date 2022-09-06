import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../utility/api'
import './profilepage.scss'
import SavedConfs from './SavedConfs'



export default function ProfileUserView (){
    const user = useSelector((state)=>state.auth?.user)
    const [component, setComponent]= useState(<SavedConfs/>)
    


    


    return (
        <div>
            <div className='profile-page-wrapper'>
            <div className='profile-name'>

            <h1 className='profile-name'>{user?.firstName} {user?.lastName}</h1>
            <span style={{paddingBottom: '3rem'}} className='caption-2-regular-gray3'>{user?.email}, {user?.profession}</span>
            

            <div className='buttons-profile'>
                <button onClick={()=>setComponent("")} className='button-text'>Upcoming Conferences</button>
                <button onClick={()=>setComponent(<SavedConfs/>)} className='button-text'>Past Conference</button>
                 {/* <button onClick={()=>setComponent(""))} className='button-text'>Credits</button> */}
              
            </div>




           



            </div>
            {component}

           
            
            
           
        </div>
        
        
        

        </div>
        
    )
}