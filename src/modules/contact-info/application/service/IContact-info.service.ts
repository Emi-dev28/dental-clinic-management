import { UpdateResult } from 'typeorm';
import { ContactInfoDTO } from '../dto/contactInfo';

export interface IContactInfoService {
  create(contactInfo: ContactInfoDTO): Promise<ContactInfoDTO>;
  findOne(id: number): Promise<ContactInfoDTO>;
  remove(id: number): Promise<void>;
  findAll(): Promise<ContactInfoDTO[]>;
  update(id: number, contactInfo: ContactInfoDTO): Promise<UpdateResult>;
}
