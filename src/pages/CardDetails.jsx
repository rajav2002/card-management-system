import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAsDefault } from "../redux/cardSlice";

const CardDetails = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards ? state.cards);

  return (
    <div className="card-details">
      <h4>Card Details</h4>
      <select
        onChange={(e) => {
          const selectedCard = cards.find(card => card.id === parseInt(e.target.value));
          if (selectedCard) {
            dispatch(setAsDefault(selectedCard));
          }
        }}
      >
        <option value="">Select Default Card</option>
        {cards.map((card) => (
          <option key={card.id} value={card.id}>
            {card.bank} - {card.type} Card
          </option>
        ))}
      </select>

      {defaultCard && (
        <div className="default-card">
          <h5>{defaultCard.bank} - {defaultCard.type} Card</h5>
          <p>Valid Till: {defaultCard.validTill}</p>
          <p>Card Number: {defaultCard.showNumber ? defaultCard.number : "**** **** **** ****"}</p>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
