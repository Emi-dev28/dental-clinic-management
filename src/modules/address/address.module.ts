import { Module } from '@nestjs/common';
import { AddressService } from './application/service/address.service';
import { AddressController } from './interface/controllers/address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../../src/common/common.module';
import { AddressRepository } from './infrastructure/persistence/address.repository';
import { AddressEntity } from './infrastructure/persistence/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), CommonModule],
  controllers: [AddressController],
  providers: [
    AddressService,
    {
      provide: 'ADDRESS_REPOSITORY',
      useClass: AddressRepository,
    },
  ],
  exports: [AddressService],
})
export class AddressModule {}
