import { getExpensebyId } from '@/src/api/ExpenseAPI'
import EditExpenseForm from '@/src/components/expenses/EditExpenseForm'
import Spinner from '@/src/components/Spinner'
import { useStore } from '@/src/store'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function editExpenseData() {
  const itemIdEdit = useStore( store => store.itemIdEdit )

  const {data, isLoading} = useQuery({
    queryKey: ['expense', itemIdEdit],
    queryFn: () => getExpensebyId(itemIdEdit),
    enabled: !!itemIdEdit
  })

  if(isLoading) return <Spinner />
  
  if(data)
  return (
    <EditExpenseForm expense={data}/>
  )
}
