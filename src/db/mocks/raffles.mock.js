import dayjs from 'dayjs'
import products from '@mocks/products.mock'

export default [
    {
        name: 'Greedy',
        description:
            'laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui',
        category: 'CELLPHONE',
        ticketCost: 532,
        drawDate: dayjs('2022-09-03T07:18:41Z').format(),
        deliveryDate: dayjs('2022-10-03T17:01:01Z').format(),
        state: 'REJECTED',
        type: 'COMBO',
        createdAt: dayjs('2022-09-27T18:29:53Z').format(),
        updatedAt: dayjs('2022-09-29T07:58:20Z').format(),
        products: {
            create: [products[0], products[1]],
        },
    },
    {
        name: 'Mother and Son (Mat i syn)',
        description:
            'ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia',
        category: 'EVENT',
        ticketCost: 964,
        drawDate: dayjs('2022-09-27T13:51:49Z').format(),
        deliveryDate: dayjs('2022-09-01T21:22:00Z').format(),
        state: 'CANCELED',
        type: 'COMMON',
        createdAt: dayjs('2022-09-23T18:20:28Z').format(),
        updatedAt: dayjs('2022-09-08T08:29:53Z').format(),
        products: {
            create: [products[2], products[3]],
        },
    },
    {
        name: 'Long Time Dead',
        description:
            'rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue',
        category: 'TRAVEL',
        ticketCost: 825,
        drawDate: dayjs('2022-09-21T05:59:20Z').format(),
        deliveryDate: dayjs('2022-09-13T17:58:04Z').format(),
        state: 'PASSED',
        type: 'COMMON',
        createdAt: dayjs('2022-09-02T16:59:30Z').format(),
        updatedAt: dayjs('2022-09-09T11:36:08Z').format(),
        products: {
            create: [products[4]],
        },
    },
    {
        name: 'Hoffa',
        description:
            'orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed',
        category: 'EVENT',
        ticketCost: 709,
        drawDate: dayjs('2022-10-12T20:42:04Z').format(),
        deliveryDate: dayjs('2022-10-05T05:25:09Z').format(),
        state: 'PASSED',
        type: 'COMBO',
        createdAt: dayjs('2022-09-13T21:36:57Z').format(),
        updatedAt: dayjs('2022-10-03T06:01:09Z').format(),
        products: {
            create: [products[5]],
        },
    },
    {
        name: 'Mafioso',
        description:
            'vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum',
        category: 'TRAVEL',
        ticketCost: 727,
        drawDate: dayjs('2022-09-12T11:08:27Z').format(),
        deliveryDate: dayjs('2022-10-05T06:22:53Z').format(),
        state: 'WAITING',
        type: 'COMMON',
        createdAt: dayjs('2022-09-21T21:49:49Z').format(),
        updatedAt: dayjs('2022-09-04T18:59:06Z').format(),
        products: {
            create: [products[6]],
        },
    },
    {
        name: 'Halloween III: Season of the Witch',
        description:
            'donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam',
        category: 'CELLPHONE',
        ticketCost: 561,
        drawDate: dayjs('2022-09-05T11:59:47Z').format(),
        deliveryDate: dayjs('2022-09-08T20:31:23Z').format(),
        state: 'PASSED',
        type: 'COMMON',
        createdAt: dayjs('2022-10-07T14:49:54Z').format(),
        updatedAt: dayjs('2022-09-26T17:12:16Z').format(),
        products: {
            create: [products[7], products[8]],
        },
    },
    {
        name: 'Green Card',
        description:
            'cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut',
        category: 'EVENT',
        ticketCost: 915,
        drawDate: dayjs('2022-09-19T17:02:07Z').format(),
        deliveryDate: dayjs('2022-09-10T04:49:49Z').format(),
        state: 'FINISHED',
        type: 'COMBO',
        createdAt: dayjs('2022-10-02T11:41:37Z').format(),
        updatedAt: dayjs('2022-09-27T04:18:26Z').format(),
        products: {
            create: [products[9]],
        },
    },
]
