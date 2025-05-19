import { Button, Card, Container, Row, Col, ListGroup } from "react-bootstrap";

export default function Result({ scores, onRestart }) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topCategory = sorted[0][0];

  const suggestions = {
    analytical: ["Data Analyst", "Scientist", "Financial Analyst"],
    creative: ["Graphic Designer", "Writer", "UX Designer"],
    social: ["Teacher", "Counselor", "Social Worker"],
    technical: ["Software Engineer", "Mechanic", "Electrician"],
    business: ["Marketer", "Entrepreneur", "Sales Manager"],
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <Card.Title className="mb-3 h4">Your Top Skill Area</Card.Title>
              <Card.Text className="text-primary fw-bold fs-5">
                You will do well in the {topCategory} sector.
              </Card.Text>

              <h5 className="mt-4">Suggested Careers</h5>
              <ListGroup variant="flush" className="mb-4">
                {suggestions[topCategory].map((career, idx) => (
                  <ListGroup.Item key={idx}>{career}</ListGroup.Item>
                ))}
              </ListGroup>

              <Button variant="success" onClick={onRestart}>
                Restart Test
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
