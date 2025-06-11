import { getExpenses } from "@/src/api/ExpenseAPI"
import { globalStyles } from "@/src/styles/styles"
import { useQuery } from "@tanstack/react-query"
import { Link } from "expo-router"
import { Text, View } from 'react-native'
import { formatCurrency } from "../../utils/utils"
import Spinner from "../Spinner"


export default function ExpenseDashboardCard() {
  const {data, isLoading} = useQuery({
    queryFn: getExpenses,
    queryKey: ['expenses']
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)
  
  if(data)
  return (
    <Link href={'/(app)/expenses'}>
      <View style={[globalStyles.dashboardCard, {backgroundColor: '#c10007'}]}>
        <Text style={globalStyles.dashboardCardText}>Expenses</Text>
        <Text style={globalStyles.dashboardCardText}>{formatCurrency(total)}</Text>
      </View>
    </Link>
  )
}
