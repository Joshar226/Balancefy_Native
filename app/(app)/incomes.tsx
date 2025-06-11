import { getIncomes } from '@/src/api/IncomeAPI';
import IncomeCard from '@/src/components/incomes/IncomeCard';
import IncomesForm from '@/src/components/incomes/IncomesForm';
import Spinner from '@/src/components/Spinner';
import { globalStyles } from '@/src/styles/styles';
import { formatCurrency } from '@/src/utils/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

export default function Incomes() {

  const queryClient = useQueryClient()
  
  useEffect(() => {
    queryClient.removeQueries({queryKey: ['income']})
  }, [])
  
  const {data, isLoading} = useQuery({
    queryKey: ['incomes'],
    queryFn: getIncomes
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

  if(data)
  return (
    <View style={globalStyles.appContent}>
      <LinearGradient
        colors={['#0040ff', '#547cff']}
        style={globalStyles.appViewType}
      >
        <Text style={globalStyles.appTextType}>Total Incomes</Text>
        <Text style={globalStyles.appTextType}>{formatCurrency(total)}</Text>
      </LinearGradient>

      <LinearGradient
        colors={['#0040ff', '#547cff']}
        style={[globalStyles.appViewType, globalStyles.appForm]}
      >
        <IncomesForm />
      </LinearGradient>
      
      <FlatList 
        data={data}
        renderItem={({item}) => <IncomeCard item={item}/>}
        keyExtractor={item => item._id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  )
}