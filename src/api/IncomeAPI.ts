import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardIncomesSchema, Income, IncomeForm, incomeSchema } from "../types";

export async function createIncome(formData : IncomeForm) {
    try {
        const url = '/app/incomes'
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getIncomes() {
    try {
        const url = '/app/incomes'
        const {data} = await api.get(url)
        const response = dashboardIncomesSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getIncomebyId(incomeId : Income['_id']) {
    try {
        const url = `/app/incomes/${incomeId}`
        const {data} = await api.get(url)
        const response = incomeSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateIncomeById({formData, incomeId} : {formData : IncomeForm, incomeId : Income['_id']} ) {
    try {
        const url = `/app/incomes/${incomeId}`
        const {data} = await api.put(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteIncomebyId(incomeId : Income['_id'] ) {
    try {
        const url = `/app/incomes/${incomeId}`
        const {data} = await api.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}