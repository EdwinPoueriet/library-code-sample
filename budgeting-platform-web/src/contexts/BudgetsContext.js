import React, {useContext} from "react"
import {v4 as uuid} from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext()
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"
export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({children}) => {
    const [budgets, setBudget] = useLocalStorage("budgets",[])
    const [expenses, setExpenses] = useLocalStorage("expenses",[])
    const getBudgetExpenses = (budgetId)=>{

        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    const addExpense = ({description, amount, budgetId})=>{
        setExpenses(prevExpenses =>{
            return [...prevExpenses, {id: uuid(),description, amount, budgetId}]
        })
    }
    const addBudget = ({name, max})=>{
        setBudget(prevBudgets =>{
            if (prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets, {id: uuid(),name, max}]
        })
    }
    const deleteBudget = ({id})=>{
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
            })
        })
        setBudget(prevBudget => {
            return prevBudget.filter(budget => budget.id !== id)
        })
    }
    const deleteExpense = ({id})=>{
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }
    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}> {children}
        </BudgetsContext.Provider>
    )
}