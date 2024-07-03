import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configuration/configuration';
import { datasourceOptions } from './configuration/orm.configuration';
import { configurationValidate } from './configuration/configuration.validate';
import { DataSource } from 'typeorm';
import { PatientModule } from './modules/patient/patient.module';
import { DentistModule } from './modules/dentist/dentist.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AddressModule } from './modules/address/address.module';
import { ContactInfoModule } from './modules/contact-info/contact-info.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidate,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceOptions,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    PatientModule,
    DentistModule,
    AppointmentModule,
    AddressModule,
    CommonModule,
    ContactInfoModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
