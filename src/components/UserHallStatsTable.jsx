// src/components/UserHallStatsTable.jsx
import { Card, Table, Badge } from "react-bootstrap";

export default function UserHallStatsTable({ hallStats }) {
  if (hallStats.length === 0) {
    return (
      <Card>
        <Card.Body>
          <h2 className="h4 mb-2">Hall Breakdown</h2>
          <p className="text-muted mb-0">
            You haven&apos;t written any reviews yet. Once you start rating
            items, this section will show how you feel about each dining hall.
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="h4 mb-2">Hall Breakdown</h2>
        <p className="text-muted">
          See how many reviews you&apos;ve written at each hall, along with
          your average rating and how often you say you&apos;d order again.
        </p>
        <Table striped bordered hover responsive size="sm" className="mb-0">
          <thead>
            <tr>
              <th scope="col">Dining hall</th>
              <th scope="col">Reviews</th>
              <th scope="col">Your avg rating</th>
              <th scope="col">% you&apos;d order again</th>
            </tr>
          </thead>
          <tbody>
            {hallStats.map((h) => (
              <tr key={h.hall}>
                <td>{h.hall}</td>
                <td>
                  <Badge bg="primary">{h.count}</Badge>
                </td>
                <td>{h.avgRating.toFixed(1)}</td>
                <td>{Math.round(h.percentAgain)}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
