import Container from 'react-bootstrap/Container'
import {Stack, Button}from 'react-bootstrap'
import BudgetCard from "./components/BudgetCard";
import {AddBudget} from "./components/AddBudget";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import {useState} from "react";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "./contexts/BudgetsContext";
import {AddExpense} from "./components/AddExpense";
import TotalBudgetCard from "./components/TotalBudgetCard";
import {ViewExpenses} from "./components/ViewExpenses";
function App() {
  const  [showAddBudget, setShowAddBudget] = useState(false);
  const  [showAddExpense, setShowAddExpense] = useState(false);
  const  [viewExpensesBudgetID, setViewExpensesBudgetID] = useState();
  const  [AddExpenseBudgetId, setAddExpenseBudgetId] = useState();
  const {budgets, getBudgetExpenses} = useBudgets()

  const openAddExpense = (budgetId) =>{
      setShowAddExpense(true)
      setAddExpenseBudgetId(budgetId)
  }

  return (
    <>
        <Container>
            <Stack direction='horizontal' gap='2' className='mb-4'>
                <h1 className="me-auto">Budgets</h1>
                <Button variant="primary" onClick={() => setShowAddBudget(true)}>Add Budget</Button>
                <Button Variant='outline-primary' onClick={openAddExpense}>Add Expense</Button>

            </Stack>
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

            </div>
            <UncategorizedBudgetCard onAddExpenseClick={openAddExpense} onViewExpensesClick={() => setViewExpensesBudgetID(UNCATEGORIZED_BUDGET_ID)}/>
            <TotalBudgetCard/>
        </Container>
        <AddBudget show={showAddBudget} handleClose={() => setShowAddBudget(false)} />
        <AddExpense show={showAddExpense} defaultBudgetId={AddExpenseBudgetId} handleClose={() => setShowAddExpense(false)} />
        <ViewExpenses
            budgetId={viewExpensesBudgetID}
            handleClose={() => setViewExpensesBudgetID()} />

    </>
  );
}

export default App;
