import Controller from '@controllers/Ticket.controller'
import Model from '@models/Ticket.model'
import { expectTicket } from './ticket.expect'
import { mockTicket } from './ticket.mock'

const mockFindMany = jest.spyOn(Model.prototype, 'findMany')
const mockFindUnique = jest.spyOn(Model.prototype, 'findUnique')
const mockCreate = jest.spyOn(Model.prototype, 'create')

afterEach(() => {
    jest.clearAllMocks()
})

describe('Unit test on Ticket controller', () => {
    const controller = new Controller()

    describe('when looking for tickets', () => {
        test('should return a list of tickets', async () => {
            console.log(mockTicket)
            // mockFindMany.mockImplementationOnce(() =>
            //     Promise.resolve([mockTicket])
            // )
            // const tickets = await controller.findTickets({})
            // expect(tickets).toEqual(expect.arrayContaining([expectTicket]))
        })
    })
})
