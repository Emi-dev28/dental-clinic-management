import { InjectRepository } from '@nestjs/typeorm';
import { ContactInfoEntity } from './entities/contact-Info.entity';
import { Repository, UpdateResult } from 'typeorm';
import { IContactInfoRepository } from '../../application/repository/contact-info.repository';
import { ContactInfo } from '../../domain/contact-info.domain';
import { UpdateContactInfoDTO } from '../../application/dto/updatecontactInfo.dto';
import { MapperService } from '@common/application/service/mapper/mapper.service';

export class ContactInfoRepository implements IContactInfoRepository {
  constructor(
    @InjectRepository(ContactInfoEntity)
    private readonly contactInfoRepository: Repository<ContactInfoEntity>,
    private readonly mapper: MapperService,
  ) {}

  public async create(contactInfo: ContactInfo): Promise<ContactInfoEntity> {
    try {
      const contactInfoEntity = this.mapper.classToEntity(
        contactInfo,
        new ContactInfoEntity(),
      );
      return await this.contactInfoRepository.save(contactInfoEntity);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findOne(id: number): Promise<ContactInfoEntity> {
    try {
      return await this.contactInfoRepository.findOne({
        where: { id },
        relations: { patient: true, dentist: true },
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.contactInfoRepository.softDelete(id);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async findAll(): Promise<ContactInfoEntity[]> {
    try {
      return this.contactInfoRepository.find();
    } catch (err) {
      throw new Error(err);
    }
  }
  public async update(
    updateContactInfoDto: UpdateContactInfoDTO,
    id: number,
  ): Promise<UpdateResult> {
    try {
      const contactInfoUpdated = await this.contactInfoRepository.update(
        id,
        updateContactInfoDto,
      );
      if (contactInfoUpdated.affected > 0) {
        return contactInfoUpdated;
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
