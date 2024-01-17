import { Inject, Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { IContactInfoService } from './IContact-info.service';
import { UpdateContactInfoDTO } from '../dto/updatecontactInfo.dto';
import { ContactInfoDTO } from '../dto/contactInfo';
import { ContactInfoRepository } from '../../infrastructure/persistence/contact-info.repository';
import { MapperService } from '@common/application/service/mapper/mapper.service';
import { ContactInfo } from '../../domain/contact-info.domain';

@Injectable()
export class ContactInfoService implements IContactInfoService {
  constructor(
    @Inject('CONTACT_INFO_REPOSITORY')
    private readonly contactInfoRepository: ContactInfoRepository,
    private readonly mapper: MapperService,
  ) {}

  async create(contactInfoDTO: ContactInfoDTO): Promise<ContactInfoDTO> {
    try {
      const newContactInfo = this.mapper.dtoToClass(
        contactInfoDTO,
        new ContactInfo(),
      );
      const savedContactInfo =
        await this.contactInfoRepository.create(newContactInfo);
      return this.mapper.entityToClass(savedContactInfo, new ContactInfoDTO());
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(): Promise<ContactInfoDTO[]> {
    try {
      const contactsInfo = await this.contactInfoRepository.findAll();
      return contactsInfo.map((contactsInfo) =>
        this.mapper.entityToClass(contactsInfo, new ContactInfoDTO()),
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findOne(id: number): Promise<ContactInfoDTO> {
    try {
      const contactInfo = this.contactInfoRepository.findOne(id);
      return this.mapper.entityToClass(contactInfo, new ContactInfoDTO());
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(
    id: number,
    updateContactInfo: UpdateContactInfoDTO,
  ): Promise<UpdateResult> {
    try {
      return this.contactInfoRepository.update(updateContactInfo, id);
    } catch (err) {
      throw new Error(err);
    }
  }

  remove(id: number) {
    return this.contactInfoRepository.remove(id);
  }
}
