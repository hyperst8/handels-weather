import { useParams } from "react-router-dom";

const Details = () => {
  const { locationId } = useParams();

  return (
    <div>
      <h1>{locationId} Details</h1>
      {/* Render detailed weather information for the selected location here */}
    </div>
  );
};

export default Details;
