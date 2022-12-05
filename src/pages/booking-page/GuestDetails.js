import Guest from "./Guest";
export default function GuestDetails({ ticket, data, setData }) {
  const rows = [];
  for (let i = 0; i < ticket.quantity; i++) {
    rows.push(
      <Guest
        key={i}
        guestNum={i}
        ticket={ticket}
        data={data}
        setData={setData}
      />
    );
  }

  return (
    <>
      {rows.map((item, index) => (
        <div className="mb-24" key={index}>
          {item}
        </div>
      ))}
    </>
  );
}
