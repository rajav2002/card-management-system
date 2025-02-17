import CardDetails from "../pages/CardDetails.jsx";
import Transactions from "./Transactions";
import CardList from "./CardList";

const CardManagement = () => {
  return (
    <div className="card-management">
      <CardDetails />
      <Transactions />
      <CardList />
    </div>
  );
};

export default CardManagement;
