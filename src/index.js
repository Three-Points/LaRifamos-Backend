import 'module-alias/register'
import { version } from '../package.json'
import { ENVIRONMENT, PORT, DB_URL, SERVER_URL } from '@config/env'

import server from './server'

server.set('ENVIRONMENT', ENVIRONMENT)
server.set('PORT', PORT)
server.set('SERVER_URL', SERVER_URL)
server.set('DB_URL', DB_URL)
server.set('version', version)

server.listen(server.get('PORT'), () => {
    console.log(`⬢ LaRifamos - ${server.get('ENVIRONMENT')}`)
    console.log(`◌ Listening Server on ${server.get('SERVER_URL')}`)
    console.log(`◌ Database connection on ${server.get('DB_URL')}`)
    console.log(`◌ v${server.get('version')}`)
})
