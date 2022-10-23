export const expectRaffle = {
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
