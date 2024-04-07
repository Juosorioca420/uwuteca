import { CollectionConfig } from "payload/types";

export const Users : CollectionConfig = {

    slug : 'users',

    fields : [ { name : 'role', defaultValue : 'user', required : true,
                 admin : { condition : ({req}) => req.user.role === 'admin', }, 
                 type : 'select', 
                 options : [ {label: 'Admin', value : 'admin'}, {label : 'User', value : 'user'} ],
        }, ],

    auth : true,
    access : {
        read : () => true,
        create: () => true,
    },
}
