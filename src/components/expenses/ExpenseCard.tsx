import { useStore } from '@/src/store'
import { globalStyles } from '@/src/styles/styles'
import { Expense } from '@/src/types'
import { formatCurrency, formatDate } from '@/src/utils/utils'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

type ExpenseCardProps = {
  item: Expense
}

export default function ExpenseCard({ item }: ExpenseCardProps) {
  const router = useRouter()
  const setItemIdEdit = useStore( store => store.setItemIdEdit ) 
  const handleEdit = () => {
      setItemIdEdit(item._id)
      router.push('/editExpenseData')
  }

  return (
    <Pressable 
      style={[globalStyles.cardContent, {backgroundColor: '#c10007'}]}
      onPress={handleEdit}
    >
      <View style={globalStyles.cardTextContent}>
        <Text style={globalStyles.cardText}>{item.title}</Text>
        <Text style={globalStyles.cardText}>{formatCurrency(+item.value)}</Text>
        <Text style={[globalStyles.cardText, {fontSize: 12}]}>{formatDate(item.date)}</Text>
      </View>
    </Pressable>
  )
}
