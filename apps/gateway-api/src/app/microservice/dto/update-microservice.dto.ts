import { PartialType } from '@nestjs/mapped-types'
import { CreateMicroserviceDto } from './create-microservice.dto'

export class UpdateMicroserviceDto extends PartialType(CreateMicroserviceDto) {}
