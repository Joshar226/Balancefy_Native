import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

export default function Spinner() {
  return (
    <ActivityIndicator animating={true} color='#18183d' style={{flex: 1}} size={'large'} />
  )
}
