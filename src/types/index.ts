import { z } from "zod";


//INCOMES
export const incomeSchema = z.object({
    _id: z.string(),
    title: z.string(),
    value: z.string(),
    date: z.string(),
    owner: z.string()
})

export const dashboardIncomesSchema = z.array(incomeSchema)

export type Income = z.infer<typeof incomeSchema>
export type DashboardIncomesType = z.infer<typeof dashboardIncomesSchema>
export type IncomeForm = Pick<Income, 'title' | 'value'>




//EXPENSES
export const expenseSchema = z.object({
    _id: z.string(),
    title: z.string(),
    value: z.string(),
    date: z.string(),
    owner: z.string()
})

export const dashboardExpensesSchema = z.array(expenseSchema)

export type Expense = z.infer<typeof expenseSchema>
export type DashboardExpensesType = z.infer<typeof dashboardExpensesSchema>
export type ExpenseForm = Pick<Expense, 'title' | 'value'>




//ASSETS
export const assetSchema = z.object({
    _id: z.string(),
    title: z.string(),
    value: z.string(),
    owner: z.string()
})

export const dashboardAssetsSchema = z.array(assetSchema)

export type Asset = z.infer<typeof assetSchema>
export type DashboardAssetsType = z.infer<typeof dashboardAssetsSchema>
export type AssetForm = Pick<Asset, 'title' | 'value'>




//LIABILITIES
export const liabilitySchema = z.object({
    _id: z.string(),
    title: z.string(),
    value: z.string(),
    owner: z.string()
})

export const dashboardLiabilitiesSchema = z.array(liabilitySchema)

export type Liability = z.infer<typeof liabilitySchema>
export type DashboardLiabilityType = z.infer<typeof dashboardLiabilitiesSchema>
export type LiabilityForm = Pick<Liability, 'title' | 'value'>




//DASHBOARD
export const dashboardSchema = z.object({
    incomes: z.array(incomeSchema.pick({value: true})),
    expenses: z.array(expenseSchema.pick({value: true})),
    assets: z.array(assetSchema.pick({value: true})),
    liabilities: z.array(liabilitySchema.pick({value: true})),
})

export const incomeExpenseSchema = z.object({
    incomes: z.array(incomeSchema.pick({value: true})),
    expenses: z.array(expenseSchema.pick({value: true}))
})




//AUTH
export const authSchema = z.object({
    _id: z.string(),
    email: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    name: z.string(),
    token: z.string()
})

export const updatePasswordSchema = authSchema.pick({
    password: true,
    password_confirmation: true
}).extend({
    current_password: z.string()
})

export type Auth = z.infer<typeof authSchema>
export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>

export type AuthSingUpForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type AuthLogInForm = Pick<Auth, 'email' | 'password'>
export type ConfirmAccount = Pick<Auth, 'token'>
export type ForgotPasswordType = Pick<Auth, 'email'>
export type ResetPasswordType = Pick<Auth, 'password' | 'password_confirmation'>
export type ResetPasswordData = Pick<Auth, 'password' | 'password_confirmation' | 'token'>




//USER
export const userSchema = authSchema.pick({
    _id: true,
    name: true,
    email: true
})

export type User = z.infer<typeof userSchema>
export type ProfileForm = Pick<User, 'name' | 'email'>