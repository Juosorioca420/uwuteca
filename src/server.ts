import express from 'express'
import { getPayloadClient } from './getPayload'
import { nextApp, nextHandler } from './next-utils'

const app = express()
const PORT = Number(process.env.PORT) || 3000 // puerto local 3000 para desarrollo

const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin url ${cms.getAdminURL()}`)
            },
        },
    })

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
