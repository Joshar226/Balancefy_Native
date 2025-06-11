import { globalStyles } from "@/src/styles/styles"
import { useQuery } from "@tanstack/react-query"
import { Link } from "expo-router"
import { Text, View } from 'react-native'
import { getIncomes } from "../../api/IncomeAPI"
import { formatCurrency } from "../../utils/utils"
import Spinner from "../Spinner"

export default function IncomeDashboardCard() {

  const {data, isLoading} = useQuery({
    queryFn: getIncomes,
    queryKey: ['incomes']
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)
  
  if(data)
  return (
    <Link href={'/(app)/incomes'}>
      <View style={[globalStyles.dashboardCard, {backgroundColor: '#155dfc'}]}>
        <Text style={globalStyles.dashboardCardText}>Incomes</Text>
        <Text style={globalStyles.dashboardCardText}>{formatCurrency(total)}</Text>
      </View>
    </Link>
  )
}
