import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateMicroserviceDto } from './dto/create-microservice.dto'
import { UpdateMicroserviceDto } from './dto/update-microservice.dto'
import { Microservice } from '@helix/entities'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { from } from 'rxjs'

@Injectable()
/**
 * @description
 * A microservice is a small, independent application that performs a single function.
 */
export class MicroserviceService {
  constructor(
    @InjectRepository(Microservice)
    private microserviceRepository: Repository<Microservice>
  ) {}
  async create(createMicroserviceDto: CreateMicroserviceDto) {
    const exists = await this.microserviceRepository.findOne({
      where: { name: createMicroserviceDto.name },
    })

    if (exists) {
      throw new HttpException(
        'Microservice already exists',
        HttpStatus.CONFLICT
      )
    }

    const microservice = new Microservice()
    microservice.name = createMicroserviceDto.name
    microservice.description = createMicroserviceDto.description
    microservice.content = createMicroserviceDto.content
    microservice.image = createMicroserviceDto.logo
    microservice.alt = createMicroserviceDto.alt
    microservice.added_by = createMicroserviceDto.added_by
    return from(this.microserviceRepository.save(microservice))
  }

  findAll() {
    return from(this.microserviceRepository.find())
  }

  findOne(id: number) {
    return from(this.microserviceRepository.findOne({ where: { id } }))
  }

  update(id: number, updateMicroserviceDto: UpdateMicroserviceDto) {
    return from(
      this.microserviceRepository.update({ id }, updateMicroserviceDto)
    )
  }

  remove(id: number) {
    return from(this.microserviceRepository.delete({ id }))
  }
}
