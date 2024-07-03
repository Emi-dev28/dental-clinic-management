import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfoEntity } from './infrastructure/persistence/entities/contact-Info.entity';
import { ContactInfoRepository } from './infrastructure/persistence/contact-info.repository';
import { ContactInfoService } from './application/service/contact-info.service';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfoEntity]), CommonModule],
  controllers: [],
  providers: [
    ContactInfoService,
    {
      provide: 'CONTACT_INFO_REPOSITORY',
      useClass: ContactInfoRepository,
    },
  ],
  exports: [ContactInfoService],
})
export class ContactInfoModule {}
