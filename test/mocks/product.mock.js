import dayjs from 'dayjs'
import { images } from './product_images.mock'

export const product = {
    id: 1,
    name: 'Melicope peduncularis (Levl.) T.G. Hartley & B.C. Stone',
    details:
        'arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo',
    marketCost: 1527.76,
    state: 'NEW',
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
    images,
    raffleId: 1,
}
