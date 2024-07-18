
const APP_LINK = 'https://fundfolio.vercel.app/ \n\nCheck out fundfolio. \nManage your transactions and notes effortlessly!';

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
        icon: '🍟',
        bgColour: '#bbf7d0',
    },
    {
        name: 'Transport',
        icon: '🛺',
        bgColour: '#fef08a',
    },
    {
        name: 'Shopping',
        icon: '🛒',
        bgColour: '#c7d2fe',
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
        name: 'INR',
        symbol: '₹',
    },
    {
        id: 1,
        name: 'USD',
        symbol: '$',
    },
    {
        id: 2,
        name: 'EUR',
        symbol: '€',
    },
    {
        id: 3,
        name: 'GBP',
        symbol: '£',
    },
    {
        id: 4,
        name: 'JPY',
        symbol: '¥',
    },
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
    TRANSACTION_CATEGORY_COLOR_MAP,
    SAMPLE_CATEGORIES,
    MONTHS,
    YEARS,
    CURRENCIES,
    APP_LOCK_ENUM,
}