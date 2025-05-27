type User = {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
}

// ===== Transaction Types =====
type Transaction = {
    _id?: string;
    amount: number;
    category: string;
    paymentMethod: string;
    transactionType: string;
    description?: string;
    createdAt: Date;
}

type TransactionDetails = {
    _id: string;
    amount: number;
    category: {
        _id: string;
        name: string;
        icon: string;
        bgColour: string;
    };
    paymentMethod: string;
    transactionType: string;
    description?: string;
    createdAt: Date;
}
type TransactionGroup = {
    _id: { month: number, year: number };
    totalAmount: number;
    data: TransactionDetails[];
};

type Stats = {
    totalAmount: number;
    income: number;
    expense: number;
}

type Category = {
    _id?: string;
    name: string;
    icon: string;
    bgColour: string;
    createdAt?: Date;
}

type ExpenseByCategory = {
    _id: string;
    name: string;
    icon: string;
    bgColour: string;
    totalAmount: number;
    percentageOfIncome: number;
    percentageOfExpense?: number;
    count: number;
}

// ===== Note Types =====
type Note = {
    _id?: string;
    title: string;
    content: string;
    pinned: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ===== Other Types =====
type TabTitleProps = {
    title: string
    icon: string
    subTitle: string
}


export {
    User,
    Transaction,
    TransactionDetails,
    TransactionGroup,
    Stats,
    Category,
    ExpenseByCategory,
    Note,
    TabTitleProps
}