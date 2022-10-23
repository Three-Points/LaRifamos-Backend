import dayjs from 'dayjs'

export const mockAccount = {
    id: 1,
    name: 'Bethina Tompsett',
    email: 'btompsett0@narod.ru',
    password: '$2b$10$x/EPic1bki/3NSxpt3JKcefQQHs0H2bRmMv7KfzN742/OCsNDTXPG',
    role: 'USER',
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
    liked: [
        {
            id: 3,
            name: 'Long Time Dead',
            description:
                'rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue',
            category: 'TRAVEL',
            ticketCost: 825,
            drawDate: dayjs().toDate(),
            deliveryDate: dayjs().toDate(),
            state: 'PASSED',
            type: 'COMMON',
            createdAt: dayjs().toDate(),
            updatedAt: dayjs().toDate(),
        },
    ],
    shared: [
        {
            id: 3,
            name: 'Long Time Dead',
            description:
                'rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue',
            category: 'TRAVEL',
            ticketCost: 825,
            drawDate: dayjs().toDate(),
            deliveryDate: dayjs().toDate(),
            state: 'PASSED',
            type: 'COMMON',
            createdAt: dayjs().toDate(),
            updatedAt: dayjs().toDate(),
        },
    ],
}
