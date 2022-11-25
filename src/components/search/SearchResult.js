import ConfCard from "../conf-card/ConfCard";

export default function SearchResult({ result, isLoading }) {
  // console.log("result array", result);
  return (
    <>
      {!isLoading && result.length === 0 && (
        <div className="sr-noresult-container">
          <h2>Nothing matched your search “Harward” </h2>
        </div>
      )}

      <div className="sr-container">
        {result.map((conf) => (
          <div key={conf._id}>
            <ConfCard
              src={conf.banner[0]?.Location}
              title={conf.title}
              startDate={conf.startDate}
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
    </>
  );
}
