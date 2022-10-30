import Account from '@controllers/Account.controller'
import Ticket from '@controllers/Ticket.controller'

const account = new Account()
const ticket = new Ticket()

//TODO
export const getParticipantsRaffle = async (raffleId) => {
    return ticket.findTickets({ raffle: { id: raffleId } })
}

export const getEnrolledRaffles = async (email) => {
    const { id } = await account.findAccount({ email })
    return ticket.findTickets({ account: { id } })
}
