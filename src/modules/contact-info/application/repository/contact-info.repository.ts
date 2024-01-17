import { UpdateResult } from 'typeorm';
import { UpdateContactInfoDTO } from '../dto/updatecontactInfo.dto';
import { ContactInfoEntity } from '../../infrastructure/persistence/entities/contact-Info.entity';
import { ContactInfo } from '../../domain/contact-info.domain';

export interface IContactInfoRepository {
  create(contactIOnfo: ContactInfo): Promise<ContactInfoEntity>;
  findOne(id: number): Promise<ContactInfoEntity>;
  remove(id: number): Promise<void>;
  findAll(): Promise<ContactInfoEntity[]>;
  update(contact_info: UpdateContactInfoDTO, id: number): Promise<UpdateResult>;
}
