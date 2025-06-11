import { getLiabilities } from '@/src/api/LiabilityAPI'
import LiabilitiesForm from '@/src/components/liabilities/LiabilitiesForm'
import LiabilityCard from '@/src/components/liabilities/LiabilityCard'
import Spinner from '@/src/components/Spinner'
import { globalStyles } from '@/src/styles/styles'
import { formatCurrency } from '@/src/utils/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'

export default function Liabilities() {
  const queryClient = useQueryClient()
  
  useEffect(() => {
    queryClient.removeQueries({queryKey: ['liability']})
  }, [])
  
  const {data, isLoading} = useQuery({
    queryKey: ['liabilities'],
    queryFn: getLiabilities
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

  if(data)
  return (
    <View style={globalStyles.appContent}>
      <LinearGradient
        colors={['#ff7b00', '#ffb01d']}
        style={globalStyles.appViewType}
      >
        <Text style={globalStyles.appTextType}>Total Liabilities</Text>
        <Text style={globalStyles.appTextType}>{formatCurrency(total)}</Text>
      </LinearGradient>

      <LinearGradient
        colors={['#ff7b00', '#ffb01d']}
        style={[globalStyles.appViewType, globalStyles.appForm]}
      >
        <LiabilitiesForm />
      </LinearGradient>
      
      <FlatList 
        data={data}
        renderItem={({item}) => <LiabilityCard item={item}/>}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  )
}
