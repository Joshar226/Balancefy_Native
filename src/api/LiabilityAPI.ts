import { isAxiosError } from "axios"
import api from "../lib/axios"
import { dashboardLiabilitiesSchema, Liability, LiabilityForm, liabilitySchema } from "../types"

export async function createLiability(formData : LiabilityForm) {
    try {
        const url = '/app/liabilities'
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getLiabilities() {
    try {
        const url = '/app/liabilities'
        const {data} = await api.get(url)
        const response = dashboardLiabilitiesSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getLiabilitybyId(liabilityId : Liability['_id']) {
    try {
        const url = `/app/liabilities/${liabilityId}`
        const {data} = await api.get(url)
        const response = liabilitySchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateLiabilityById({formData, liabilityId} : {formData : LiabilityForm, liabilityId : Liability['_id']} ) {
    try {
        const url = `/app/liabilities/${liabilityId}`
        const {data} = await api.put(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteLiabilitybyId(liabilityId : Liability['_id'] ) {
    try {
        const url = `/app/liabilities/${liabilityId}`
        const {data} = await api.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}