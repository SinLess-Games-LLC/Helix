import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { UserSettingsService } from './user-settings.service'
import { CreateUserSettingDto } from './dto/create-user-setting.dto'

@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userSettingsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserSettingDto: CreateUserSettingDto) {
    return this.userSettingsService.update(+id, updateUserSettingDto)
  }
}
