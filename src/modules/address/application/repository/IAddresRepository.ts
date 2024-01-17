import { UpdateResult } from 'typeorm';
import { Address } from '../../domain/address.domain';
import { AddressEntity } from '../../infrastructure/persistence/entities/address.entity';
import { UpdateAddressDto } from '../dto/update-address.dto';

export interface IAddresRepository {
  create(address: Address): Promise<AddressEntity>;
  findOne(id: number): Promise<AddressEntity>;
  remove(id: number): Promise<void>;
  findAll(): Promise<AddressEntity[]>;
  update(id: number, updateAddress: UpdateAddressDto): Promise<UpdateResult>;
}
