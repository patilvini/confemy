import { useState } from 'react'
import { useSelector } from 'react-redux'
import './profilepage.scss'
import Passes from "./Passes"
import SavedConfs from './SavedConfs'

export default function UserProfileNav (){
    const user = useSelector((state)=>state.auth?.user)

    const [component, setComponent] = useState(<Passes/>)


    


    return (
        <div>
            <div className='profile-page-wrapper'>
            <div className='profile-name'>

            <h1 className='profile-name'>{user?.firstName} {user?.lastName}</h1>
            <span style={{marginBottom: '9.6rem'}} className='caption-2-regular-gray3'>{user?.email}, {user?.profession}</span>

            <div className='buttons-profile'>
                <button onClick={()=>setComponent(<Passes/>)} className='button-text'>Passes</button>
                <button onClick={()=>setComponent(<SavedConfs/>)} className='button-text'>Saved Conference</button>
                <button onClick={()=>setComponent(<div>hello</div>)} className='button-text'>Credits</button>
              
            </div>

           



            </div>
            
           
        </div>
        {component}

        </div>
        
    )
}