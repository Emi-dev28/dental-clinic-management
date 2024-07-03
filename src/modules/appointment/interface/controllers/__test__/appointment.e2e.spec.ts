import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { loadFixtures } from '@data/util/loader';

describe('Appointment - [/appointment]', () => {
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

  describe('Get All - [GET /appointment]', () => {
    it('should return an array of appointments', async () => {
      const expectedAppointments = [
        {
          createdAt: expect.any(String),
          deletedAt: null,
          id: expect.any(Number),
          dateTime: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          createdAt: expect.any(String),
          deletedAt: null,
          id: expect.any(Number),
          dateTime: expect.any(String),
          updatedAt: expect.any(String),
        },
      ];

      const EXPECTED_LENGHT = 2;

      const { body } = await request(app.getHttpServer())
        .get('/appointment')
        .expect(HttpStatus.OK);
      const expectedRes = expect.arrayContaining(expectedAppointments);

      expect(body).toEqual(expectedRes);
      expect(body).toHaveLength(EXPECTED_LENGHT);
    });
  });
  describe('Get one by ID, [GET /appointment/:id]', () => {
    it('should return the specified appointment', async () => {
      const APPOINTMENT_ID = 1;
      const { body } = await request(app.getHttpServer()).get(
        `/appointment/${APPOINTMENT_ID}`,
      );
      expect(body).toEqual(expect.objectContaining({ id: 1 }));
    });
  });
  describe('POST - [POST - /appointment/save]', () => {
    it('should create an appointment', async () => {
      const appointment = {
        dateTime: '2024-01-09',
      };
      const { body } = await request(app.getHttpServer())
        .post('/appointment/save')
        .send(appointment)
        .expect(HttpStatus.CREATED);
      const expectedRes = expect.objectContaining({
        createdAt: expect.any(String),
        deletedAt: null,
        id: expect.any(Number),
        dateTime: expect.any(String),
        updatedAt: expect.any(String),
      });
      expect(body).toEqual(expectedRes);
    });
  });

  describe('UPDATE one by ID - PATCH - /appointment/:id', () => {
    it('should update an appointment', async () => {
      const APPOINTMENT_ID = 1;
      const updatedAppointment = {
        dateTime: '2024-01-09',
      };
      const { body } = await request(app.getHttpServer())
        .patch(`/appointment/${APPOINTMENT_ID}`)
        .send(updatedAppointment)
        .expect(HttpStatus.OK);
      expect(body.affected).toBe(1);
    });
  });
  describe('DELETE one by ID', () => {
    it('should DELETE an appointment', async () => {
      const APPOINTMENT_ID = 1;

      await request(app.getHttpServer())
        .delete(`/appointment/${APPOINTMENT_ID}`)
        .expect(HttpStatus.OK);
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
