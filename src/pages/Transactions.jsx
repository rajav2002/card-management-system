import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./Transactions.css";

const Transactions = () => {
  const staticTransactions = [
    { id: 101, title: "Amazon Purchase", date: "2025-02-16", amount: "-$120", type: "debit" },
    { id: 102, title: "Salary Credit", date: "2025-02-16", amount: "+$2000", type: "credit" },
    { id: 103, title: "Netflix Subscription", date: "2025-02-16", amount: "-$15", type: "debit" },
    { id: 104, title: "Grocery Shopping", date: "2025-02-16", amount: "-$85", type: "debit" },
    { id: 105, title: "Freelance Payment", date: "2025-02-16", amount: "+$500", type: "credit" },
  ];

  return (
    <Container className="transactions-container">
      <h4 className="mb-4">Today's Transactions</h4>
      <Row>
        {staticTransactions.map((txn) => (
          <Col md={6} lg={4} key={txn.id}>
            <Card className={`transaction-card ${txn.type}`}>
              <Card.Body>
                <Card.Title>{txn.title}</Card.Title>
                <Card.Text>
                  <small className="text-muted">{txn.date}</small>
                </Card.Text>
                <Card.Text className="transaction-amount">{txn.amount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Transactions;
