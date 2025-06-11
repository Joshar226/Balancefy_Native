import { getAssetbyId } from '@/src/api/AssetAPI'
import EditAssetForm from '@/src/components/assets/EditAssetForm'
import Spinner from '@/src/components/Spinner'
import { useStore } from '@/src/store'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function editAssetData() {
  const itemIdEdit = useStore( store => store.itemIdEdit )

  const {data, isLoading} = useQuery({
    queryKey: ['asset', itemIdEdit],
    queryFn: () => getAssetbyId(itemIdEdit),
    enabled: !!itemIdEdit
  })

  if(isLoading) return <Spinner />
  
  if(data)
  return (
    <EditAssetForm asset={data}/>
  )
}
