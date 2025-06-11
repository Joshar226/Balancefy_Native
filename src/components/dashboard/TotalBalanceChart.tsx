import { getAllData } from '@/src/api/DashboardAPI';
import { globalStyles } from '@/src/styles/styles';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';
import Spinner from '../Spinner';


export default function TotalBalanceChart() {
    const { data, isLoading } = useQuery({
        queryFn: getAllData,
        queryKey: ["allData"],
    });

    if( isLoading || typeof data !== "object" ) return <Spinner />
    
    const colors: Record<string, string> = {
        assets: "#008236",
        expenses: "#c10007",
        incomes: "#155dfc",
        liabilities: "#f54a00",
    };

    const result = Object.entries(data).map(([key, items]) => {
        const value = items.reduce((sum, item) => sum + parseFloat(item.value), 0);
        return { value, color: colors[key] };
    });

  return (
    <View style={globalStyles.chartContainer}>
        <Text style={globalStyles.chartTitle}>Total Balance</Text>
        <PieChart widthAndHeight={140} cover={0.4} series={result} />
    </View>
  )
}
