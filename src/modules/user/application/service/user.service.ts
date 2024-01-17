import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { MapperService } from '@common/application/service/mapper/mapper.service';
import { UserRepository } from '../../infrastructure/user.repository';
import { User } from '../../domain/user.domain';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
    private mapper: MapperService,
  ) {}
  public async create(userDTO: UserDTO) {
    try {
      const user = this.mapper.dtoToClass(userDTO, new User());
      const savedUser = await this.userRepository.create(user);
      return this.mapper.entityToClass(savedUser, new UserDTO());
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findAll() {
    try {
      const users = await this.userRepository.findAll();
      return users.map((user) =>
        this.mapper.entityToClass(user, new UserDTO()),
      );
    } catch (err) {
      throw new Error();
    }
  }

  public async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne(id);
      return this.mapper.entityToClass(user, new UserDTO());
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async remove(id: number) {
    try {
      await this.userRepository.remove(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}
