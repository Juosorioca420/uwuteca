import express from 'express';
import { getPayloadClient } from './getPayload';
import { nextApp, nextHandler } from './next-utils';

import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import { inferAsyncReturnType } from '@trpc/server';

import nextBuild from 'next/dist/build';
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT) || 3000; // Puerto local 3000 para desarrollo

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

// Middleware para redirigir HTTP a HTTPS
// app.use((req, res, next) => {
//   if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
//     return res.redirect('https://' + req.headers.host + req.url);
//   }
//   return next();
// });

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin url ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info('Next.js is building for production');

      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'));

      process.exit();
    });

    return;
  }

  app.use((req, res) => nextHandler(req, res));

  // prepare() devuelve una promesa; .then() ejecuta código una vez que la aplicación esté lista.
  nextApp.prepare().then(() => {
    payload.logger.info('Servidor inicializado.');

    app.listen(PORT, async () => {
      payload.logger.info(`Next App url: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });
  });
};

// Arrancar el servidor
start();
