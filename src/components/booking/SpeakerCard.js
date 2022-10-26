export default function SpeakerCard({firstName, lastName, designation}) {
  return (
    <div className="speaker-card">
      <img
        className="profile-pic"
        src="https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
        alt="profile"
      />
      <span className="mx-76 mt-0 mb-8" >{firstName} {lastName}</span>
      <p className="px-27 pt-0 pb-14" >{designation}</p>

    </div>
  );
}
