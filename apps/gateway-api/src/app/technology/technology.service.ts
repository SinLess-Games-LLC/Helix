import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateTechnologyDto } from './dto/create-technology.dto'
import { UpdateTechnologyDto } from './dto/update-technology.dto'
import { Repository } from 'typeorm'
import { Technology } from '@helix/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { from } from 'rxjs'

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>
  ) {}
  async create(createTechnologyDto: CreateTechnologyDto) {
    const exists = await this.technologyRepository.findOne({
      where: { name: createTechnologyDto.name },
    })
    if (exists) {
      throw new HttpException('Technology already exists', HttpStatus.CONFLICT)
    }

    const technology = new Technology()
    technology.name = createTechnologyDto.name
    technology.description = createTechnologyDto.description
    technology.image = createTechnologyDto.image
    technology.alt = createTechnologyDto.alt
    technology.category1 = createTechnologyDto.category1
    technology.category2 = createTechnologyDto.category2
    technology.website = createTechnologyDto.website
    technology.added_by = createTechnologyDto.added_by
    return from(this.technologyRepository.save(technology))
  }

  findAll() {
    return from(this.technologyRepository.find())
  }

  findOne(id: number) {
    return from(this.technologyRepository.findOne({ where: { id: id } }))
  }

  update(id: number, updateTechnologyDto: UpdateTechnologyDto) {
    return from(this.technologyRepository.update(id, updateTechnologyDto))
  }

  remove(id: number) {
    return from(this.technologyRepository.delete(id))
  }
}
