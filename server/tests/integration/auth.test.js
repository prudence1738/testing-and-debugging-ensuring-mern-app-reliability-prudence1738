const request = require('supertest');
const createServer = require('../../src/server');
const User = require('../../src/models/User');

let app;
beforeAll(async () => {
  app = await createServer();
});

test('POST /api/auth/register creates a user', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ email: 'test@example.com', password: 'Password1' })
    .expect(201);

  expect(res.body).toHaveProperty('id');
  expect(res.body.email).toBe('test@example.com');

  const userInDb = await User.findOne({ email: 'test@example.com' });
  expect(userInDb).toBeTruthy();
});

test('POST /api/auth/register returns 400 on missing fields', async () => {
  await request(app).post('/api/auth/register').send({ email: '' }).expect(400);
});
