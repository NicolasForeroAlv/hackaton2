import request from 'supertest';
import app from '../src/index';

describe('Auth API', () => {
  it('debería retornar token con credenciales válidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@test.com', password: '123456' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
