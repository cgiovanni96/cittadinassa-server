import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { response } from 'src/lib/response';
import { PR } from 'src/lib/response/type';
import { UserService } from '../services/user.service';
import U from 'src/messages/user.message';
import { UserDto } from 'src/dto/user.dto';
import { UUID } from 'src/types/base.types';
import { UserRelationsKeys } from 'src/types/relationship.type';
import { LinkService } from 'src/services/link.service';
import { LINKTYPES } from 'src/types/link.types';

@Controller()
export class UserController {
  constructor(private readonly user: UserService, private readonly link: LinkService) {}

  @MessagePattern('hello_user')
  getHello(): string {
    return 'Hello from User';
  }

  @MessagePattern(U.CREATE)
  async createUser(@Payload() data: UserDto): PR {
    try {
      const user = await this.user.create(data);
      if (!user) return response(U.CREATE, HttpStatus.BAD_REQUEST, undefined);

      const confirmUserLink = await this.link.create({
        userId: user.id,
        type: LINKTYPES.CONFIRM,
      });

      const httpLink = await this.link.generateHttpLink({ link: confirmUserLink.link });

      return response(U.CREATE, HttpStatus.OK, { user, link: httpLink });
    } catch {
      return response(U.CREATE, HttpStatus.INTERNAL_SERVER_ERROR, undefined);
    }
  }

  @MessagePattern(U.DELETE)
  async deleteUser(@Payload() data: { id: UUID }): PR {
    try {
      await this.user.delete(data);
      return response(U.DELETE, HttpStatus.OK, { deleted: true });
    } catch {
      return response(U.DELETE, HttpStatus.BAD_REQUEST, { deleted: false });
    }
  }

  @MessagePattern(U.UPDATE)
  async updateUser(@Payload() data: { id: UUID; user: Partial<UserDto> }): PR {
    try {
      await this.user.update({ conditions: { id: data.id }, data: data.user });

      return response(U.UPDATE, HttpStatus.OK, { updated: true });
    } catch {
      return response(U.UPDATE, HttpStatus.BAD_REQUEST, { updated: false });
    }
  }

  @MessagePattern(U.GETALL)
  async getAllUsers(@Payload() data: { relations?: UserRelationsKeys }): PR {
    try {
      const users = await this.user.getAll({ relations: data.relations || 'profile' });

      return response(U.GETALL, HttpStatus.OK, { users });
    } catch {
      return response(U.GETALL, HttpStatus.BAD_REQUEST, undefined);
    }
  }

  @MessagePattern(U.GET)
  public async getUserById(@Payload() data: { id: UUID; relations?: UserRelationsKeys }): PR {
    try {
      const user = await this.user.get({ id: data.id, relations: data.relations || 'profile' });

      return response(U.GET, HttpStatus.OK, { user });
    } catch {
      response(U.GET, HttpStatus.BAD_REQUEST, undefined);
    }
  }

  @MessagePattern(U.SEARCH_BY_CREDENTIALS)
  async getUserByCredentials(@Payload() userCredentials: Omit<UserDto, 'name'>): PR {
    try {
      // FIND USER BY EMAIL
      const user = await this.user.find({
        conditions: {
          email: userCredentials.email,
        },
        relations: 'all',
      });

      // CHECK PASSWORD
      const verifiedPassword = await this.user.verifyPassword(user, userCredentials.password);
      console.log('verified', verifiedPassword);
      if (!verifiedPassword) throw new Error();

      return response(U.SEARCH_BY_CREDENTIALS, HttpStatus.OK, { user });
    } catch {
      return response(U.SEARCH_BY_CREDENTIALS, HttpStatus.BAD_REQUEST, undefined);
    }
  }
}
