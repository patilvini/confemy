export default function SearchInput({ query, onQueryChange, onQuerySubmit }) {
  return (
    <div className="flex">
      <div style={{ flexGrow: 1 }} className="form-type-2">
        <input
          type="text"
          name="query"
          value={query}
          onChange={onQueryChange}
          placeholder="Search by conference title or tags..."
        />
      </div>
      <button
        onClick={() => onQuerySubmit(query)}
        style={{ padding: "1.4rem 2.4rem", maxHeight: "4.6rem" }}
        className="button button-primary ml-16"
      >
        Search
      </button>
    </div>
  );
}
