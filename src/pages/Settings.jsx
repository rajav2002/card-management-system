import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import "./settings.css"; // Custom styles

const Settings = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleChangePassword = (values, { resetForm }) => {
    if (values.oldPassword !== user?.password) {
      setMessage({ type: "danger", text: "Old password is incorrect!" });
      return;
    }

    const updatedUser = { ...user, password: values.newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setMessage({ type: "success", text: "Password updated successfully!" });
    resetForm();
  };

  return (
    <Container className="settings-container">
      <Card className="settings-card">
        <Card.Body>
          <h3 className="text-center mb-4">Change Password</h3>
          {message && <Alert variant={message.type}>{message.text}</Alert>}

          <Formik
            initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleChangePassword}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={values.oldPassword}
                    onChange={handleChange}
                    isInvalid={touched.oldPassword && errors.oldPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.oldPassword}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    isInvalid={touched.newPassword && errors.newPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isInvalid={touched.confirmPassword && errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit" className="w-100">
                    Update Password
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Settings;
