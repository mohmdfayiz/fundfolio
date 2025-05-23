import { View, Text, StyleSheet } from "react-native"
import PieChart, { Slice } from 'react-native-pie-chart';
import { Stats } from "@/types";

const TransactionPieChart = ({ stats, month }: { stats: Stats, month: string }) => {

    const pieChartData = (stats: Stats) => {
        return stats.income === 0 && stats.expense === 0
            ? [{ value: 0.01, color: '#FA7070' }, { value: 0.01, color: '#A1C398' }]
            : [{ value: stats.expense * -1, color: '#FA7070' }, { value: stats.income, color: '#A1C398' }]
    }

    return (
        <View className='flex flex-row items-center px-4 p-5 bg-gray-200 rounded-2xl border border-gray-300'>
            <View>
                <View >
                    <View className=' flex flex-row items-baseline'>
                        <View className="w-2 h-3 bg-green rounded-full mr-1"></View>
                        <Text className='text-xl font-plight'>Income</Text>
                    </View>
                    <Text className='text-2xl font-psemibold'>₹ {stats.income}</Text>
                </View>

                <View className='mt-4'>
                    <View className='flex flex-row items-baseline'>
                        <View className="w-2 h-3 bg-red rounded-full mr-1"></View>
                        <Text className='text-xl font-plight'>Expense</Text>
                    </View>
                    <Text className='text-2xl font-psemibold'>₹ {stats.expense * -1}</Text>
                </View>
            </View>

            <View style={styles.chartContainer}>
                <View style={styles.chartOverlay}>
                    <Text className='text-xl font-psemibold'>{month}</Text>
                </View>
                <PieChart
                    widthAndHeight={130}
                    series={pieChartData(stats)}
                    cover={{ radius: 0.6, color: 'transparent' }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        marginLeft: 'auto',
        position: 'relative',
        width: 130,
        height: 130,
    },
    chartOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
});

export default TransactionPieChart