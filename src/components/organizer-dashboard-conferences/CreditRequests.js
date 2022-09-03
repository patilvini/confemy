export default function CreditRequests () {

    const a = [0,0,0]
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

  {a.map((item, index)=> {
    return (

        <div className="request-table" key={index}>
    <div className="request-table-item">Mohamad Ali Khan</div>
    <div className="request-table-item"><p className="caption-2-regular-gray3">Future of innovation in medicines after COVID-19</p></div>

    <div className="request-table-item"><p style={{fontSize:"2rem"}} className="caption-2-regular-gray3">AMA cat 1</p></div>

    <div className="request-table-item"><p className="caption-2-regular-gray3">3</p></div>
    <div className="request-table-item"> <p className="caption-2-regular-gray3">Upload Certificate</p></div>

    
  </div>

    )

  })}

  


  </div>

    </div>
}