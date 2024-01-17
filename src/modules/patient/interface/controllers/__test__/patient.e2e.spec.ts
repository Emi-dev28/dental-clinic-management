import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { AppModule } from '@/app.module';
import { loadFixtures } from '@root/util/loader';

describe('Patient - [/patient]', () => {
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

  describe('Get all - [GET /patient]', () => {
    it('should return an array of patients', async () => {
      const expectedPatients = [
        {
          createdAt: expect.any(String),
          deletedAt: null,
          dni: expect.any(String),
          id: expect.any(Number),
          lastname: expect.any(String),
          name: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          createdAt: expect.any(String),
          deletedAt: null,
          dni: expect.any(String),
          id: expect.any(Number),
          lastname: expect.any(String),
          name: expect.any(String),
          updatedAt: expect.any(String),
        },
      ];

      const EXPECTED_LENGTH = 2;

      const { body } = await request(app.getHttpServer())
        .get('/patient')
        .expect(HttpStatus.OK);

      const expectedRes = expect.arrayContaining(expectedPatients);

      expect(body).toEqual(expectedRes);
      expect(body).toHaveLength(EXPECTED_LENGTH);
    });
  });
  describe('Get one by id - [GET /patient/:id]', () => {
    it('should return the specified patient', async () => {
      const PATIENT_ID = 1;

      const { body } = await request(app.getHttpServer()).get(
        `/patient/${PATIENT_ID}`,
      );

      expect(body).toEqual(expect.objectContaining({ id: 1 }));
    });
  });

  describe(' POST - [POST - /patient/save]', () => {
    it('should create a new patient', async () => {
      const cratePatientDto = {
        name: 'Johnatan',
        lastname: 'Doels',
        dni: '312031924',
        address: {
          street: 'Main Street 1235',
          location: 'Cityville',
          zipCode: '12345',
          state: 'Stateville',
        },
        contactInfo: {
          email: 'john.doe@example.com',
          phoneNumber: '+1234567890',
          dni: '123456789',
        },
      };

      const { body } = await request(app.getHttpServer())
        .post('/patient/save')
        .send(cratePatientDto)
        .expect(HttpStatus.CREATED);

      const expectedRes = expect.objectContaining({
        id: 3,
        name: 'Johnatan',
      });

      expect(body).toEqual(expectedRes);
    });
  });

  describe('update one by id - PATCH - /patient/:id', () => {
    const PATIENT_ID = 1;

    const updatePatientDto = {
      lastname: 'Johansen',
      dni: '42233499',
    };

    it('should update a patient with specified values', async () => {
      const { body } = await request(app.getHttpServer())
        .patch(`/patient/${PATIENT_ID}`)
        .send(updatePatientDto)
        .expect(HttpStatus.OK);

      expect(body.affected).toBe(1);
    });
  });

  describe('delete one by id - DELETE - /patients/:id', () => {
    it('should delete one patient by id', async () => {
      const PATIENT_ID = 1;

      await request(app.getHttpServer())
        .delete(`/patient/${PATIENT_ID}`)
        .expect(HttpStatus.OK);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
