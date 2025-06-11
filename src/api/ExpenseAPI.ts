import { isAxiosError } from "axios"
import api from "../lib/axios"
import { dashboardExpensesSchema, Expense, ExpenseForm, expenseSchema } from "../types"

export async function createExpense(formData : ExpenseForm) {
    try {
        const url = '/app/expenses'
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getExpenses() {
    try {
        const url = '/app/expenses'
        const {data} = await api.get(url)
        const response = dashboardExpensesSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getExpensebyId(expenseId : Expense['_id']) {
    try {
        const url = `/app/expenses/${expenseId}`
        const {data} = await api.get(url)
        const response = expenseSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateExpenseById({formData, expenseId} : {formData : ExpenseForm, expenseId : Expense['_id']} ) {
    try {
        const url = `/app/expenses/${expenseId}`
        const {data} = await api.put(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteExpenseById(expenseId : Expense['_id'] ) {
    try {
        const url = `/app/expenses/${expenseId}`
        const {data} = await api.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}