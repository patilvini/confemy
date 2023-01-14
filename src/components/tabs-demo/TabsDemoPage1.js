import { Link } from "react-router-dom";

export default function TabsDemoPage1() {
  const data = [
    { id: 1, name: "subpage1" },
    { id: 2, name: "subpage2" },
  ];
  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id} className="body-bold">
            <Link to={`${item.id}`}> {item.name} </Link>
          </div>
        );
      })}
    </div>
  );
}
