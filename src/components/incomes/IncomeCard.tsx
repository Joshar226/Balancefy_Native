import { useStore } from '@/src/store'
import { globalStyles } from '@/src/styles/styles'
import { Income } from '@/src/types'
import { formatCurrency, formatDate } from '@/src/utils/utils'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'


type IncomeCardProps = {
    item: Income
}

export default function IncomeCard({item} : IncomeCardProps) {   
    const router = useRouter()
    const setItemIdEdit = useStore( store => store.setItemIdEdit ) 
    const handleEdit = () => {
        setItemIdEdit(item._id)
        router.push('/editIncomeData')
    }

  return (
    <Pressable 
        style={[globalStyles.cardContent, {backgroundColor: '#155dfc'}]}
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