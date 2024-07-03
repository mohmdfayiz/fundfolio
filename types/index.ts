type User = {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
}

// ===== Transaction Types =====
type TransactionDetails = {
    _id: string;
    amount: number;
    category: {
        name: string;
        icon: string;
        bgColour: string;
    };
    paymentMethod: string;
    transactionType: string;
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


export { User, TransactionDetails, TransactionGroup, Stats, Category, Note, TabTitleProps }