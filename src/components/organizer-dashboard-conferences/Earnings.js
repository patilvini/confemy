export default function Earnings  () {

const a = [0,0,0,0]

    return( <div>
        <div className="dash-wrapper">


        <h1>Earnings</h1>
        <div className="data-grid">
            <div className="data-container">
            <p className="caption-2-regular-gray3">Net Income</p>
            <h2 style={{padding: "1rem"}}>$20K</h2>


            </div>
            <div className="data-container">
            <p className="caption-2-regular-gray3">Withdrawn</p>
            <h2 style={{padding: "1rem"}}>$15K</h2>

            </div>
            <div className="data-container">

            <p className="caption-2-regular-gray3">Pending Clearance</p>
            <h2 style={{padding: "1rem"}}>$3K</h2>

            </div>
            <div className="data-container">
            <p className="caption-2-regular-gray3">Available for Withdrawl</p>
            <h2 style={{padding: "1.6rem"}}>$2k</h2>

            </div>
        </div>

        <div className="flex-container">
        <h4 style={{alignSelf:"center", marginLeft: "2rem"}} >Withdaw</h4> 
        <button  style={{alignSelf:"center", marginLeft: "2rem"}} className="button button-secondary"> PayPal </button>
        <button  style={{alignSelf:"center", marginLeft: "2rem"}} className="button button-secondary"> Bank Account </button>

        </div>

        

        <div className="overview-table-heading">
    <div className="request-table-item">Date</div>
    <div className="request-table-item">Conference</div>

    <div style={{textAlign:"right"}} className="request-table-item">Tickets Sold</div>

    <div style={{textAlign:"right"}} className="request-table-item">Gross Earnings</div>

   

    
  </div>

  {a.map((item, index)=> {
    return (

        <div className="overview-table" key={index}>
    <div className="request-table-item">12/15/2021</div>
    <div className="request-table-item"><p className="caption-2-regular-gray3">Using Banner Stands To Increase Trade Show Traffic</p></div>

    <div style={{textAlign:"right"}} className="request-table-item"><p style={{fontSize:"2rem"}} className="caption-2-regular-gray3">30/50</p></div>

    <div style={{textAlign:"right"}} className="request-table-item"><p className="caption-2-regular-gray3">$400</p></div>
   
  </div>

    )

  })}

        </div>


    </div>)
}