import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './persistence/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../domain/user.domain';
import { IUserRepository } from '../application/repository/IUserRepository.interface';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { MapperService } from '@common/application/service/mapper/mapper.service';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mapper: MapperService,
  ) {}
  public async create(user: User): Promise<UserEntity> {
    try {
      const userToCreate = this.mapper.classToEntity(user, new UserEntity());
      return await this.userRepository.save(userToCreate);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findOne(id: number): Promise<UserEntity> {
    try {
      const userTofind = await this.userRepository.findOne({
        where: { id },
      });
      return userTofind;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async remove(id: number): Promise<void> {
    try {
      await this.userRepository.softDelete(id);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (err) {
      throw new Error(err);
    }
  }
  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      const userToUpdate = await this.userRepository.update(id, updateUserDto);
      if (userToUpdate.affected > 0) {
        return userToUpdate;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
