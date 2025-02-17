import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/cardSlice";
import { v4 as uuidv4 } from "uuid";

const AddCardModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      bankName: "",
      type: "",
      cardNumber: "",
      validTill: "",
      cvv: "",
      isDefault: false,
      addToGPay: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(35, "Max 35 characters").required("Required"),
      bankName: Yup.string().required("Required"),
      type: Yup.string().oneOf(["Credit", "Debit"]).required("Required"),
      cardNumber: Yup.string().matches(/^\d{16}$/, "Must be a valid 16-digit card number").required("Required"),
      validTill: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Must be MM/YY format").required("Required"),
      cvv: Yup.string().matches(/^\d{3}$/, "Must be a 3-digit CVV").required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(addCard({ id: uuidv4(), ...values }));
      handleClose();
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control {...formik.getFieldProps("name")} isInvalid={formik.touched.name && formik.errors.name} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Bank Name</Form.Label>
            <Form.Control {...formik.getFieldProps("bankName")} isInvalid={formik.touched.bankName && formik.errors.bankName} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Card Type</Form.Label>
            <Form.Control as="select" {...formik.getFieldProps("type")} isInvalid={formik.touched.type && formik.errors.type}>
              <option value="">Select</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Card Number</Form.Label>
            <Form.Control {...formik.getFieldProps("cardNumber")} isInvalid={formik.touched.cardNumber && formik.errors.cardNumber} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Valid Till (MM/YY)</Form.Label>
            <Form.Control {...formik.getFieldProps("validTill")} isInvalid={formik.touched.validTill && formik.errors.validTill} />
          </Form.Group>

          <Form.Group>
            <Form.Label>CVV</Form.Label>
            <Form.Control type="password" {...formik.getFieldProps("cvv")} isInvalid={formik.touched.cvv && formik.errors.cvv} />
          </Form.Group>

          <Form.Check type="checkbox" label="Set as Default" {...formik.getFieldProps("isDefault")} />
          <Form.Check type="checkbox" label="Add to GPay" {...formik.getFieldProps("addToGPay")} />

          <Button type="submit" className="mt-3">Add Card</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCardModal;
