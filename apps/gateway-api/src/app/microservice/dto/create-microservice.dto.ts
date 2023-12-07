import { Technology, Microservice } from '@helix/entities'
import { PartialType } from '@nestjs/mapped-types'

export class CreateMicroserviceDto extends PartialType(Microservice) {
  name: string

  description: string

  logo: string

  technologies: Technology[]

  added_by: number
}
