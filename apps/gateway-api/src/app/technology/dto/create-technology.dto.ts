import { PartialType } from '@nestjs/mapped-types'
import { Technology, TechCategory } from '@helix/entities'

export class CreateTechnologyDto extends PartialType(Technology) {
  id: number
  name: string
  description: string
  content: string
  image: string
  alt: string
  slug: string
  website: string
  added_by: number
  category1: TechCategory
  category2: TechCategory
}
