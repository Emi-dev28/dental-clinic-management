import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { loadFixtures } from '@data/util/loader';
import { AppModule } from '@/app.module';

describe('Dentist - [/dentist]', () => {
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

  describe('Get all - [GET /dentist]', () => {
    it('should return an array of dentists', async () => {
      const expectedDentists = [
        {
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          deletedAt: null,
          registrationNumber: expect.any(String),
          name: expect.any(String),
          lastname: expect.any(String),
          dni: expect.any(String),
        },
      ];
      const EXPECTED_LENGHT = 2;

      const { body } = await request(app.getHttpServer())
        .get('/dentist')
        .expect(HttpStatus.OK);

      const expectedRes = expect.arrayContaining(expectedDentists);

      expect(body).toEqual(expectedRes);
      expect(body).toHaveLength(EXPECTED_LENGHT);
    });
  });
  describe('Get one by id, [GET /dentist/:id]', () => {
    it('should get an specified dentist', async () => {
      const DENTIST_ID = 1;
      const { body } = await request(app.getHttpServer()).get(
        `/dentist/${DENTIST_ID}`,
      );
      expect(body).toEqual(expect.objectContaining({ id: 1 }));
    });
  });

  describe(' POST - [POST - /dentist/save]', () => {
    it('should create a new dentist', async () => {
      const newDentist = {
        registrationNumber: 'D12345',
        name: 'John',
        lastname: 'Doe',
        dni: '123456789',
      };
      const { body } = await request(app.getHttpServer())
        .post('/dentist/save')
        .send(newDentist)
        .expect(HttpStatus.CREATED);
      expect(body).toEqual(
        expect.objectContaining({ name: 'John', registrationNumber: 'D12345' }),
      );
    });
  });

  describe('update one by id - PATCH - /dentist/:id', () => {
    const DENTIST_ID = 1;
    const updateDentist = {
      name: 'Johnatan',
      dni: '312031924',
    };

    it('should update one dentist by id', async () => {
      const { body } = await request(app.getHttpServer())
        .patch(`/dentist/${DENTIST_ID}`)
        .send(updateDentist)
        .expect(HttpStatus.OK);

      expect(body.affected).toBe(1);
    });
  });

  describe('delete one by id - DELETE - /dentist/:id', () => {
    const DENTIST_ID = 1;
    it('should delete one dentist by id', async () => {
      await request(app.getHttpServer())
        .delete(`/dentist/${DENTIST_ID}`)
        .expect(HttpStatus.OK);
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
