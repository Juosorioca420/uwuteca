import { getPayloadClient } from '../getPayload'
import {publicProcedure, router} from './trpc'
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const authRouter = router({
    createPayloadUser : publicProcedure.input(AuthCredentialsValidator)
    .mutation( async ({input}) => {

        const {email, password} = input
        const payload = await getPayloadClient()

        // verificar que el correo no este ya rejustrado
        const { docs:users } = await payload.find( {
            collection : 'users',
            where : {
                email : {equals : email,},
            },
        } )

        if (users.length !== 0){ throw new TRPCError( { code: 'CONFLICT' } ) }

        await payload.create( { collection : 'users', data : {email, password, role : 'user'}, } )

        return {success : true, sentToEmail : email}

    }),

    verifyEmail : publicProcedure.input( z.object( {token : z.string()} ) ).query( async ({input}) => {

        const {token} = input
        const payload = await getPayloadClient()
        const is_verify = await payload.verifyEmail( { collection : 'users', token } )

        if (!is_verify){ throw new TRPCError({code : 'UNAUTHORIZED'}) }

        return { success : true }

    }),

    signIn : publicProcedure.input(AuthCredentialsValidator).mutation( async ({input, ctx}) => {

        const {email, password} = input
        const payload = await getPayloadClient()
        const {res} = ctx

        try{
            await payload.login({ 
                collection : 'users', 
                data : {email, password},
                res : res,
            })

            return {success: true}
        }
        catch (e) {
            throw new TRPCError( {code: 'UNAUTHORIZED'} )
        }

    }),
    
})
