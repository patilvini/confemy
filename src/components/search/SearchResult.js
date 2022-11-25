import { useSelector } from "react-redux";
import ConfCard from "../conf-card/ConfCard";
import UserOnBenchSketch from "../SVG-assets/UserOnBenchSketch";

export default function SearchResult({ result, isLoading }) {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {!isLoading && result.length === 0 ? (
        <div className="sr-noresult-container">
          <UserOnBenchSketch className="icon-size" />
          <h2>
            Nothing matched your search {user && `“${user && user.firstName}”`}
          </h2>
        </div>
      ) : (
        <div className="sr-container">
          {result.map((conf) => (
            <div key={conf._id}>
              <ConfCard
                src={conf.banner[0]?.Location}
                title={conf.title}
                startDate={conf.startDate}
                endDate={conf.endDate}
                timezone={conf.timezone}
                mode={conf.mode}
                city={conf.city}
                credits={conf.credits}
                currency={conf.currency}
                basePrice={conf.basePrice}
                confId={conf._id}
              />
            </div>
          ))}

          <div
            style={{
              ...(isLoading && result.length > 0 && { opacity: 0.7 }),
            }}
            className="sr-container-overlay"
          ></div>
        </div>
      )}
    </>
  );
}
