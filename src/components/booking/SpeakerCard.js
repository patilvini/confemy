export default function SpeakerCard({firstName, lastName, designation}) {
  return (
    <div className="speaker-card">
      <img
        className="profile-pic"
        src="https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
        alt="profile"
      />
      <h4 style={{fontSize:"1.8rem", margin: "0 7.5rem .8rem 7.5rem "}}>{firstName} {lastName}</h4>
      <p style={{fontSize:"1.2rem", fontWeight: 'normal' ,padding: "0rem 2.7rem 1.34rem 2.7rem "}}>{designation}</p>

    </div>
  );
}
