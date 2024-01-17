import { PartialType } from '@nestjs/swagger';
import { ContactInfo } from '../../domain/contact-info.domain';

export class UpdateContactInfoDTO extends PartialType(ContactInfo) {}
