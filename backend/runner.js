import { createServer } from 'vite';

async function start() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    environments: {
      node: {
        dev: {
          createViteRuntime: true
        }
      }
    }
  });

  try {
    const environment = vite.environments.node;
    if (!environment) throw new Error('Node environment not found');
    
    // In Vite 6+, the runner is usually accessible on the environment
    await environment.runner.import('./server.ts');
    
    console.log('Vite Module Runner: Server is running with HMR');
  } catch (e) {
    console.error('Vite Module Runner: Failed to start server', e);
    await vite.close();
    process.exit(1);
  }
}

start();
