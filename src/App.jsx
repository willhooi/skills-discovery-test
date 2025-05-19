import { useState } from "react";
import Questionnaire from "./Questionnaire";
import Result from "./Result";
import questions from "./questions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function App() {
  const scoreObj = {
    analytical: 0,
    creative: 0,
    social: 0,
    technical: 0,
    business: 0,
  };

  const [step, setStep] = useState("quiz");
  const [scores, setScores] = useState(scoreObj);

  const handleFinish = (finalScores) => {
    setScores(finalScores);
    setStep("result");
  };

  const handleRestart = () => {
    setScores(scoreObj);
    setStep("quiz");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="text-center mb-4">
            <h1 className="display-5 fw-bold">Skill Discovery Test</h1>
            <p className="text-muted">Find your strengths and potential career paths</p>
          </div>

          {step === "quiz" ? (
            <Questionnaire questions={questions} onFinish={handleFinish} />
          ) : (
            <Result scores={scores} onRestart={handleRestart} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
