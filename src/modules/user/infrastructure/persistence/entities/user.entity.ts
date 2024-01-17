import { BaseEntity } from '@common/infrastructure/entities/base.entity';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsStrongPassword()
  password: string;
}
