import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer
        initialRouteName='index'>
        <Drawer.Screen name='index' options={{
          title: 'Dashboard'
        }}/>
        
        <Drawer.Screen name='incomes' options={{
          title: 'Incomes'
        }}/>

        <Drawer.Screen name='expenses' options={{
          title: 'Expenses'
        }}/>

        <Drawer.Screen name='assets' options={{
          title: 'Assets'
        }}/>

        <Drawer.Screen name='liabilities' options={{
          title: 'Liabilities'
        }}/>

        <Drawer.Screen name='profile' options={{
          title: 'Profile'
        }}/>
        </Drawer>
    </GestureHandlerRootView>
  )
}
