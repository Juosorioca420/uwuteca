import { User } from '../payload-types';
import { Access, CollectionConfig } from 'payload/types';

const haveAccessToMedia = (): Access => async ({ req }) => {
    const user = req.user as User | undefined

    if (!user){ return false }
    if (user.role === 'admin'){ return true }

    return {
      user: { equals: req.user.id, },
    }
}

export const Media: CollectionConfig = {

  slug: 'media',

  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id }
      },
    ],
  },

  admin : {
    hidden : ({user}) => user.role !== 'admin'
  },
  access : {
    read: async ({req}) => {
      const refer = req.headers.referer

      if ( !req.user || !refer?.includes('panel') ){ return true }
      return await haveAccessToMedia()({req})
    },

    delete: haveAccessToMedia(),
    update: haveAccessToMedia(),
  },

  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },

  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {  condition: () => false, },
    },
  ],

}
