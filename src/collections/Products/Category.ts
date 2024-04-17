import { CollectionConfig } from "payload/types";


export const Category: CollectionConfig = {
    slug: 'category',
    labels: {singular: 'Categoria', plural: 'Categorias'},

    admin: { 
        useAsTitle: 'name' ,
        hidden : ({user}) => user.role !== 'admin',
    },

    access : {},

    fields: [
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
            required: false,
        },

    ]
}
