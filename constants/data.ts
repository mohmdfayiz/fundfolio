
const APP_LINK = 'https://play.google.com/store/apps/details?id=com.fundfolio \n\nCheck out fundfolio. \nManage your transactions and notes effortlessly!';

const PAYMENT_METHODS = [
    {
        id: 0,
        name: 'Bank a/c',
    },
    {
        id: 1,
        name: 'Card',
    },
    {
        id: 2,
        name: 'Cash',
    },
    {
        id: 3,
        name: 'UPI',
    },
]

const TRANSACTION_NOTE_EXAMPLES = [
    "Lunch with colleagues",
    "Monthly rent payment",
    "Shopping at Amazon",
    "Birthday gift for mom",
    "Grocery shopping at Walmart",
    "Uber ride to work",
    "Coffee meeting with client",
    "Movie tickets with friends",
    "Internet bill payment",
    "Gym membership fee",
    "Medical appointment",
    "Car maintenance",
    "Home utilities",
    "Hotel reservation",
];

const TRANSACTION_CATEGORY_COLOR_MAP = [
    '#fecaca',
    '#fed7aa',
    '#fef08a',
    '#bbf7d0',
    '#c7d2fe',
]


const SAMPLE_CATEGORIES = [
    {
        name: 'Food',
        icon: '🍽️',
        bgColour: '#bbf7d0',
    },
    {
        name: 'Transport',
        icon: '🛺',
        bgColour: '#fef08a',
    },
    {
        name: 'Shopping',
        icon: '🛍️',
        bgColour: '#c7d2fe',
    },
    {
        name: 'Subscription',
        icon: '♻️',
        bgColour: '#fed7aa',
    },
    {
        name: 'Miscellaneous',
        icon: '🏁',
        bgColour: '#fecaca',
    },
]

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

const CURRENCIES = [
    {
        id: 0,
        name: 'Rupee',
        symbol: '₹',
    },
    {
        id: 1,
        name: 'Dollar',
        symbol: '$',
    },
    {
        id: 2,
        name: 'Euro',
        symbol: '€',
    },
    {
        id: 3,
        name: 'Pound',
        symbol: '£',
    },
    {
        id: 4,
        name: 'Dirham',
        symbol: 'د.إ',
    },
    {
        id: 5,
        name: 'Riyal',
        symbol: '﷼',
    }
]

const APP_LOCK_ENUM = {
    NOT_ENROLLED: 'NOT_ENROLLED',
    NOT_AVAILABLE: 'NOT_AVAILABLE',
    NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
    AUTHENTICATED: 'AUTHENTICATED',
}

export {
    APP_LINK,
    PAYMENT_METHODS,
    TRANSACTION_NOTE_EXAMPLES,
    TRANSACTION_CATEGORY_COLOR_MAP,
    SAMPLE_CATEGORIES,
    MONTHS,
    YEARS,
    CURRENCIES,
    APP_LOCK_ENUM,
}