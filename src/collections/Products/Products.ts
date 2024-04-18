import { CollectionConfig } from "payload/types"


export const Products: CollectionConfig = {
    slug: 'products',
    labels: {singular: 'Producto', plural: 'Productos'},
    
    admin: { 
        useAsTitle: 'name' ,
        hidden : ({user}) => user.role !== 'admin',
    },

    access : {},

    fields: [
        {
            name: 'user',
            type: 'relationship',
            required: true,
            relationTo: 'users',
            hasMany: false,
            admin: { condition: () => false, },
        },

        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            required: true,
        },

        {
            name: 'description',
            label: 'Descripcion',
            type: 'textarea',
        },

        {
            name: 'price',
            label: 'Valor',
            type: 'number',
            required : true,
            validate : (value) => {
                if (value < 0){
                    return 'La cantidad no puede ser negativa'
                }
                return true
            },
        },

        {
            name: 'qty',
            label: 'Cantidad',
            type: 'number',
            required : true,
            validate : (value) => {
                if (value < 0){
                    return 'La cantidad no puede ser negativa'
                }
                return true
            },
        },

        {
            name: 'category',
            label: 'Categorias',
            type: 'relationship',
            relationTo: 'category',
            hasMany: true,
            required : false,
        },

        {
            name: 'product_files',
            label: 'Archivo',
            type: 'relationship',
            relationTo: 'product_files',
            hasMany: false,
            required : true,
        },

        {
            name: 'approvedForSale',
            label: 'Estado',
            type: 'select',
            defaultValue: 'pending',
            options : [ 
                {value: 'pending', label: 'En Revision'}, 
                {value: 'approved', label: 'Aprovado'}, 
                {value : 'denied', label : 'Rechazado'} ],
            
            access: {
                create : ({req}) => req.user.role === 'admin',
                read : ({req}) => req.user.role === 'admin',
                update : ({req}) => req.user.role === 'admin',
            },
        },

        {
            name : 'priceId',
            type: 'text',
            admin: { hidden: true, },
            
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
        },

        {
            name : 'stripeId',
            type: 'text',
            admin: { hidden: true, },

            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
        },

        {
            name: 'images',
            type: 'array',
            label: 'Imagen',
            minRows: 1,
            maxRows: 5,
            required: true,
            labels: {
                singular: 'Imagen', plural: 'Imagenes',
            },
            fields: [
                { name : 'image', type : 'upload', relationTo: 'media', required: true, }
            ],
        },
    ]
}
