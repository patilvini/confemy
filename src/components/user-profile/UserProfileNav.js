import { useSelector } from 'react-redux'
import './profilepage.scss'

export default function UserProfileNav (){
    const user = useSelector((state)=>state.auth?.user)
    console.log(user)


    return (
        <div className='profile-page-wrapper'>
            <div className='profile-name'>

            <h1 className='profile-name'>{user?.firstName} {user?.lastName}</h1>
            <span style={{marginBottom: '9.6rem'}} className='caption-2-regular-gray3'>{user?.email}, Dentist</span>

            <div className='buttons-profile'>
                <button className='button-text'>Passes</button>
                <button className='button-text'>Saved Conference</button>
                <button className='button-text'>Credits</button>
                <button className='button-text'>Account Settings</button>
            </div>



            </div>
           
        </div>
    )
}