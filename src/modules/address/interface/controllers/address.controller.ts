import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressService } from '../../application/service/address.service';
import { AddressDto } from '../../application/dto/create-address.dto';
import { UpdateAddressDto } from '../../application/dto/update-address.dto';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/save')
  @ApiResponse({
    status: 201,
    description: 'Product Created Successfully',
    type: Promise<AddressDto>,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({
    type: AddressDto,
  })
  create(@Body() createAddressDto: AddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.remove(+id);
  }
}
