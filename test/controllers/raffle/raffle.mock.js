import dayjs from 'dayjs'

export const mockRaffle = {
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
    tickets: [
        {
            number: '3b8cd0d2-5f88-4518-b2c8-a119745d83e3',
        },
    ],
    products: [
        {
            id: 1,
            name: 'Melicope peduncularis (Levl.) T.G. Hartley & B.C. Stone',
            details:
                'arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo',
            marketCost: 1527.76,
            state: 'NEW',
            createdAt: dayjs().toDate(),
            updatedAt: dayjs().toDate(),
            raffleId: 1,
            images: [
                { url: 'https://picsum.photos/200/300' },
                { url: 'https://picsum.photos/200/300' },
            ],
        },
    ],
}
