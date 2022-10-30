import dayjs from 'dayjs'
import { product } from './product.mock'

export const raffle = {
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
    products: [product],
}
