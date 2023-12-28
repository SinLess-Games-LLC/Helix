import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MicroserviceService } from './microservice.service'
import { CreateMicroserviceDto } from './dto/create-microservice.dto'
import { UpdateMicroserviceDto } from './dto/update-microservice.dto'

@Controller('microservice')
export class MicroserviceController {
  constructor(private readonly microserviceService: MicroserviceService) {}

  @Post()
  create(@Body() createMicroserviceDto: CreateMicroserviceDto) {
    return this.microserviceService.create(createMicroserviceDto)
  }

  @Get()
  findAll() {
    return this.microserviceService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.microserviceService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMicroserviceDto: UpdateMicroserviceDto) {
    return this.microserviceService.update(+id, updateMicroserviceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.microserviceService.remove(+id)
  }
}
