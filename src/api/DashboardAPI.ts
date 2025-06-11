import { isAxiosError } from "axios";
import api from "../lib/axios"
import { dashboardSchema, incomeExpenseSchema } from "../types";

export async function getAllData() {
    try {
        const url = '/app/dashboard'
        const {data} = await api.get(url)
        const response = dashboardSchema.safeParse(data)        
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getIncomeExpenseData() {
    try {
        const url = '/app/dashboard/balance'
        const {data} = await api.get(url)
        const response = incomeExpenseSchema.safeParse(data)        
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

