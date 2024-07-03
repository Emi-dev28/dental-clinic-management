import { UpdateResult } from 'typeorm';
import { User } from '../../domain/user.domain';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../../infrastructure/persistence/entities/user.entity';
export interface IUserRepository {
  create(user: User): Promise<UserEntity>;
  findOne(id: number): Promise<UserEntity>;
  remove(id: number): void;
  findAll(): Promise<UserEntity[]>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
}
