import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "Visa Platinum",
    bank: "Bank A",
    type: "Credit",
    realCardNumber: "1234567890123456",
    number: "**** **** **** 3456",
    validTill: "12/26",
    cvv: "123",
    locked: false,
    archived: false,
    default: true,
    showNumber: false,
    addedToGPay: false,
  },
  {
    name: "MasterCard Gold",
    bank: "Bank B",
    type: "Debit",
    realCardNumber: "9876543210987654",
    number: "**** **** **** 7654",
    validTill: "11/25",
    cvv: "123",
    locked: false,
    archived: false,
    default: false,
    showNumber: false,
    addedToGPay: false,
  },
];

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.push({
        ...action.payload,
        realCardNumber: action.payload.number,
        number: `**** **** **** ${action.payload.number.slice(-4)}`,
        cvv: action.payload.cvv,
        locked: false,
        archived: false,
        default: false,
        showNumber: false,
        addedToGPay: false,
      });
    },

    setDefaultCard: (state, action) => {
      const selectedIndex = action.payload;
      const selectedCard = state[selectedIndex];

      if (selectedCard.locked) return;

      state.forEach((card) => {
        if (card.type === selectedCard.type) card.default = false;
      });

      state[selectedIndex].default = true;
    },

    toggleLock: (state, action) => {
      const index = action.payload;
      state[index].locked = !state[index].locked;

      if (state[index].default) {
        state[index].default = false;
        const newDefaultIndex = state.findIndex(
          (card, i) => !card.locked && !card.archived && i !== index && card.type === state[index].type
        );
        if (newDefaultIndex !== -1) {
          state[newDefaultIndex].default = true;
        }
      }
    },

    toggleArchive: (state, action) => {
      const index = action.payload;
      state[index].archived = !state[index].archived;

      if (state[index].default) {
        state[index].default = false;
        const newDefaultIndex = state.findIndex(
          (card, i) => !card.locked && !card.archived && i !== index && card.type === state[index].type
        );
        if (newDefaultIndex !== -1) {
          state[newDefaultIndex].default = true;
        }
      }
    },

    toggleShowNumber: (state, action) => {
      const index = action.payload;
      state.forEach((card, i) => {
        if (i === index) {
          card.showNumber = !card.showNumber;
          card.cardNumber = card.showNumber ? card.realCardNumber : `**** **** **** ${card.realCardNumber.slice(-4)}`;
        } else {
          card.showNumber = false;
          card.cardNumber = `**** **** **** ${card.realCardNumber.slice(-4)}`;
        }
      });
    },

    toggleGPay: (state, action) => {
      const index = action.payload;
      state[index].addedToGPay = !state[index].addedToGPay;
    },
  },
});

export const { addCard, setDefaultCard, toggleLock, toggleArchive, toggleShowNumber, toggleGPay } = cardSlice.actions;
export default cardSlice.reducer;
