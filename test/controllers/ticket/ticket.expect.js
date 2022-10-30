import { expectRaffle } from '../raffle/raffle.expect'

export const expectTicket = {
    number: expect.any(String),
    name: expect.any(String),
    drawDate: expect.any(Date),
    participants: expect.any(Number),
    ticketCost: expect.any(Number),
    state: expect.any(String),
    type: expect.any(String),
    category: expect.any(String),
    products: expect.arrayContaining([
        expect.objectContaining({
            images: expect.arrayContaining([expect.any(String)]),
        }),
    ]),
}
