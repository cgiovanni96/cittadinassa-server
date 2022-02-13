import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MailerClient } from 'src/app/clients/mailer.client';
import { UserClient } from 'src/app/clients/user.client';
import { TEMPLATES } from 'src/model/mailer/mailer.types';

import { Dto } from 'src/model/user';

@Controller('users')
export class UserRoute {
  constructor(private readonly user: UserClient, private readonly mailer: MailerClient) {}

  /* -------------------------------------------------------------------------- */
  /*                               CRUD OPERATION                               */
  /* -------------------------------------------------------------------------- */

  @Get('/')
  async getUsers() {
    return this.user.getAll();
  }

  @Get(':id')
  async getUser(@Param() params: { id: string }) {
    return this.user.get(params);
  }

  @Post('/')
  async createUser(@Body() data: Dto.Create) {
    const response = await this.user.create(data);

    if (response.data && response.data.link) {
      await this.mailer.send({
        to: response.data.user.email,
        subject: 'Conferma Email',
        template: TEMPLATES.CONFIRM,
        context: { link: response.data.link },
      });
    }

    return response;
  }

  @Delete('/')
  async deleteUser(@Body() data: Dto.Delete) {
    return this.user.delete(data);
  }

  @Put('/')
  async updateUser(@Body() data: Dto.Update) {
    return this.user.update(data);
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  // @Post('/confirm')
  // async confirmUser(@Body() data: typeof UserDto.Confirm) {
  //   return this.user.confirm(data);
  // }

  // @Post('/forgot-password')
  // async forgotPassword(@Body() data: typeof UserDto.ForgotPassword) {
  //   const response = await this.user.forgotPassword(data);

  //   if (response.data && response.data.link) {
  //     await this.mailer.send({
  //       to: response.data.email,
  //       subject: 'Cambio Password',
  //       template: 'forgotPassword',
  //       context: { link: response.data.link },
  //     });
  //   }

  //   return response;
  // }
}
