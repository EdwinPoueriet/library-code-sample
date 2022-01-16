import {useState} from "react";
import Container from 'react-bootstrap/Container'
import {Stack, Button, Card} from 'react-bootstrap'
import BudgetCard from "./components/BudgetCard";
import {AddBudget} from "./components/AddBudget";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import {AddExpense} from "./components/AddExpense";
import TotalBudgetCard from "./components/TotalBudgetCard";
import {ViewExpenses} from "./components/ViewExpenses";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "./contexts/BudgetsContext";

export default function App() {

  const  [showAddBudget, setShowAddBudget] = useState(false);
  const  [showAddExpense, setShowAddExpense] = useState(false);
  const  [viewExpensesBudgetID, setViewExpensesBudgetID] = useState();
  const  [addExpenseBudgetId, setAddExpenseBudgetId] = useState();

  const {budgets, getBudgetExpenses} = useBudgets()

  const openAddExpense = (budgetId) =>{
      setShowAddExpense(true)
      setAddExpenseBudgetId(budgetId)
  }

  return (
    <>
        <Container>
            <Stack direction='horizontal' gap='2' className='mb-4'>
                <h1 className="me-auto">Money Planning</h1>
            </Stack>
            <Card>
                <Card.Header>
                    <Stack direction='horizontal' gap='3' className='mb-4 justify-content-center'>
                        <Button
                            size="lg"
                            variant="outline-primary"
                            onClick={() => setShowAddBudget(true)}>
                            Add Budget
                        </Button>
                        <Button
                            size="lg"
                            variant="outline-primary"
                            onClick={openAddExpense}>
                            Add Expense
                        </Button>
                    </Stack>
                </Card.Header>
                <Card.Body>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "1rem",
                        alignItems: "flex-start",
                    }}>
                        {budgets.map(budget => {
                            const amount = getBudgetExpenses(budget.id).reduce(
                                (total, expense) => total + expense.amount, 0)
                            return(<BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseClick={() => openAddExpense(budget.id)}
                                onViewExpensesClick={() => setViewExpensesBudgetID(budget.id)}
                            />)
                        })}


                        <UncategorizedBudgetCard onAddExpenseClick={openAddExpense} onViewExpensesClick={() => setViewExpensesBudgetID(UNCATEGORIZED_BUDGET_ID)}/>

                    </div>
                </Card.Body>
                <Card.Footer>
                    <TotalBudgetCard/>
                </Card.Footer>
            </Card>
        </Container>
        <AddBudget show={showAddBudget} handleClose={() => setShowAddBudget(false)} />
        <AddExpense show={showAddExpense} defaultBudgetId={addExpenseBudgetId} handleClose={() => setShowAddExpense(false)} />
        <ViewExpenses budgetId={viewExpensesBudgetID} handleClose={() => setViewExpensesBudgetID()} />

    </>
  );
}


