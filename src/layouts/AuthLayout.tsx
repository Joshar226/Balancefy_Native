import { useFonts } from 'expo-font'
import React, { ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AuthLayout({children} : {children : ReactNode}) {

    const [ loadedFonts ] = useFonts({
        Tagesschrift : require('../../assets/fonts/Tagesschrift-Regular.ttf')
    })

    if(!loadedFonts) return

  return (
    <SafeAreaView style={styles.content}>
        <Text style={styles.logo}>Balancefy</Text>
        <Text style={styles.subtitle}>Visualize your money</Text>
        <Text style={styles.subtitle}>Master your future</Text>
        {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#18183d', 
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    },
    logo: {
        color: '#fff',
        fontFamily: 'Tagesschrift',
        fontSize: 40
    },
    subtitle: {
        color: '#fff',
        fontFamily: 'Tagesschrift',
        fontSize: 25,
        textAlign: 'center'
    }
})
