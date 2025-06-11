import { create } from 'zustand'
import { Income } from "./types"

type StoreType = {
    itemIdEdit: Income['_id']
    setItemIdEdit: ( itemIdEdit : Income['_id'] ) => void
}

export const useStore = create<StoreType>((set) => ({
    itemIdEdit: '',
    setItemIdEdit: (itemIdEdit) => {
        set(() => ({
            itemIdEdit
        }))
    }
}))

