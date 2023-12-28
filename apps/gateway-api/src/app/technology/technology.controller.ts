import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TechnologyService } from './technology.service'
import { CreateTechnologyDto } from './dto/create-technology.dto'
import { UpdateTechnologyDto } from './dto/update-technology.dto'

@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post()
  create(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologyService.create(createTechnologyDto)
  }

  @Get()
  findAll() {
    return this.technologyService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technologyService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechnologyDto: UpdateTechnologyDto) {
    return this.technologyService.update(+id, updateTechnologyDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technologyService.remove(+id)
  }
}
