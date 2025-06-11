import AssetDashboardCard from "@/src/components/dashboard/AssetDashboardCard";
import ExpenseDashboardCard from "@/src/components/dashboard/ExpenseDashboardCard";
import IncomeDashboardCard from "@/src/components/dashboard/IncomeDashboardCard";
import IncomesExpensesChart from "@/src/components/dashboard/IncomesExpensesChart";
import LiabilityDashboardCard from "@/src/components/dashboard/LiabilityDashboardCard";
import TotalBalanceChart from "@/src/components/dashboard/TotalBalanceChart";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {  
  return (
    <SafeAreaView style={{paddingHorizontal: 30}}>
      <View style={styles.chartsContainer}>
        <TotalBalanceChart />   
        <IncomesExpensesChart />
      </View>
      
      <View style={styles.cardsContainer}>
        <IncomeDashboardCard />
        <ExpenseDashboardCard />
        <AssetDashboardCard />
        <LiabilityDashboardCard />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  chartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 25,
    marginTop: 50
  }
})
