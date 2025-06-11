import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Asset, AssetForm, assetSchema, dashboardAssetsSchema } from "../types"

export async function createAsset(formData : AssetForm) {
    try {
        const url = '/app/assets'
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAssets() {
    try {
        const url = '/app/assets'
        const {data} = await api.get(url)
        const response = dashboardAssetsSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAssetbyId(assetId : Asset['_id']) {
    try {
        const url = `/app/assets/${assetId}`
        const {data} = await api.get(url)
        const response = assetSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateAssetById({formData, assetId} : {formData : AssetForm, assetId : Asset['_id']} ) {
    try {
        const url = `/app/assets/${assetId}`
        const {data} = await api.put(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteAssetById(assetId : Asset['_id'] ) {
    try {
        const url = `/app/assets/${assetId}`
        const {data} = await api.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}