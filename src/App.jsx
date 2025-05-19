import { useState, useMemo } from "react";
import Questionnaire from "./Questionnaire";
import Result from "./Result";
import questions from "./questions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Shuffle helper (Fisher-Yates)
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

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

  // ✅ Randomize questions only once per quiz session
  const shuffledQuestions = useMemo(() => shuffleArray(questions), [step === "quiz"]);

  const handleFinish = (finalScores) => {
    setScores(finalScores);
    setStep("result");
  };

  const handleRestart = () => {
    setScores(scoreObj);
    setStep("quiz"); // Triggers reshuffling via useMemo
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
            <Questionnaire questions={shuffledQuestions} onFinish={handleFinish} />
          ) : (
            <Result scores={scores} onRestart={handleRestart} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
