const express = require('express');
const bodyParser = require('express').json;
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

async function createServer() {
  const app = express();
  app.use(bodyParser());
  app.use('/api/auth', authRoutes);

  // simple error handler
  app.use((err, req, res, next) => {
    console.error(err && err.stack ? err.stack : err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  // connect to DB if running for real (not used by mongodb-memory-server tests)
  if (process.env.MONGO_URI && !process.env.JEST_WORKER_ID) {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  return app;
}

module.exports = createServer;
