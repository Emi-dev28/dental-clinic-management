import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @ApiProperty({
    description: 'Street of the address ',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    description: 'where is the address',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'state of the address',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  zipCode: string;
}
