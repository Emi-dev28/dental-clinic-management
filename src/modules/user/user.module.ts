import { Module } from '@nestjs/common';
import { UserService } from './application/service/user.service';
import { UserController } from './interface/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { UserRepository } from './infrastructure/user.repository';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CommonModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
