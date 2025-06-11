import { useStore } from '@/src/store'
import { globalStyles } from '@/src/styles/styles'
import { Liability } from '@/src/types'
import { formatCurrency } from '@/src/utils/utils'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

type LiabilityCardProps = {
  item: Liability
}

export default function LiabilityCard({item} : LiabilityCardProps) {
  const router = useRouter()
      const setItemIdEdit = useStore( store => store.setItemIdEdit ) 
      const handleEdit = () => {
        setItemIdEdit(item._id)
        router.push('/editLiabilityData')
      }
  
    return (
      <Pressable 
          style={[globalStyles.cardContent, {backgroundColor: '#f54a00'}]}
          onPress={handleEdit}
      >
          <View style={globalStyles.cardTextContent}>
              <Text style={globalStyles.cardText}>{item.title}</Text>
              <Text style={globalStyles.cardText}>{formatCurrency(+item.value)}</Text>
          </View>
      </Pressable>
    )
}
