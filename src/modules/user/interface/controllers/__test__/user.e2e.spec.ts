import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { loadFixtures } from '@data/util/loader';
import { AppModule } from '@/app.module';

describe('USER - [/user', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    await loadFixtures(
      `${__dirname}/fixture/`,
      join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        'configuration/orm.configuration.ts',
      ),
    );

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('Get all - [GET /user]', () => {
    it('should return an array of user', async () => {
      const expectedUsers = [
        {
          createdAt: expect.any(String),
          deletedAt: null,
          id: expect.any(Number),
          email: expect.any(String),
          password: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          createdAt: expect.any(String),
          deletedAt: null,
          id: expect.any(Number),
          email: expect.any(String),
          password: expect.any(String),
          updatedAt: expect.any(String),
        },
      ];
      const EXPECTED_LENGHT = 2;
      const { body } = await request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.OK);

      const expectedRes = expect.arrayContaining(expectedUsers);
      expect(body).toEqual(expectedRes);
      expect(body).toHaveLength(EXPECTED_LENGHT);
    });
  });
  describe('Get one by ID - [GET /user/:id]', () => {
    it('should get the specified user', async () => {
      const USER_ID = 1;
      const { body } = await request(app.getHttpServer())
        .get(`/user/${USER_ID}`)
        .expect(HttpStatus.OK);

      expect(body).toEqual(expect.objectContaining({ id: 1 }));
    });
  });
  describe('POST - [POST - /user/save]', () => {
    it('should create a new user', async () => {
      const newUser = {
        email: 'johnDoe@bigger.com',
        password: 'Unapass@123',
      };
      const { body } = await request(app.getHttpServer())
        .post('/user/save')
        .send(newUser)
        .expect(HttpStatus.CREATED);

      const expectedRes = expect.objectContaining({
        id: 3,
        email: 'johnDoe@bigger.com',
        password: 'Unapass@123',
      });
      expect(body).toEqual(expectedRes);
    });
  });
  describe('UPDATE one by ID - PATCH - /user/:id', () => {
    const USER_ID = 1;
    it('should update a specified user', async () => {
      const userToUpdate = {
        email: 'JonathanDoe@bigger.com',
        password: 'UnapassWord@123',
      };
      const { body } = await request(app.getHttpServer())
        .patch(`/user/${USER_ID}`)
        .send(userToUpdate)
        .expect(HttpStatus.OK);

      expect(body.affected).toBe(1);
    });
  });
  describe('DELETE one by ID - DELETE - /user/:id', () => {
    it('Should delete a specified user', async () => {
      const USER_ID = 1;
      await request(app.getHttpServer())
        .delete(`/user/${USER_ID}`)
        .expect(HttpStatus.OK);
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
