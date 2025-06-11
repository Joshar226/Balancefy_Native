import { getLiabilitybyId } from '@/src/api/LiabilityAPI'
import EditLiabilityForm from '@/src/components/liabilities/EditLiabilityForm'
import Spinner from '@/src/components/Spinner'
import { useStore } from '@/src/store'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function editLiabilityData() {
  const itemIdEdit = useStore( store => store.itemIdEdit )

  const {data, isLoading} = useQuery({
    queryKey: ['liability', itemIdEdit],
    queryFn: () => getLiabilitybyId(itemIdEdit),
    enabled: !!itemIdEdit
  })

  if(isLoading) return <Spinner />
  
  if(data)
  return (
    <EditLiabilityForm liability={data}/>
  )
}
