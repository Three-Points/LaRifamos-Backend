import dayjs from 'dayjs'

export const mockAccount = {
    id: 1,
    name: 'Bethina Tompsett',
    email: 'btompsett0@narod.ru',
    password: '$2b$10$QN9y4ZNsOeMegY5FZPSYQu9.9gfouM1A1OkzvK/BzsPJ0REvboO6q',
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
