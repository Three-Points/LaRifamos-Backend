import dayjs from 'dayjs'

export const mockTicket = {
    number: '3b8cd0d2-5f88-4518-b2c8-a119745d83e3',
    raffle: {
        id: 1,
        name: 'Green Card',
        description:
            'cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut',
        category: 'EVENT',
        ticketCost: 915,
        drawDate: dayjs().toDate(),
        deliveryDate: dayjs().toDate(),
        state: 'FINISHED',
        type: 'COMBO',
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
    },
    account: {
        id: 1,
        name: 'Bethina Tompsett',
        email: 'btompsett0@narod.ru',
        password:
            '$2b$10$QN9y4ZNsOeMegY5FZPSYQu9.9gfouM1A1OkzvK/BzsPJ0REvboO6q',
        role: 'USER',
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
    },
}
