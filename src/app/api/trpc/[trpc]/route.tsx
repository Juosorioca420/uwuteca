import { appRouter } from '@/trpc'
import {fetchRequestHandler} from '@trpc/server/adapters/fetch'

const handler = ( req: Request ) => {

    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        // @ts-expect-error
        createContext: () => ({}), // express se encarga de crear el contexto 
    })

}

export {handler as GET, handler as POST}
