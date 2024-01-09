import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Repository } from 'typeorm'
import { User, UserSetting, UserProfile } from '@helix/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { from, Observable } from 'rxjs'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Observable<User>> {
    const existingUsers = await this.userRepository.find()

    for (const existingUser of existingUsers) {
      if (existingUser.email === createUserDto.email) {
        throw new HttpException('A user with that email already exists', HttpStatus.BAD_REQUEST)
      }
    }

    const user = new User()
    user.email = createUserDto.email
    user.password = await bcrypt.hash(createUserDto.password, 10)
    user.profile = new UserProfile()
    user.settings = new UserSetting()
    return from(this.userRepository.save(user))
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find())
  }

  findOne(sid: number): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: {
          sid,
        },
      })
    )
  }

  update(sid: number, updateUserDto: UpdateUserDto): Observable<any> {
    return from(this.userRepository.update(sid, updateUserDto))
  }

  remove(sid: number): Observable<any> {
    return from(this.userRepository.delete(sid))
  }
}
