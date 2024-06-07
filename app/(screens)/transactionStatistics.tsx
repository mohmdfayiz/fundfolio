import TabTitle from "@/components/TabTitle";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionCategory() {
    return (
        <SafeAreaView>
            <View className="flex justify-between h-full p-4">
                <View>
                    <TabTitle title='Statistics' icon='📈' subTitle='Analyze Your Data!' />
                </View>
            </View>
        </SafeAreaView>
    );
}