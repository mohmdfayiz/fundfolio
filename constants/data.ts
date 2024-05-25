
const TRANSACTIONS = [
    {
        title: 'May 2022',
        total: '2000',
        data: [
            {
                id: 1,
                icon: '🛺',
                category: 'Travel',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'Cash',
                bgColour: 'bg-green-200'
            },
            {
                id: 2,
                icon: '🍲',
                category: 'Food',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'UPI',
                bgColour: 'bg-orange-200'
            }
        ],
    },
    {
        title: 'April 2022',
        total: '4000',
        data: [
            {
                id: 1,
                icon: '🛺',
                category: 'Travel',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'Cash',
                bgColour: 'bg-green-200'
            },
            {
                id: 2,
                icon: '🍲',
                category: 'Food',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'UPI',
                bgColour: 'bg-orange-200'
            },
            {
                id: 3,
                icon: '🎫',
                category: 'Entertainment',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'UPI',
                bgColour: 'bg-indigo-200'
            },
            {
                id: 4,
                icon: '🛺',
                category: 'Travel',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'Cash',
                bgColour: 'bg-green-200'
            },
            {
                id: 23,
                icon: '🍲',
                category: 'Food',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'UPI',
                bgColour: 'bg-orange-200'
            },
            {
                id: 35,
                icon: '🎫',
                category: 'Entertainment',
                date: '2022-01-01',
                amount: 100,
                transactionType: 'UPI',
                bgColour: 'bg-indigo-200'
            },
        ],
    }
]

const NOTES = [
    {
        id: 1,
        type: 'todo',
        title: 'Tasks to do on monday!',
        date: '12-05-2024',
        todos: [
            {
                id: 1,
                todo: 'Go for a walk',
                isCompleted: false
            },
            {
                id: 2,
                todo: 'Read for 10 minutes',
                isCompleted: false
            },
            {
                id: 3,
                todo: 'Start Developing your project!',
                isCompleted: false
            },
        ]
    },
    {
        id: 2,
        type: 'note',
        title: 'Tasks to do on monday to friday until next month!',
        date: '12-05-2024',
        bgColour: 'bg-indigo-200',
        note: 'Start the day by going for a walk. After fresh up, Read for 10 minutes. Have Break fast. Start Develop my project!\n\nhave a nice day!'
    },
    {
        id: 3,
        type: 'todo',
        title: 'Tasks to do on monday!',
        date: '12-05-2024',
        bgColour: 'bg-green-200',
        todos: [
            {
                id: 1,
                todo: 'Go for a walk',
                isCompleted: false
            },
            {
                id: 2,
                todo: 'Read for 10 minutes',
                isCompleted: false
            },
            {
                id: 3,
                todo: 'Start Developing your project!',
                isCompleted: false
            },
        ]
    },
    {
        id: 4,
        type: 'todo',
        title: 'Tasks to do on monday!',
        date: '12-05-2024',
        todos: [
            {
                id: 1,
                todo: 'Go for a walk',
                isCompleted: false
            },
            {
                id: 2,
                todo: 'Read for 10 minutes',
                isCompleted: false
            },
            {
                id: 3,
                todo: 'Start Developing your project!',
                isCompleted: false
            },
        ]
    },
    {
        id: 5,
        type: 'note',
        title: 'Tasks to do on monday to friday until next month!',
        date: '12-05-2024',
        bgColour: 'bg-indigo-200',
        note: 'Start the day by going for a walk. After fresh up, Read for 10 minutes. Have Break fast. Start Develop my project!\n\nhave a nice day!'
    },
    {
        id: 6,
        type: 'todo',
        title: 'Tasks to do on monday!',
        date: '12-05-2024',
        bgColour: 'bg-blue-200',
        todos: [
            {
                id: 1,
                todo: 'Go for a walk',
                isCompleted: false
            },
            {
                id: 2,
                todo: 'Read for 10 minutes',
                isCompleted: false
            },
            {
                id: 3,
                todo: 'Start Developing your project!',
                isCompleted: false
            },
        ]
    },
    {
        id: 8,
        type: 'note',
        title: 'Tasks to do on monday to friday until next month!',
        date: '12-05-2024',
        bgColour: 'bg-orange-200',
        note: 'Start the day by going for a walk. After fresh up, Read for 10 minutes. Have Break fast. Start Develop my project!\n\nhave a nice day!'
    },
    {
        id: 9,
        type: 'todo',
        title: 'Tasks to do on monday!',
        date: '12-05-2024',
        todos: [
            {
                id: 1,
                todo: 'Go for a walk',
                isCompleted: false
            },
            {
                id: 2,
                todo: 'Read for 10 minutes',
                isCompleted: false
            },
            {
                id: 3,
                todo: 'Start Developing your project!',
                isCompleted: false
            },
        ]
    },
]

const CATEGORIES = [
    {
        id: 1,
        name: 'Food',
    },
    {
        id: 2,
        name: 'Travel',
    },
    {
        id: 3,
        name: 'Shopping',
    },
    {
        id: 4,
        name: 'Entertainment',
    },
    {
        id: 5,
        name: 'Others',
    },
]

const PAYMENT_METHODS = [
    {
        id: 1,
        name: 'Cash',
    },
    {
        id: 2,
        name: 'Card',
    },
    {
        id: 3,
        name: 'UPI',
    },
]

export {
    TRANSACTIONS,
    NOTES,
    CATEGORIES,
    PAYMENT_METHODS
}