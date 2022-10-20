import dayjs from 'dayjs'

export default [
    {
        id: 1,
        name: 'Bethina Tompsett',
        email: 'btompsett0@narod.ru',
        password: 'PTszph3',
        role: 'USER',
        createdAt: dayjs('2022-04-10T16:58:49Z').format(),
        updatedAt: dayjs('2022-04-10T16:58:49Z').format(),
    },
    {
        id: 2,
        name: 'Erina Ismay',
        email: 'eismay1@topsy.com',
        password: 'vywPM4BYr0C',
        role: 'COMPANY',
        createdAt: dayjs('2022-04-09T12:45:04Z').format(),
        updatedAt: dayjs('2022-04-09T12:45:04Z').format(),
        shared: {
            connect: [{ id: 6 }],
        },
    },
    {
        id: 3,
        name: 'Alisha Adan',
        email: 'aadan2@unc.edu',
        password: 'ZFRlGroMYhq',
        role: 'USER',
        createdAt: dayjs('2021-11-17T05:59:57Z').format(),
        updatedAt: dayjs('2021-11-17T05:59:57Z').format(),
        shared: {
            connect: [{ id: 5 }, { id: 4 }],
        },
    },
    {
        id: 4,
        name: 'Moyna Corsham',
        email: 'mcorsham3@soup.io',
        password: 'EcoOIE',
        role: 'USER',
        createdAt: dayjs('2022-07-13T22:06:43Z').format(),
        updatedAt: dayjs('2022-07-13T22:06:43Z').format(),
        liked: {
            connect: [{ id: 3 }],
        },
    },
    {
        id: 5,
        name: 'Mariquilla Beard',
        email: 'mbeard4@wikimedia.org',
        password: 'fi7SgBQZYv',
        role: 'USER',
        createdAt: dayjs('2022-01-06T19:32:19Z').format(),
        updatedAt: dayjs('2022-01-06T19:32:19Z').format(),
    },
    {
        id: 6,
        name: 'Auroora Marshalleck',
        email: 'amarshalleck5@howstuffworks.com',
        password: 'LjAtbz3FDe',
        role: 'COMPANY',
        createdAt: dayjs('2021-10-07T20:03:57Z').format(),
        updatedAt: dayjs('2021-10-07T20:03:57Z').format(),
        liked: {
            connect: [{ id: 3 }, { id: 7 }],
        },
        shared: {
            connect: [{ id: 6 }, { id: 7 }],
        },
    },
    {
        id: 7,
        name: 'Vaughn Fere',
        email: 'vfere6@miibeian.gov.cn',
        password: 'XNvrOH6uwR',
        role: 'COMPANY',
        createdAt: dayjs('2021-11-01T11:31:04Z').format(),
        updatedAt: dayjs('2021-11-01T11:31:04Z').format(),
        liked: {
            connect: [{ id: 5 }, { id: 5 }, { id: 1 }],
        },
    },
    {
        id: 8,
        name: 'Brittni Whitehorne',
        email: 'bwhitehorne7@accuweather.com',
        password: 'alJLDw',
        role: 'USER',
        createdAt: dayjs('2022-02-26T00:27:37Z').format(),
        updatedAt: dayjs('2022-02-26T00:27:37Z').format(),
        liked: {
            connect: [{ id: 5 }, { id: 7 }, { id: 2 }],
        },
        shared: {
            connect: [{ id: 4 }, { id: 6 }, { id: 7 }],
        },
    },
    {
        id: 9,
        name: 'Jonell Timmes',
        email: 'jtimmes8@paginegialle.it',
        password: 'Glc5VDIlx',
        role: 'COMPANY',
        createdAt: dayjs('2022-09-21T23:12:42Z').format(),
        updatedAt: dayjs('2022-09-21T23:12:42Z').format(),
        liked: {
            connect: [{ id: 2 }, { id: 5 }, { id: 1 }],
        },
        shared: {
            connect: [{ id: 7 }],
        },
    },
    {
        id: 10,
        name: 'Rene Beagrie',
        email: 'rbeagrie9@wufoo.com',
        password: 'EdSltRIqRdT',
        role: 'USER',
        createdAt: dayjs('2021-10-12T10:44:38Z').format(),
        updatedAt: dayjs('2021-10-12T10:44:38Z').format(),
        liked: {
            connect: [{ id: 5 }, { id: 1 }],
        },
        shared: {
            connect: [{ id: 7 }],
        },
    },
]
