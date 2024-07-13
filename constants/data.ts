
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

export {
    APP_LINK,
    PAYMENT_METHODS,
    TRANSACTION_CATEGORY_COLOR_MAP,
    SAMPLE_CATEGORIES,
    MONTHS
}