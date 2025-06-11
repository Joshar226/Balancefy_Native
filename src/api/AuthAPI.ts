import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAxiosError } from "axios";
import api from "../lib/axios";
import { AuthLogInForm, AuthSingUpForm, ConfirmAccount, ForgotPasswordType, ProfileForm, ResetPasswordData, UpdatePasswordType, userSchema } from "../types";

export async function createAccount(formData : AuthSingUpForm) {
    try {
        const url = '/auth/sing-up'
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function login(formData : AuthLogInForm) {
    try {
        const url = '/auth/log-in'
        const {data} = await api.post(url, formData)
        await AsyncStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(token : ConfirmAccount) {
    try {
        const url = '/auth/confirm-account'
        const {data} = await api.post(url, token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(email : ForgotPasswordType) {
    try {
        const url = '/auth/forgot-password'
        const {data} = await api.post(url, email)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(token : ConfirmAccount) {
    try {
        const url = '/auth/validate-token'
        const {data} = await api.post(url, token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function resetPassword(formData : ResetPasswordData ) {
    try {
        const url = '/auth/reset-password'
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const url = '/auth/user'
        const {data} = await api.get(url)
        const response = userSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProfile(formData : ProfileForm) {
    try {
        const url = '/auth/update-profile'
        const {data} = await api.put(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePassword(formData : UpdatePasswordType) {
    try {
        const url = '/auth/update-password'
        const {data} = await api.put(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}