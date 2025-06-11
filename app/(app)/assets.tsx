import { getAssets } from '@/src/api/AssetAPI'
import AssetCard from '@/src/components/assets/AssetCard'
import AssetsForm from '@/src/components/assets/AssetsForm'
import Spinner from '@/src/components/Spinner'
import { globalStyles } from '@/src/styles/styles'
import { formatCurrency } from '@/src/utils/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'

export default function Assets() {
const queryClient = useQueryClient()
  
  useEffect(() => {
    queryClient.removeQueries({queryKey: ['asset']})
  }, [])
  
  const {data, isLoading} = useQuery({
    queryKey: ['assets'],
    queryFn: getAssets
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

  if(data)
  return (
    <View style={globalStyles.appContent}>
      <LinearGradient
        colors={['#048100', '#39fa18']}
        style={globalStyles.appViewType}
      >
        <Text style={globalStyles.appTextType}>Total Assets</Text>
        <Text style={globalStyles.appTextType}>{formatCurrency(total)}</Text>
      </LinearGradient>

      <LinearGradient
        colors={['#048100', '#39fa18']}
        style={[globalStyles.appViewType, globalStyles.appForm]}
      >
        <AssetsForm />
      </LinearGradient>
      
      <FlatList 
        data={data}
        renderItem={({item}) => <AssetCard item={item}/>}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  )
}
