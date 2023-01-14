import { useParams, useNavigate } from "react-router-dom";

const Page1Subpage = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="body-bold">
      <p>This is child page 1</p>
      <p>Page ID: {pageId}</p>
      <button onClick={() => navigate(-1)}>Go Back to page 1</button>
    </div>
  );
};

export default Page1Subpage;
