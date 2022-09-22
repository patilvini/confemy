import { useEffect, useState } from "react"
import api from "../../utility/api"
import UploadModal from "./UploadModal"

export default function CreditRequests () {

  const [modalOpen, setModalOpen] = useState(false)
    const [attendee, setAttendee] = useState()
    const [data, setData] = useState()


    useEffect(()=>{
      const getData = async()=> {
          try{
            const r = await api.get("/organizers/conferences/6318cd9c106aaa5e009f7c80")
            console.log(r.data.data.conferenceDetails)
            setData(r.data.data.conferenceDetails)
            
    
          }
          catch(err){
            console.log(err)
          }
        }
    
        
          getData()
        
      },[]

  )

 
    return <div className="dash-wrapper">

<div className="opposite-grid">
            <h1>Credits Requests</h1>
            <div className="grid-item-right">
            {/* <button className='button button-green'>Create Conference </button> */}

            </div>
           

            </div>
             

<div>
  

  <div className="request-table-heading">
    <div className="request-table-item">Name</div>
    <div className="request-table-item">Conference</div>

    <div className="request-table-item">Credit Type</div>

    <div className="request-table-item">Total Credits</div>
    <div></div>

    
  </div>

  {data?.attendees.map((item, index)=> {
    return (

        <div className="request-table" key={index}>
    <div className="request-table-item">{item.user.firstName} {item.user.lastName}</div>
    <div className="request-table-item"><p className="caption-2-regular-gray3">{}</p></div>

    <div className="request-table-item"><p style={{fontSize:"2rem"}} className="caption-2-regular-gray3">AMA cat 1</p></div>

    <div className="request-table-item"><p className="caption-2-regular-gray3">3</p></div>
    <div className="overview-table-item">{!item.creditCertificateUploaded && <button onClick={()=>{
    setModalOpen(true)
    setAttendee(item.user._id)
  }} className="button button-green">Upload Certificate</button>}{item.creditCertificateUploaded && <button className="button button-primary">View Certificate</button>}</div>

    
  </div>

    )

  })}

  


{modalOpen && (
        <UploadModal
        attendee = {attendee}
          onDismiss={() => {
            setModalOpen(false);
          }}
        />
      )}
  </div>

    </div>
}