import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_TOKEN } from '@config/env'
import Account from '@controllers/Account.controller'
import ErrorServer from '@controllers/ErrorServer.controller'

export default class AuthController {
    #controller = new Account()
    #token = JWT_TOKEN

    async authentication({ email, password }) {
        if (!email || !password)
            throw new ErrorServer(
                'UNAUTHORIZED',
                'Email or password is missing'
            )
        const account = await this.#controller.findAccount({
            email,
        })
        if (!account || !(await bcrypt.compare(password, account?.password)))
            throw new ErrorServer('UNAUTHORIZED', 'Email or password is wrong')
        const payload = { email: account.email, name: account.name }
        return { token: jwt.sign(payload, this.#token) }
    }

    async verification(token) {
        try {
            const { email } = jwt.verify(token, this.#token)
            const account = await this.#controller.findAccount({ email })
            return {
                name: account.name,
                email: account.email,
            }
        } catch (error) {
            throw new ErrorServer('UNAUTHORIZED', 'Token is invalid')
        }
    }
}
