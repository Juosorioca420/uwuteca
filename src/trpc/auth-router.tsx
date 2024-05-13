import { getPayloadClient } from '../getPayload'
import {publicProcedure, router} from './trpc'
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { ForgotValidator } from '../lib/validators/forgot-pswd-validator'
import { SignUpValidator } from '../lib/validators/signup-credentials-validator'
import { User } from '../payload-types'

export const authRouter = router({
    createPayloadUser : publicProcedure.input(SignUpValidator)
    .mutation( async ({input}) => {

        const {username, email, password, confirmPassword} = input
        const payload = await getPayloadClient()

        // verificar que el correo no este ya rejustrado
        const { docs:users } = await payload.find( {
            collection : 'users',
            where : {
                email : {equals : email,},
            },
        } )
        if (users.length !== 0){ throw new TRPCError( { code: 'CONFLICT' } ) }

        const { docs:user_name } = await payload.find( {
            collection : 'users',
            where : {
                username : {equals : username,},
            },
        } )
        if (user_name.length !== 0){ throw new TRPCError( { code: 'BAD_REQUEST' } ) }

        await payload.create( { collection : 'users', data : {email, password, username, role : 'user'}, } )
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
            const { docs:users } = await payload.find( {
                collection : 'users',
                where : {
                    email : {equals : email,},
                },
            } )
            const user : User = users[0];

            await payload.login({ 
                collection : 'users', 
                data : {email, password},
                res : res,
            })

            if ( user.loginDates?.length === 0 ){ user.loginDates = [] }
            user.loginDates?.push( { loginDate : new Date().toString() } )
            await payload.update( { collection : 'users', id : user.id, data : { loginDates : user.loginDates } } )

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
        const { docs:users } = await payload.find( {
            collection : 'users',
            where : { email : {equals : email,}, },
        } )
        if (users.length < 1){ throw new TRPCError( { code: 'NOT_FOUND' } ) }


        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: { 'Content-Type': 'application/json', },
        })

        if (response.ok){ return { success : true, sentToEmail : email } }
        else{ throw new TRPCError( {code: 'INTERNAL_SERVER_ERROR'} ) }

    }),

    resetUserPassword : publicProcedure.input( z.object( { token : z.string().nullable() , password : z.string() } ) )
    .mutation( async ({input}) => {

            const {token, password} = input

            const response = await fetch( `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`, 
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    token,
                    password,
                    }),
                },
            )
              

            if (response.ok){ return{ success : true } }
            else{ throw new TRPCError( {code: 'BAD_REQUEST'} ) }
        
    }),
    
    // pequeña funcion auxiliar que no se relaciona con la autenticacion, pero la implemento aca por sencillez
    updateQty : publicProcedure.input(z.object({id : z.string(), qty : z.number()}))
    .mutation( async ({input}) => {
        const {id, qty} = input
        const payload = await getPayloadClient()

        await payload.update( {collection : 'products', id, data : {qty} } )
        payload.logger.info(`Se ha actualizado la cantidad del producto con id: ${id} a ${qty}`)
        
        return {success : true}
    }),
    
})
