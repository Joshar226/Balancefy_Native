import { useStore } from '@/src/store'
import { globalStyles } from '@/src/styles/styles'
import { Asset } from '@/src/types'
import { formatCurrency } from '@/src/utils/utils'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

type AssetCardProps = {
    item: Asset
}

export default function AssetCard({ item }: AssetCardProps) {
  const router = useRouter()
    const setItemIdEdit = useStore( store => store.setItemIdEdit ) 
    const handleEdit = () => {
      setItemIdEdit(item._id)
      router.push('/editAssetData')
    }
  
    return (
      <Pressable 
        style={[globalStyles.cardContent, {backgroundColor: '#008236'}]}
        onPress={handleEdit}
      >
        <View style={globalStyles.cardTextContent}>
          <Text style={globalStyles.cardText}>{item.title}</Text>
          <Text style={globalStyles.cardText}>{formatCurrency(+item.value)}</Text>
        </View>
      </Pressable>
    )
}
