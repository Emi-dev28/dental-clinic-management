import { Module } from '@nestjs/common';
import { UtilsService } from './infrastructure/utils/utils.service';
import { MapperService } from './application/service/mapper/mapper.service';

@Module({
  providers: [MapperService, UtilsService],
  exports: [MapperService, UtilsService],
})
export class CommonModule {}
