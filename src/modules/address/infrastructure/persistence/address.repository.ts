import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { IAddresRepository } from '../../application/repository/IAddresRepository';
import { MapperService } from '@common/application/service/mapper/mapper.service';
import { Address } from '../../domain/address.domain';
import { UpdateAddressDto } from '../../application/dto/update-address.dto';

export class AddressRepository implements IAddresRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly mapper: MapperService,
  ) {}

  public async create(address: Address): Promise<AddressEntity> {
    try {
      const addressToPersist = this.mapper.classToEntity(
        address,
        new AddressEntity(),
      );
      return await this.addressRepository.save(addressToPersist);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findOne(id: number): Promise<AddressEntity> {
    try {
      const addressEntity = await this.addressRepository.findOne({
        where: { id },
        relations: { patient: true },
      });
      return addressEntity;
    } catch (err) {
      throw new Error(err);
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.addressRepository.softDelete(id);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findAll(): Promise<AddressEntity[]> {
    try {
      return this.addressRepository.find();
    } catch (err) {
      throw new Error(err);
    }
  }
  public async update(
    id: number,
    updateAddress: UpdateAddressDto,
  ): Promise<UpdateResult> {
    try {
      const addressUpdated = await this.addressRepository.update(
        id,
        updateAddress,
      );
      if (addressUpdated.affected > 0) {
        return addressUpdated;
      }
    } catch (err) {
      throw err;
    }
  }
}
