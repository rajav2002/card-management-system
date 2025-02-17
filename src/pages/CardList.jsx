import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  addCard,
  toggleLock,
  setDefaultCard,
  toggleArchive,
  toggleShowNumber,
  toggleGPay,
} from "../redux/cardSlice";
import "./CardList.css";

const CardList = () => {
  const cards = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const cardSchema = Yup.object().shape({
    name: Yup.string().required("Cardholder name is required"),
    bank: Yup.string().required("Bank name is required"),
    number: Yup.string().matches(/^\d{16}$/, "Card number must be 16 digits").required("Card number is required"),
    validTill: Yup.string()
      .required("Expiry date is required")
      .test("future-date", "Expiry must be in the future", (value) => {
        const today = new Date();
        const selectedDate = new Date(value + "-01");
        return selectedDate > today;
      }),
    cvv: Yup.string().matches(/^\d{3}$/, "CVV must be 3 digits").required("CVV is required"),
  });

  return (
    <div className="card-container">
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Card</Button>

      {cards.map((card, index) => (
        <div key={index} className={`credit-card ${card.default ? "default-card" : ""} ${card.archived ? "archived" : ""}`}>
          <div className="card-header">
            <span>{card.name} ({card.type})</span>
            <span className="bank-name">{card.bank}</span>
          </div>

          <div className="card-number">
            {card.showNumber ? card.realCardNumber : `**** **** **** ${card.number  .slice(-4)}`}
          </div>

          <div className="card-footer">
            <span>Valid Till: {card.validTill}</span>
            <span>CVV: {card.showNumber ? card.cvv : `***`}</span>
          </div>

          {/* <div className="card-footer">
            <span>CVV: {card.showNumber ? card.cvv : `***`}</span>
          </div> */}

          <div className="card-actions">
            <Button variant="secondary" onClick={() => dispatch(toggleShowNumber(index))}>
              {card.showNumber ? "Hide Number" : "Show Number"}
            </Button>

            <Button variant={card.locked ? "danger" : "success"} onClick={() => dispatch(toggleLock(index))}>
              {card.locked ? "Unlock" : "Lock"}
            </Button>

            {!card.locked && !card.archived && (
              <Button variant="primary" onClick={() => dispatch(setDefaultCard(index))} disabled={card.default}>
                {card.default ? "Default" : "Set as Default"}
              </Button>
            )}

            <Button variant="warning" onClick={() => dispatch(toggleArchive(index))}>
              {card.archived ? "Unarchive" : "Archive"}
            </Button>

            <Button variant="info" onClick={() => dispatch(toggleGPay(index))}>
              {card.gpay ? "Remove from GPay" : "Add to GPay"}
            </Button>
          </div>
        </div>
      ))}

      {/* Modal for Adding Cards */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
              bank: "",
              type: "Credit",
              number: "",
              validTill: "",
              cvv: "",
              default: false,
              gpay: false,
              locked: false,
              archived: false,
              showNumber: false,
            }}
            validationSchema={cardSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Submitting Card:", values); // Debugging
              dispatch(addCard(values)); // Add card to Redux
            
              setTimeout(() => {
                setShowModal(false); // Close modal after update
              }, 100);
            
              resetForm(); // Reset form values
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={values.name} onChange={handleChange} isInvalid={touched.name && errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control type="text" name="bank" value={values.bank} onChange={handleChange} isInvalid={touched.bank && errors.bank} />
                  <Form.Control.Feedback type="invalid">{errors.bank}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Card Type</Form.Label>
                  <Form.Select name="type" value={values.type} onChange={handleChange}>
                    <option>Credit</option>
                    <option>Debit</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="text" name="number" value={values.number} onChange={handleChange} isInvalid={touched.number && errors.number} />
                  <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Valid Till</Form.Label>
                  <Form.Control type="month" name="validTill" value={values.validTill} onChange={handleChange} isInvalid={touched.validTill && errors.validTill} />
                  <Form.Control.Feedback type="invalid">{errors.validTill}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="text" name="cvv" value={values.cvv} onChange={handleChange} isInvalid={touched.cvv && errors.cvv} />
                  <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
                </Form.Group>

                <Form.Check type="checkbox" label="Set as Default" name="default" checked={values.default} onChange={handleChange} />
                <Form.Check type="checkbox" label="Add to GPay" name="gpay" checked={values.gpay} onChange={handleChange} />

                <Button variant="primary" type="submit" className="mt-3">Add Card</Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      
    </div>
  );
};

export default CardList;
