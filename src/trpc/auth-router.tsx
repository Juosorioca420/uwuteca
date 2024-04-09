import { getPayloadClient } from '../getPayload'
import {publicProcedure, router} from './trpc'
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { ForgotValidator } from '../lib/validators/forgot-pswd-validator'

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

    sendPasswordToken : publicProcedure.input(ForgotValidator)
    .mutation( async ({input}) => {
        const {email} = input
        const payload = await getPayloadClient()

        // verificar que el correo este ya registrado
        const { docs:found } = await payload.find( {
            collection : 'users',
            where : { email : {equals : email,}, },
        } )
        // if (found.length < 1){ throw new TRPCError( { code: 'NOT_FOUND' } ) }


        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: { 'Content-Type': 'application/json', },
        })

        if (response.ok){ return { success : true, sentToEmail : email } }
        else{ throw new TRPCError( {code: 'INTERNAL_SERVER_ERROR'} ) }

    }),
    
})
