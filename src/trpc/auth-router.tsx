import { getPayloadClient } from '../getPayload'
import {publicProcedure, router} from './trpc'
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator'
import { TRPCError } from '@trpc/server'

export const authRouter = router({
    createPayloadUser : publicProcedure.input(AuthCredentialsValidator)
    .mutation( async ({input}) => {

        const {email, password} = input
        const payload = await getPayloadClient()

        // verificar que el correo no este ya rejustrado
        const { docs:found } = await payload.find( {
            collection : 'users',
            where : {
                email : {equals : email}
            },
        } )

        if (found.length !== 0){ throw new TRPCError( { code: 'CONFLICT' } ) }

        await payload.create( { collection : 'users', data : {email, password, role : 'user'} } )

        return {success : true, sentToEmail : email}

    }),
})
