import path from 'path'
import dotenv from 'dotenv'

import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { Users } from './collections/Users'
import { Products } from './collections/Products/Products'
import { Category } from './collections/Products/Category'
import { Media } from './collections/Media'
import { ProductFiles } from './collections/Products/ProductFile'
import { Orders } from './collections/Orders'

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
  })
  
export default buildConfig({

    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [ Users, Category, Products, Media, ProductFiles, Orders ], 
    routes: {
        admin: '/panel',
    },

    admin: {
        user: 'users', // Users slug
        bundler: webpackBundler(),
        meta: {
        titleSuffix: '- UwUteca',
        favicon: '/favicon.ico',
        // ogImage: '/thumbnail.jpg',
        },
    },

    rateLimit: {
        max: 2000, // default = 500
    },

    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!,
    }),

    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },

})
