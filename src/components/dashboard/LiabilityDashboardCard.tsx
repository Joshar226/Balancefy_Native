import { getLiabilities } from "@/src/api/LiabilityAPI"
import { globalStyles } from "@/src/styles/styles"
import { useQuery } from "@tanstack/react-query"
import { Link } from "expo-router"
import { Text, View } from 'react-native'
import { formatCurrency } from "../../utils/utils"
import Spinner from "../Spinner"

export default function LiabilityDashboardCard() {
  const {data, isLoading} = useQuery({
    queryFn: getLiabilities,
    queryKey: ['liabilities']
  })

  if(isLoading) return <Spinner />

  const total = (data ?? []).reduce((total, item) => total + +item.value, 0)

  if(data)
  return (
    <Link href={'/(app)/assets'}>
      <View style={[globalStyles.dashboardCard, {backgroundColor: '#f54a00'}]}>
        <Text style={globalStyles.dashboardCardText}>Assets</Text>
        <Text style={globalStyles.dashboardCardText}>{formatCurrency(total)}</Text>
      </View>
    </Link>
  )
}
