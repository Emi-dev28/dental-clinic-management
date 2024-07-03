import { Inject, Injectable } from '@nestjs/common';
import { AddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { AddressRepository } from '../../infrastructure/persistence/address.repository';
import { MapperService } from '@common/application/service/mapper/mapper.service';
import { Address } from '../../domain/address.domain';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private readonly repository: AddressRepository,
    private readonly mapper: MapperService,
  ) {}

  public async create(addressDto: AddressDto): Promise<AddressDto> {
    try {
      const addressDomain = this.mapper.dtoToClass(addressDto, new Address());
      const savedAddress = await this.repository.create(addressDomain);
      return this.mapper.entityToClass(savedAddress, new AddressDto());
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll() {
    try {
      const addresses = await this.repository.findAll();
      return addresses.map((address) => {
        return this.mapper.entityToClass(address, new AddressDto());
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findOne(id: number) {
    try {
      const address = await this.repository.findOne(id);
      return this.mapper.entityToClass(address, new AddressDto());
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      return await this.repository.update(id, updateAddressDto);
    } catch (err) {
      throw new Error(err);
    }
  }

  remove(id: number) {
    try {
      this.repository.remove(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}
