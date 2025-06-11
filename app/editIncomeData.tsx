import { getIncomebyId } from '@/src/api/IncomeAPI';
import EditIncomeForm from '@/src/components/incomes/EditIncomeForm';
import Spinner from '@/src/components/Spinner';
import { useStore } from '@/src/store';
import { useQuery } from '@tanstack/react-query';
import React from 'react';


export default function EditItem() {
  const itemIdEdit = useStore( store => store.itemIdEdit )

  const {data, isLoading} = useQuery({
    queryKey: ['income', itemIdEdit],
    queryFn: () => getIncomebyId(itemIdEdit),
    enabled: !!itemIdEdit
  })

  if(isLoading) return <Spinner />
  
  if(data)
  return (
    <EditIncomeForm income={data}/>
  )
}


