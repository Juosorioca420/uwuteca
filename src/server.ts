import express from 'express'
import { getPayloadClient } from './getPayload'
import { nextApp, nextHandler } from './next-utils'

import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc'

const app = express()
const PORT = Number(process.env.PORT) || 3000 // puerto local 3000 para desarrollo

const createContext = ( {req, res} : trpcExpress.CreateExpressContextOptions ) => ({
    req, res,
})

const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin url ${cms.getAdminURL()}`)
            },
        },
    })

    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
            router : appRouter,
            createContext,
        })
    )

    app.use( (req, res) => nextHandler(req, res) )

    // prepare() devuelve una promesa; .then() ejecuta código una vez que la aplicación esté lista. 
    nextApp.prepare().then( () => {
        payload.logger.info('Servidor inicializado.')

        app.listen( PORT, async () => {
            payload.logger.info( `Next App url: ${process.env.NEXT_PUBLIC_SERVER_URL}` )
        })
    })

}

// arrancar el servidor
start()
