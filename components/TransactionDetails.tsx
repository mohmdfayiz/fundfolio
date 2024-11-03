import { Modal, View, Pressable, Text, StyleSheet } from "react-native";
import dateFormat from "dateformat";
import { TransactionDetails } from "@/types";

const TransactionDetail = ({
    transaction,
    isOpen,
    onClose,
}: {
    transaction: TransactionDetails,
    isOpen: boolean,
    onClose: () => void,
}) => {
    return (
        <Modal
            visible={isOpen}
            onRequestClose={onClose}
            animationType="slide"
            transparent={true}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <View style={styles.container}>
                    {/* Header */}
                    <View className='flex flex-row justify-between items-center pb-4 border-b border-slate-200'>
                        <Text className='text-xl font-pbold'>Transaction Details</Text>
                        <Text className={`px-3 py-1 rounded-full text-sm font-pmedium ${transaction?.transactionType === 'Income'
                            ? 'bg-green/10 text-green'
                            : 'bg-red/10 text-red'
                            }`}>
                            {transaction?.transactionType}
                        </Text>
                    </View>

                    {/* Amount Section */}
                    <View className='items-center py-6 bg-slate-50 rounded-xl'>
                        <Text className='text-sm font-pmedium text-slate-500 mb-2'>Amount</Text>
                        <Text className={`text-3xl font-pbold ${transaction?.transactionType === 'Income'
                            ? 'text-green'
                            : 'text-red'
                            }`}>
                            ₹ {transaction?.transactionType === 'Income'
                                ? transaction.amount.toLocaleString()
                                : (transaction?.amount * -1).toLocaleString()
                            }
                        </Text>
                    </View>

                    {/* Details Grid */}
                    <View className='flex-row flex-wrap gap-4'>
                        <View className='flex-1 bg-slate-50 p-4 rounded-xl'>
                            <Text className='text-sm font-pmedium text-slate-500 mb-1'>Category</Text>
                            <Text className='text-base font-psemibold'>
                                {transaction?.category.icon} {transaction?.category.name}
                            </Text>
                        </View>
                        <View className='flex-1 bg-slate-50 p-4 rounded-xl'>
                            <Text className='text-sm font-pmedium text-slate-500 mb-1'>Payment Method</Text>
                            <Text className='text-base font-psemibold'>{transaction?.paymentMethod}</Text>
                        </View>
                    </View>

                    {/* Date and Description */}
                    <View className='bg-slate-50 p-4 rounded-xl'>
                        <Text className='text-sm font-pmedium text-slate-500 mb-1'>Date</Text>
                        <Text className='text-base font-psemibold mb-4'>
                            {dateFormat(transaction?.createdAt, "dddd, dd mmm yyyy")}
                        </Text>

                        <Text className='text-sm font-pmedium text-slate-500 mb-1'>Description</Text>
                        <Text className='text-base font-psemibold'>
                            {transaction?.description || 'No description added'}
                        </Text>
                    </View>

                    {/* Action Buttons */}
                    <View className="mt-auto">
                        <Pressable
                            onPress={onClose}
                            className='border border-slate-300 p-4 rounded-xl bg-white'
                        >
                            <Text className='text-center text-base font-psemibold'>
                                Close Details
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        gap: 16,
        maxHeight: '85%'
    }
});

export default TransactionDetail;