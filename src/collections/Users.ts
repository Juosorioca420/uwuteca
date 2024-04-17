import { CollectionConfig } from "payload/types";

export const Users : CollectionConfig = {
    slug : 'users',
    labels: {singular: 'Usuario', plural: 'Usuarios'},


    auth : {
        verify : { 
            generateEmailHTML : ({token}) => { 
                const verifyURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`

                return `
                    <!doctype html>
                    <html>
                    <body>
                        <h3>Hola :3</h3>
                        <p>
                        <a href="${verifyURL}">Porfavor verifica tu nueva Cuenta.</a>
                        </p>

                        <p>Si no has solicitado este correo, porfavor ignoralo.</p>
                    </body>
                    </html>
                `
            },
            generateEmailSubject : () => {
                return `Verifica tu Cuenta` 
            }
         },
        
        forgotPassword : { 
            generateEmailSubject : () => {
                return `Recuperacion de Contraseña` 
            },
            generateEmailHTML: (params) => {
                // Use the token provided to allow your user to reset their password
                const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/pswd-reset?token=${params?.token}`
        
                return `
                  <!doctype html>
                  <html>
                    <body>
                      <h3>Hola :3</h3>
                      <p>
                        <a href="${resetPasswordURL}">Recupera tu contraseña</a>
                      </p>

                      <p>Si no has solicitado este correo, porfavor ignoralo.</p>
                    </body>
                  </html>
                `
            },
         },
    },

    access : {
        read : () => true,
        create: () => true,
    },

    admin : {
        hidden : ({user}) => user.role !== 'admin'
    },

    fields : [ 
        { 
            name : 'role', 
            defaultValue : 'user', 
            required : true,
            admin : { condition : () => true, }, //({req}) => req.user.role === 'admin'
            type : 'select', 
            options : [ {label: 'Admin', value : 'admin'}, {label : 'User', value : 'user'} ],
        }, 

        { 
            name : 'username', 
            label : 'Username',
            type : 'text',
            required : false,
            admin : { condition : () => true, }, //req.user.role === 'admin'
        }, 
    ],

}
