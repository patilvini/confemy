import Switch from "../../components/switch/Switch";

export default function GuestDetails({ indx, guest, onInputChange }) {
  return (
    <>
      {/* <h4 className="color-primary mb-24"> {guest.name}</h4> */}
      <h4 className="color-primary mb-24">
        Guest {indx + 1} · {guest?.name}
      </h4>
      <div style={{ width: "83.2rem" }} className="grid-col-2 mb-32 ">
        <div className="grid-1st-col">
          <div className="form-type-3">
            <input
              type="text"
              placeholder="First name*"
              name="firstName"
              value={guest.firstName}
              onChange={(e) => onInputChange(e, guest)}
            />
          </div>
        </div>
        <div className="grid-2nd-col">
          <div className="form-type-3">
            <input
              type="text"
              placeholder="Last name*"
              name="lastName"
              value={guest.lastName}
              onChange={(e) => onInputChange(e, guest)}
            />
          </div>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <div className="form-type-3">
            <input
              type="email"
              placeholder="Email*"
              name="email"
              value={guest.email}
              onChange={(e) => onInputChange(e, guest)}
            />
          </div>
        </div>
        <div className="grid-1st-col">
          <div className="form-type-3">
            <input
              type="text"
              placeholder="Country code"
              name="countryCode"
              value={guest.countryCode}
              onChange={(e) => onInputChange(e, guest)}
            />
          </div>
        </div>
        <div className="grid-2nd-col">
          <div className="form-type-3">
            <input
              type="text"
              placeholder="Mobile"
              name="mobile"
              value={guest.mobile}
              onChange={(e) => onInputChange(e, guest)}
            />
          </div>
        </div>
      </div>
      <div className="flex-vc ">
        <label htmlFor="whatsApp" className="caption-2-bold-cblack mr-24">
          Send e-tickets on Whatsapp on this Mobile
        </label>
        <Switch
          id="whatsApp"
          name="whatsApp"
          value="whatsApp"
          checked={guest.whatsApp}
          onChange={(e) => onInputChange(e, guest)}
          disable={false}
        />
      </div>
    </>
  );
}
