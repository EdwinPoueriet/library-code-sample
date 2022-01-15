import Container from 'react-bootstrap/Container'
import {Stack, Button}from 'react-bootstrap'
import BudgetCard from "./components/BudgetCard";
function App() {
  return (
    <Container>
      <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary">Add Budget</Button>
          <Button Variant='outline-primary'>Add Expense</Button>

      </Stack>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
        }}>
            <BudgetCard name="Fun" amount={2000}  max={10000}></BudgetCard>
        </div>
    </Container>
  );
}

export default App;
