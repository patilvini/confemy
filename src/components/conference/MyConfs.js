import "./myConfs.styles.scss";

export default function MyConfs() {
  return (
    <div>
      <div className="myconfs-header">
        <h1 className="mr-16">Conferences</h1>
        <button className="button button-green">Create conference</button>
      </div>
      <div className="myconfs-sort"></div>
      <div className="myconfs-table">My Conferences will go here</div>
    </div>
  );
}
