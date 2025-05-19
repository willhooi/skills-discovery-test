import { useState } from "react";
import { Button, ProgressBar, Container, Row, Col, Form } from "react-bootstrap";

const choices = [
  { label: "Strongly Disagree", value: -2 },
  { label: "Disagree", value: -1 },
  { label: "Neutral", value: 0 },
  { label: "Agree", value: 1 },
  { label: "Strongly Agree", value: 2 },
];

export default function Questionnaire({ questions, onFinish }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [current, setCurrent] = useState(0);

  const handleChange = (value) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  const next = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = () => {
    const scores = {};
    questions.forEach((q, i) => {
      const val = answers[i] ?? 0;
      scores[q.category] = (scores[q.category] || 0) + val;
    });
    onFinish(scores);
  };

  const progress = Math.round(((current + 1) / questions.length) * 100);

  return (
    <Container className="mt-4 p-4 border rounded shadow-sm bg-light">
      <Row className="mb-3">
        <Col>
          <h5>Question {current + 1} of {questions.length}</h5>
          <ProgressBar now={progress} label={`${progress}%`} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h6>{questions[current].question}</h6>
        </Col>
      </Row>

      <Form>
        {choices.map((choice, idx) => (
          <Form.Check
            type="radio"
            id={`choice-${idx}`}
            key={idx}
            label={choice.label}
            name={`q-${current}`}
            value={choice.value}
            checked={answers[current] === choice.value}
            onChange={() => handleChange(choice.value)}
            className="mb-2"
          />
        ))}
      </Form>

      <Row className="mt-4">
        <Col className="d-flex justify-content-between">
          <Button variant="secondary" onClick={prev} disabled={current === 0}>
            Previous
          </Button>
          {current < questions.length - 1 ? (
            <Button
              variant="primary"
              onClick={next}
              disabled={answers[current] === null}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={answers[current] === null}
            >
              Submit
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
