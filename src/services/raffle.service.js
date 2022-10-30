import Account from '@controllers/Account.controller'
import Raffle from '@controllers/Raffle.controller'

const account = new Account()
const raffle = new Raffle()

/**
 * @description Find all raffles.
 * @param raffleId raffleId request object.
 * @returns User array. */
export const getRaffle = (raffleId) => {
    return raffle.findRaffleId({ id: raffleId })
}

/**
 * @description Find all raffles.
 * @param filter Filter request object.
 * @returns User array. */
export const getRaffles = (filter) => {
    return raffle.findRaffles(filter)
}

/**
 * @description
 * Like/Unlike an account with a raffle as connection/disconnection.
 * @param {string} email Email of an account.
 * @param {number} raffleId ID of a raffle.
 * @throws SERVER, id parameter is mandatory.
 * @throws SERVER, raffleId parameter is mandatory.
 * @throws NOT_FOUND, Account not found. */
export const postRateRaffle = async (email, raffleId) => {
    const { id: accountId } = await account.findAccount({ email })
    await account.rateRaffle({ accountId }, { raffleId })
}

/**
 * @description
 * To share, connect an account with a raffle.
 * @param {string} email Email of an account.
 * @param {number} raffleId ID of a raffle.
 * @throws SERVER, id parameter is mandatory.
 * @throws SERVER, raffleId parameter is mandatory.
 * @throws NOT_FOUND, Account not found. */
export const postShareRaffle = async (email, raffleId) => {
    const { id: accountId } = await account.findAccount({ email })
    await account.shareRaffle({ accountId }, { raffleId })
}

/**
 * @description
 * Returns a list of raffles liked by an account.
 * @param {string} email Email of an account. */
export const getLikedRaffles = (email) => {
    return account.findLikedRaffles({ email })
}
