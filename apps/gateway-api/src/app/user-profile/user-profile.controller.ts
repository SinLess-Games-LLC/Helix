import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { UserProfileService } from './user-profile.service'
import { UserProfile } from './user-profile.interface'

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProfileService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserProfileDto: UserProfile) {
    return this.userProfileService.update(+id, updateUserProfileDto)
  }
}
