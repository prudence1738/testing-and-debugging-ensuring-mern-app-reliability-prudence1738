const createServer = require('./server');
const PORT = process.env.PORT || 5000;

async function start() {
  const app = await createServer();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server', err);
});
