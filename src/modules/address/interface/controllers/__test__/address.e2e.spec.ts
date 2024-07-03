import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { loadFixtures } from '@data/util/loader';
import { AppModule } from '@/app.module';
import { AddressDto } from '@/modules/address/application/dto/create-address.dto';

describe('Address - [/address]', () => {
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
  describe('Get all - [GET /address]', () => {
    it('should return an array of address', async () => {
      const expectedAddress = [
        {
          createdAt: expect.any(String),
          deletedAt: null,
          id: expect.any(Number),
          street: expect.any(String),
          location: expect.any(String),
          zipCode: expect.any(String),
          state: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          createdAt: expect.any(String),
          deletedAt: null,
          id: expect.any(Number),
          street: expect.any(String),
          location: expect.any(String),
          zipCode: expect.any(String),
          state: expect.any(String),
          updatedAt: expect.any(String),
        },
      ];
      const EXPECTED_LENGHT = 2;

      const { body } = await request(app.getHttpServer())
        .get('/address')
        .expect(HttpStatus.OK);

      const expectedRes = expect.arrayContaining(expectedAddress);

      expect(body).toEqual(expectedRes);
      expect(body).toHaveLength(EXPECTED_LENGHT);
    });
  });
  describe('Get one by id - [GET /address/:id', () => {
    it('should return the specified address', async () => {
      const ADDRESS_ID = 1;
      const { body } = await request(app.getHttpServer()).get(
        `/address/${ADDRESS_ID}`,
      );
      expect(body).toEqual(expect.objectContaining({ id: 1 }));
    });
  });

  describe('POST - [POST - /address/save]', () => {
    it('should return the created address', async () => {
      const newAddress: AddressDto = {
        street: 'Libertador 1',
        location: 'Caba 1',
        zipCode: '12345',
        state: 'CABA',
      };
      const { body } = await request(app.getHttpServer())
        .post('/address/save')
        .send(newAddress)
        .expect(HttpStatus.CREATED);

      const expectedRes = expect.objectContaining({
        id: 3,
        street: 'Libertador 1',
      });
      expect(body).toEqual(expectedRes);
    });
  });
  describe('update one by id - PATCH - /address/:id', () => {
    it('should update the specified address', async () => {
      const ADDRESS_ID = 1;

      const updateAddress = {
        street: 'Avenida Siempreviva',
        location: 'Los Simpsons',
      };
      const { body } = await request(app.getHttpServer())
        .patch(`/address/${ADDRESS_ID}`)
        .send(updateAddress)
        .expect(HttpStatus.OK);

      expect(body.affected).toBe(1);
    });
  });
  describe('DELETE one by ID - DELETE - address/:id', () => {
    it('should delete the specified address', async () => {
      const ADDRESS_ID = 1;
      await request(app.getHttpServer())
        .delete(`/address/${ADDRESS_ID}`)
        .expect(HttpStatus.OK);
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
