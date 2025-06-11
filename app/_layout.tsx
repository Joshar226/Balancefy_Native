import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import ToastManager from 'toastify-react-native';

export default function RootLayout() {

  const queryClient = new QueryClient

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Stack
          screenOptions={{
            headerShown: false
          }}
          initialRouteName='(auth)' 
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
          <Stack.Screen name="changePassword" />
          <Stack.Screen name="editIncomeData" />
          <Stack.Screen name="editExpenseData" />
          <Stack.Screen name="editAssetData" />
          <Stack.Screen name="editLiabilityData" />
        </Stack>
        <ToastManager />
      </PaperProvider>
    </QueryClientProvider>
  )
}
